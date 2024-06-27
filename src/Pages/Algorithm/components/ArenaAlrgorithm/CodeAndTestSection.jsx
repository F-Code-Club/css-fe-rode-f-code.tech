import React, { useState, useEffect, useRef } from 'react';

import { basicSetup } from 'codemirror';
import { Spinner, Dropdown } from 'react-bootstrap';
import { WebsocketProvider } from 'y-websocket';
import * as Y from 'yjs';

// Import submitApi
import ButtonStyled from '../../../../components/Button';
import submitApi from '../../../../utils/api/submitApi';
import {
    ButtonWrapper,
    TestStatus,
    EditorAndTestWrapper,
    BoxEditor,
    TabsWrapper,
    TabButton,
    TestCase,
    CaseNavigation,
    TestSectionWrapper,
    TestCasesSection,
    TestResultsSection,
    TestContent,
    CaseButton,
    InputOutput,
    TestStatusHeader,
    StatusBadge,
    RuntimeInfo,
} from '../../styled';
import ErrorPopup from './ErrorPopup';

import { defaultKeymap } from '@codemirror/commands';
import { cpp } from '@codemirror/lang-cpp';
import { java } from '@codemirror/lang-java';
import { python } from '@codemirror/lang-python';
import { EditorState } from '@codemirror/state';
import { EditorView } from '@codemirror/view';
import { dropCursor } from '@codemirror/view';
import {
    highlightSpecialChars,
    drawSelection,
    highlightActiveLine,
    keymap,
} from '@codemirror/view';
import { vscodeDark } from '@uiw/codemirror-theme-vscode';
import { yCollab } from 'y-codemirror.next';

// Import the ErrorPopup component

