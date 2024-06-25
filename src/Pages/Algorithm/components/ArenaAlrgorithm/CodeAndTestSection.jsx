import React, { useState, useEffect } from 'react';
import { Spinner, Dropdown } from 'react-bootstrap';
import { cpp } from '@codemirror/lang-cpp';
import { java } from '@codemirror/lang-java';
import { python } from '@codemirror/lang-python';
import { vscodeDark } from '@uiw/codemirror-theme-vscode';
import CodeMirror from '@uiw/react-codemirror';
import submitApi from '../../../../utils/api/submitApi'; // Import submitApi

import ButtonStyled from '../../../../components/Button';
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

const CodeAndTestSection = ({ onSubmit, currentQuestionData, currentQuestionId, room_id }) => {
    const [testCases, setTestCases] = useState([]);
    const [maxSubmitTimes, setMaxSubmitTimes] = useState(currentQuestionData?.max_submit_time || 0);
    const [submitTimes, setSubmitTimes] = useState(localStorage.getItem("submitTimes") || 0);
    const [code, setCode] = useState('');
    const [selectedLanguage, setSelectedLanguage] = useState('java'); // Default to Java
    const [currentCase, setCurrentCase] = useState(0);
    const [submitStatus, setSubmitStatus] = useState(true);
    const [oneTimeSubmit, setOneTimeSubmit] = useState(true);
    const [showResult, setShowResult] = useState(false);
    const [testResults, setTestResults] = useState({});
    const [activeTab, setActiveTab] = useState('testCases');

    const getSampleCode = (language) => {
        switch (language) {
            case 'C_CPP':
                return '#include<stdio.h>\n\nint main() {\n    printf("Hello World\\n");\n    return 0;\n}';
            case 'java':
                return 'public class Main {\n    public static void main(String[] args) {\n        System.out.println(\"Hello World\");\n    }\n}';
            case 'python':
                return 'print("Hello World")';
            default:
                return '';
        }
    };

    useEffect(() => {

        setCode(getSampleCode(selectedLanguage));
        const storedLanguage = localStorage.getItem('language');
        if (storedLanguage) {
            setSelectedLanguage(storedLanguage);
        }

        if (currentQuestionData?.test_cases) {
            setTestCases(currentQuestionData.test_cases);
        }
        setMaxSubmitTimes(currentQuestionData?.max_submit_time || null);
    }, [currentQuestionData, selectedLanguage]);

    const handleChange = (value) => {
        setCode(value);
    };

    const handleSelectChange = (eventKey) => {
        setSelectedLanguage(eventKey);
        localStorage.setItem('language', eventKey);
        setCode(getSampleCode(eventKey));
    };

    const getLanguageExtension = () => {
        switch (selectedLanguage) {
            case 'C_CPP':
                return cpp();
            case 'java':
                return java();
            case 'python':
                return python();
            default:
                return java(); // Default to Java if language is not recognized
        }
    };

    const submitCode = async () => {
        setSubmitStatus(false);
        setShowResult(true);

        const payload = {
            code: code,
            language: selectedLanguage === 'C_CPP' ? 'C_CPP' : selectedLanguage === 'python' ? 'PYTHON' : 'JAVA',
            question_id: currentQuestionId,
            room_id: room_id, // replace with the actual room_id
        };

        try {
            const response = await submitApi.submit(payload);
            const resultData = response;
            console.log("result data ", resultData);

            if (resultData.kind === 'CompilationError') {
                setTestResults({
                    status: 'CompilationError',
                    run_time: resultData.run_time,
                    compilation_error: resultData.compilation_error,
                    score: resultData.score,
                });
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
                setCurrentCase(0);
                setActiveTab('testResults');
            }

            setSubmitStatus(true);
            setOneTimeSubmit(false);
            setSubmitTimes((prevSubmitTimes) => prevSubmitTimes + 1);
        } catch (error) {
            console.error('Error submitting code:', error);
            setSubmitStatus(true);
        }
    };

    const finish = async () => {
        // Your finish logic here
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
                <CodeMirror
                    className="editor"
                    value={code}
                    theme={vscodeDark}
                    height={showResult ? '60vh' : 'calc(100vh - 250px)'}
                    maxHeight={showResult ? '60vh' : 'calc(100vh - 250px)'}
                    extensions={[getLanguageExtension()]}
                    onChange={handleChange}
                />
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
                                        <p>{testCases[currentCase]?.input || 'No input available'}</p>
                                    </TestCase>
                                    <h4>Output</h4>
                                    <TestCase>
                                        <p>{testCases[currentCase]?.output || 'No output available'}</p>
                                    </TestCase>
                                </>
                            )}
                        </TestCasesSection>
                    )}

                    {activeTab === 'testResults' && (
                        <TestResultsSection>
                            <CaseNavigation>
                                {testResults.details && testResults.details.length > 0 ? (
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
                                )}
                            </CaseNavigation>
                            {testResults.details && testResults.details.length > 0 && (
                                <>
                                    <h4>Score: {testResults.score}</h4>
                                    <TestStatusHeader>
                                        <StatusBadge status={testResults.status}>
                                            {testResults.status || 'Pending'}
                                        </StatusBadge>
                                        <RuntimeInfo>Runtime: {testResults.run_time}</RuntimeInfo>
                                    </TestStatusHeader>
                                    {testResults.status === 'CompilationError' && (
                                        <TestCase>
                                            <p style={{ color: '#bf3c3e' }}>{testResults.compilation_error}</p>
                                        </TestCase>
                                    )}
                                    {testResults.status === 'Executed' && (
                                        <div>
                                            <InputOutput>
                                                <h5>Status</h5>
                                                <TestCase>
                                                    <p style={{ color: testResults.details[currentCase].kind === 'Failed' ? '#bf3c3e' : '#2cbb5d' }}>{testResults.details[currentCase].kind}</p>
                                                </TestCase>
                                                {testResults.details[currentCase].runtime_error && (
                                                    <>
                                                        <h5>Runtime Error</h5>
                                                        <TestCase>
                                                            <p style={{ color: '#bf3c3e' }}>{testResults.details[currentCase].runtime_error}</p>
                                                            </TestCase>
                                                        </>
                                                    )}
                                                </InputOutput>
                                            </div>
                                        )}
                                    </>
                                )}
                            </TestResultsSection>
                        )}
                    </TestContent>
                </TestSectionWrapper>
    
                <ButtonWrapper>
                    <TestCase>Submit Times: {submitTimes}/{maxSubmitTimes}</TestCase>
                    <ButtonStyled buttonType="outline2" onClick={submitCode} disabled={!submitStatus || submitTimes >= maxSubmitTimes}>
                        {submitStatus ? 'SUBMIT' : <Spinner size="sm" />}
                    </ButtonStyled>
                    <ButtonStyled buttonType="outline" onClick={finish} disabled={oneTimeSubmit}>
                        FINISH
                    </ButtonStyled>
                </ButtonWrapper>
            </EditorAndTestWrapper>
        );
    };
    
    export default CodeAndTestSection;
    