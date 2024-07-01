// submitCode.js

import submitApi from '../../../../utils/api/submitApi';

const submitCode = async (
  code,
  selectedLanguage,
  currentQuestionId,
  room_id,
  setSubmitStatus,
  setShowResult,
  setTestResults,
  setActiveTab,
  setCurrentCase,
  setSubmitTimes,
  setErrorMessage,
  testCases
) => {
  setSubmitStatus(false);
  setShowResult(true);

  const payload = {
    code: code,
    language:
      selectedLanguage === 'C_CPP'
        ? 'C_CPP'
        : selectedLanguage === 'python'
        ? 'PYTHON'
        : 'JAVA',
    question_id: currentQuestionId,
    room_code: room_id,
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
    console.log('Current payload:', payload);
    setSubmitStatus(true);
  }
};

export default submitCode;