const CodeAndTestSection = ({
    onSubmit,
    currentQuestionData,
    currentQuestionId,
    room_id,
    userInfo,
}) => {
    const [testCases, setTestCases] = useState([]);
    const [selectedLanguage, setSelectedLanguage] = useState('java'); // Default to Java
    const [maxSubmitTimes, setMaxSubmitTimes] = useState(currentQuestionData?.max_submit_time || 0);
    const [submitTimes, setSubmitTimes] = useState(
        parseInt(localStorage.getItem('submitTimes')) || 0
    );
    const [currentCase, setCurrentCase] = useState(0);
    const [submitStatus, setSubmitStatus] = useState(true);
    const [runStatus, setRunStatus] = useState(true); // Separate state for run button status
    const [showResult, setShowResult] = useState(false);
    const [testResults, setTestResults] = useState({});
    const [activeTab, setActiveTab] = useState('testCases');
    const [errorMessage, setErrorMessage] = useState(''); // Error message state

    const getSampleCode = (language) => {
        switch (language) {
            case 'C_CPP':
                return '#include<stdio.h>\n\nint main() {\n    printf("Hello World\\n");\n    return 0;\n}';
            case 'java':
                return 'import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner scanner = new Scanner(System.in);\n        int number = scanner.nextInt();\n        System.out.println(number);\n    }\n}';
            case 'python':
                return 'print("Hello World")';
            default:
                return '';
        }
    };
    const [oneTimeSet, setOneTimeSet] = useState(false);
    const [code, setCode] = useState('');

    const editorRef = useRef(null);

    useEffect(() => {
        // Create a Yjs document
        const ydoc = new Y.Doc();

        // Create a WebRTC provider to enable collaborative editing
        const provider = new WebsocketProvider(
            'wss://demos.yjs.dev/ws',
            `${currentQuestionId}/1`,
            ydoc
        );

        provider.awareness.setLocalStateField('user', {
            name: `${userInfo? userInfo.full_name : 'Unknown'}`,
        });

        // Create a shared Yjs text type
        const yText = ydoc.getText('codemirror');

        // ftener to handle editor updates
        const updateListener = EditorView.updateListener.of((update) => {
            if (update.docChanged) {
                let value = update.state.doc.toString();
                setCode(value);
                localStorage.setItem(`code_${currentQuestionId}_${selectedLanguage}`, value);
            }
        });

        // Function to get the appropriate language extension
        const getLanguageExtension = () => {
            switch (selectedLanguage) {
                case 'C_CPP':
                    return cpp();
                case 'java':
                    return java();
                case 'python':
                    return python();
                default:
                    return java();
            }
        };

        // Create an EditorState instance with the collaborative plugin
        const state = EditorState.create({
            doc: yText.toString(),
            extensions: [
                basicSetup,
                highlightSpecialChars(),
                drawSelection(),
                dropCursor(),
                highlightActiveLine(),
                keymap.of(defaultKeymap),
                yCollab(yText, provider.awareness),
                updateListener,
                getLanguageExtension(),
                vscodeDark,
                EditorView.theme({
                    '&.cm-editor': { height: 'calc(100vh - 250px)', width: '100%' },
                    '&.cm-editor .cm-scroller': { overflow: 'auto' },
                }),
            ],
        });

        // Create an EditorView instance and attach it to the DOM
        const view = new EditorView({
            state,
            parent: editorRef.current,
        });

        return () => {
            view.destroy();
            provider.destroy();
        };
    }, [currentQuestionId, selectedLanguage]); // Add selectedLanguage as a dependency

    useEffect(() => {
        const storedLanguage = localStorage.getItem('language');
        if (storedLanguage) {
            setSelectedLanguage(storedLanguage);
        }
    
        // Load the code for the current question and language
        const storedCode = localStorage.getItem(`code_${currentQuestionId}_${selectedLanguage}`);
        if (storedCode) {
            setCode(storedCode);
        }
    
        if (currentQuestionData?.test_cases) {
            setTestCases(currentQuestionData.test_cases);
        }
        setMaxSubmitTimes(currentQuestionData?.max_submit_time || null);
    }, [currentQuestionData, selectedLanguage]);

    const handleSelectChange = (eventKey) => {
        setSelectedLanguage(eventKey);
        localStorage.setItem('language', eventKey);
        
        const storedCode = localStorage.getItem(`code_${currentQuestionId}_${eventKey}`);
        if (storedCode) {
            setCode(storedCode);
        } else {
            setCode('');
        }
    };
    const submitCode = async () => {
        setSubmitStatus(false);
        setShowResult(true);

        const payload = {
            code: code, // Use the current code state from CodeMirror
            language:
                selectedLanguage === 'C_CPP'
                    ? 'C_CPP'
                    : selectedLanguage === 'python'
                    ? 'PYTHON'
                    : 'JAVA',
            question_id: currentQuestionId,
            room_code: room_id, // replace with the actual room_id
        };

        try {
            const response = await submitApi.submit(payload);
            const resultData = response;
            console.log('result data ', resultData);

            if (resultData.kind === 'CompilationError') {
                setTestResults({
                    status: 'CompilationError',
                    run_time: resultData.run_time,
                    compilation_error: resultData.compilation_error,
                    score: resultData.score,
                });
                setActiveTab('testResults'); // Switch to test results tab
                setCurrentCase(0); // Ensure first case is selected
            } else if (resultData.kind === 'Executed') {
                const details = resultData.details.map((detail, index) => ({
                    ...detail,
                    input: testCases[index]?.input || 'N/A',
                    output: testCases[index]?.output || 'N/A',
                }));

                setTestResults({
                    status: 'Executed',
                    run_time: resultData.run_time,
                    score: resultData.score,
                    details: details,
                });

                setActiveTab('testResults'); // Switch to test results tab
                setCurrentCase(0); // Ensure first case is selected
            } else {
                throw new Error(resultData.response.data.message);
            }

            setSubmitStatus(true);
            setSubmitTimes((prevSubmitTimes) => {
                const newSubmitTimes = prevSubmitTimes + 1;
                localStorage.setItem('submitTimes', newSubmitTimes);
                return newSubmitTimes;
            });
        } catch (error) {
            console.error('Error submitting code:', error);
            let errorMessage = 'An error occurred while submitting the code.';
            if (error.response && error.response.data && error.response.data.message) {
                errorMessage = error.response.data.message;
            } else if (error.message) {
                errorMessage = error.message;
            }
            setErrorMessage(errorMessage);
            console.log('Current payload:', payload); // Log the payload for debugging
            setSubmitStatus(true);
        }
    };

    const runCode = async () => {
        setRunStatus(false);
        console.log('In the run code function');
        const payload = {
            code: code, // Use the current code state from CodeMirror
            language:
                selectedLanguage === 'C_CPP'
                    ? 'C_CPP'
                    : selectedLanguage === 'python'
                    ? 'PYTHON'
                    : 'JAVA',
            question_id: currentQuestionId,
            room_code: room_id, // replace with the actual room_id
        };

        try {
            const response = await submitApi.run(payload);
            const resultData = response.data; // Adjusted to access the nested data
            console.log('Run result data ', resultData);
            if (resultData.kind === 'CompilationError') {
                setTestResults({
                    status: 'CompilationError',
                    run_time: 0,
                    compilation_error: resultData.compilation_error,
                    score: resultData.score,
                    details: null,
                });
                setActiveTab('testResults'); // Switch to test results tab
                setCurrentCase(0); // Ensure first case is selected
            } else if (resultData.kind === 'Executed') {
                const details = resultData.details.map((detail, index) => ({
                    ...detail,
                    input: testCases[index]?.input || 'N/A',
                    output: testCases[index]?.output || 'N/A',
                }));

                setTestResults({
                    status: 'Executed',
                    run_time: resultData.run_time,
                    score: resultData.score,
                    details: details,
                });

                // Automatically select the first case in test results when switching tabs

                setActiveTab('testResults');
                setCurrentCase(0);
            } else {
                throw new Error(resultData.message || 'Unexpected error occurred');
            }

            setRunStatus(true);
        } catch (error) {
            console.error('Error running code:', error);
            let errorMessage = 'An error occurred while running the code.';
            if (error.response && error.response.data && error.response.data.message) {
                errorMessage = error.response.data.message;
            } else if (error.message) {
                errorMessage = error.message;
            }
            setErrorMessage(errorMessage);
            console.log('Current payload:', payload); // Log the payload for debugging
            setRunStatus(true);
        }
    };

    const closeErrorPopup = () => {
        setErrorMessage('');
    };
    return (
        <EditorAndTestWrapper>
            <Dropdown onSelect={handleSelectChange}>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                    {selectedLanguage.toUpperCase()}
                </Dropdown.Toggle>
                <Dropdown.Menu className="bg border transform menu">
                    <Dropdown.Item eventKey="C_CPP">C++</Dropdown.Item>
                    <Dropdown.Item eventKey="java">Java</Dropdown.Item>
                    <Dropdown.Item eventKey="python">Python</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
            <BoxEditor showResult={showResult}>
                <div
                    className="editor"
                    ref={editorRef}
                    style={{ border: '1px solid black', height: '720px', width: '100%' }}
                ></div>
            </BoxEditor>
            <TestSectionWrapper>
                <TabsWrapper>
                    <TabButton
                        active={activeTab === 'testCases'}
                        onClick={() => setActiveTab('testCases')}
                    >
                        Test Cases
                    </TabButton>
                    <TabButton
                        active={activeTab === 'testResults'}
                        onClick={() => {
                            setActiveTab('testResults');
                            setCurrentCase(0); // Ensure first case is selected when switching to test results
                        }}
                    >
                        Test Results
                    </TabButton>
                </TabsWrapper>

                <TestContent>
                    {activeTab === 'testCases' && (
                        <TestCasesSection>
                            <CaseNavigation>
                                {testCases.length > 0 ? (
                                    testCases.map((_, index) => (
                                        <CaseButton
                                            key={index}
                                            active={index === currentCase}
                                            onClick={() => setCurrentCase(index)}
                                        >
                                            Case {index + 1}
                                        </CaseButton>
                                    ))
                                ) : (
                                    <p>No test cases available</p>
                                )}
                            </CaseNavigation>
                            {testCases.length > 0 && (
                                <>
                                    <h4>Input</h4>
                                    <TestCase>
                                        <p>
                                            {testCases[currentCase]?.input || 'No input available'}
                                        </p>
                                    </TestCase>
                                    <h4>Output</h4>
                                    <TestCase>
                                        <p>
                                            {testCases[currentCase]?.output ||
                                                'No output available'}
                                        </p>
                                    </TestCase>
                                </>
                            )}
                        </TestCasesSection>
                    )}

                    {activeTab === 'testResults' && (
                        <TestResultsSection>
                            <CaseNavigation>
                                {testResults.details ? (
                                    testResults.details.length > 0 ? (
                                        testResults.details.map((_, index) => (
                                            <CaseButton
                                                key={index}
                                                active={index === currentCase}
                                                onClick={() => setCurrentCase(index)}
                                            >
                                                Case {index + 1}
                                            </CaseButton>
                                        ))
                                    ) : (
                                        <p>No test results available</p>
                                    )
                                ) : (
                                    <p>No test results available</p>
                                )}
                            </CaseNavigation>
                            {testResults.status === 'CompilationError' && (
                                <>
                                    <h4>Score: {testResults.score}</h4>
                                    <TestStatusHeader>
                                        <StatusBadge status={testResults.status}>
                                            {testResults.status || 'Pending'}
                                        </StatusBadge>
                                        <RuntimeInfo>Runtime: {testResults.run_time}</RuntimeInfo>
                                    </TestStatusHeader>
                                    <TestCase>
                                        <p style={{ color: '#bf3c3e' }}>
                                            {testResults.compilation_error}
                                        </p>
                                    </TestCase>
                                </>
                            )}
                            {testResults.status === 'Executed' &&
                                testResults.details &&
                                testResults.details.length > 0 && (
                                    <>
                                        <h4>Score: {testResults.score}</h4>
                                        <TestStatusHeader>
                                            <StatusBadge status={testResults.status}>
                                                {testResults.status || 'Pending'}
                                            </StatusBadge>
                                            <RuntimeInfo>
                                                Runtime: {testResults.run_time}
                                            </RuntimeInfo>
                                        </TestStatusHeader>
                                        <div>
                                            <InputOutput>
                                                <h5>Status</h5>
                                                <TestCase>
                                                    <p
                                                        style={{
                                                            color:
                                                                testResults.details[currentCase]
                                                                    .kind === 'Failed' ||
                                                                testResults.details[currentCase]
                                                                    .kind === 'TimedOut'
                                                                    ? '#bf3c3e'
                                                                    : '#2cbb5d',
                                                        }}
                                                    >
                                                        {testResults.details[currentCase].kind}
                                                    </p>
                                                </TestCase>
                                                {testResults.details[currentCase].runtime_error && (
                                                    <>
                                                        <h5>Runtime Error</h5>
                                                        <TestCase>
                                                            <p style={{ color: '#bf3c3e' }}>
                                                                {
                                                                    testResults.details[currentCase]
                                                                        .runtime_error
                                                                }
                                                            </p>
                                                        </TestCase>
                                                    </>
                                                )}
                                            </InputOutput>
                                        </div>
                                    </>
                                )}
                        </TestResultsSection>
                    )}
                </TestContent>
            </TestSectionWrapper>
            <ButtonWrapper>
                <TestCase>
                    Submit Times: {submitTimes}/{maxSubmitTimes}
                </TestCase>
                <ButtonStyled buttonType="outline" onClick={runCode}>
                    {runStatus ? 'RUN' : <Spinner size="sm" />}
                </ButtonStyled>
                <ButtonStyled
                    buttonType="outline2"
                    onClick={submitCode}
                    disabled={!submitStatus || submitTimes >= maxSubmitTimes}
                >
                    {submitStatus ? 'SUBMIT' : <Spinner size="sm" />}
                </ButtonStyled>
            </ButtonWrapper>
            {errorMessage && <ErrorPopup message={errorMessage} onClose={closeErrorPopup} />}{' '}
            {/* Conditionally render ErrorPopup */}
        </EditorAndTestWrapper>
    );
};

export default CodeAndTestSection;
