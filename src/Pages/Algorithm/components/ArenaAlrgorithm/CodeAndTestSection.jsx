import React, { useState, useEffect } from 'react';
import { Spinner, Dropdown } from 'react-bootstrap';
import { cpp } from '@codemirror/lang-cpp';
import { java } from '@codemirror/lang-java';
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

const CodeAndTestSection = ({ onSubmit, currentQuestionData, currentQuestionId }) => {
    const [testCases, setTestCases] = useState([]);
    const [maxSubmitTimes, setMaxSubmitTimes] = useState(currentQuestionData?.max_submit_time || 0);
    const [submitTimes, setSubmitTimes] = useState(0);
    const [code, setCode] = useState('');
    const [selectedLanguage, setSelectedLanguage] = useState('java');
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
                return 'public class Main {\n    public static void main(String[] args) {\n        System.out.println("Hello World");\n    }\n}';
            default:
                return '';
        }
    };

    useEffect(() => {
        console.log('question data in code and test section:', currentQuestionData);

        console.log("test cases:", currentQuestionData?.test_cases);
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
        localStorage.setItem('codeBE', value);
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
            default:
                return java();
        }
    };

    const submitCode = async () => {
        setSubmitStatus(false);
        setShowResult(true);

        const payload = {
            code: code,
            language: selectedLanguage === 'C_CPP' ? 'C_CPP' : 'JAVA',
            question_id: currentQuestionId,
            room_id: 2, // replace with the actual room_id
        };

        try {
            const response = await submitApi.submit(payload);
            // response is the result already
            const resultData = response;
            console.log("result data ", resultData);

            if (resultData.type === 'Succeed') {
                setTestResults({
                    status: 'Accepted',
                    runTime: resultData.runtime,
                    score: resultData.score,
                    input: testCases[currentCase]?.input || 'N/A',
                    output: testCases[currentCase]?.output || 'N/A',
                });
            } else {
                setTestResults({
                    status: 'Compilation Error',
                    runTime: 'N/A',
                    output: resultData.reason,
                });
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
                        onClick={() => setActiveTab('testResults')}
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
                            {testCases.length > 0 ? (
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
                            ) : (
                                <p>No test cases to display</p>
                            )}
                        </TestCasesSection>
                    )}

                    {activeTab === 'testResults' && (
                        <TestResultsSection>
                            <TestStatusHeader>
                                <StatusBadge status={testResults?.status}>
                                    {testResults?.status || 'Pending'}
                                </StatusBadge>
                                <RuntimeInfo>Runtime: {testResults.runTime}</RuntimeInfo>
                            </TestStatusHeader>
                            {testResults.status !== 'Accepted' && (
                                <TestCase>
                                    <p style={{ color: '#bf3c3e' }}>{testResults.output}</p>
                                </TestCase>
                            )}
                            {testResults.status === 'Accepted' && (
                                <InputOutput>
                                    <h4>Input</h4>
                                    <p>{testResults.input}</p>
                                    <h4>Output</h4>
                                    <p>{testResults.output}</p>
                                    <h4>Score</h4>
                                    <p>{testResults.score}</p>
                                </InputOutput>
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
