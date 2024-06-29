// runCode.js

import submitApi from '../../../../utils/api/submitApi';

const runCode = async (code, selectedLanguage, currentQuestionId, room_id, setRunStatus, setTestResults, setErrorMessage, testCases, setCurrentCase, setActiveTab) => {
    setRunStatus(false);
    console.log('In the run code function');
    const payload = {
        code: code,
        language: selectedLanguage === 'C_CPP' ? 'C_CPP' : selectedLanguage === 'python' ? 'PYTHON' : 'JAVA',
        question_id: currentQuestionId,
        room_code: room_id,
    };

    try {
        const response = await submitApi.run(payload);
        const resultData = response.data;

        if (resultData.kind === 'CompilationError') {
            setTestResults({
                status: 'CompilationError',
                run_time: 0,
                compilation_error: resultData.compilation_error,
                score: resultData.score,
                details: null,
            });
            setActiveTab('testResults');
            setCurrentCase(0);
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
        setRunStatus(true);
    }
};

export default runCode;
