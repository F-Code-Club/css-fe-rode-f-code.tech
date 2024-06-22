import { themes } from '../../../../themes';

import Form from 'react-bootstrap/Form';
// FE: Front-end
export const addFEQuestion = (setQuestions) => {
    setQuestions((prev) => [
        ...prev,
        {
            maxSubmitTimes: 0,
            score: 0,
            questionImage: '',
            colors: themes.colors.primary,
        },
    ]);
};

export const editColor = (value, questionIdx, colorIdx, setQuestions) => {
    setQuestions((prev) =>
        prev.map((question, idx) => { 
            if (idx !== questionIdx) return question;
            const colors = question.colors.split(',').filter(Boolean);
            colors[colorIdx] = value;
            return { ...question, colors: colors.filter(Boolean).join(',') };
        })
    );
};

export const addColor = (questionIdx, setQuestions) => {
    setQuestions((prev) => {
        let copy = [...prev];
        copy[questionIdx].colors += ',#ffffff';
        return copy;
    });
};

// export const addCodeTemplate = (value, questionIdx, setQuestions) => {
//     setQuestions((prev) => {
//         let copy = [...prev];
//         copy[questionIdx].codeTemplate = value;
//         return copy;
//     });
// };

// BE: Backend
export const addBEQuestion = (setQuestions) => {
    setQuestions((prev) => [
        ...prev,
        {
            maxSubmitTimes: 0,
            score: 0,
            questionImage: '',
            testCases: [{ input: '', output: '' , isVisible: false }],
        },
    ]);
};

export const addTestcase = (questionIdx, setQuestions) => {
    setQuestions((prev) => {
        const { testCases, ...rest } = prev[questionIdx]; 
        const newTestcases = [...testCases, { input: '', output: '', visible: false }]; 
        const updatedQuestion = { ...rest, testCases: newTestcases }; 
        const updatedQuestions = [
            ...prev.slice(0, questionIdx),
            updatedQuestion,
            ...prev.slice(questionIdx + 1),
        ];
        return updatedQuestions;
    });
};

export const editInputTestcase = (value, questionIdx, testcaseIdx, setQuestions) => {
    setQuestions((prev) => {
        let copy = [...prev];
        copy[questionIdx].testCases[testcaseIdx].input = value;
        return copy;
    });
};

export const editOutputTestcase = (value, questionIdx, testcaseIdx, setQuestions) => {
    setQuestions((prev) => {
        let copy = [...prev];
        copy[questionIdx].testCases[testcaseIdx].output = value;
        return copy;
    });
};

//button delete test case 
export const deleteTestcase = (questionIdx, testcaseIdx, setQuestions) => {
    setQuestions((prev) => {
        let copy = [...prev];
        copy[questionIdx].testCases.splice(testcaseIdx, 1);
        return copy;
    });
};

//submit time 
export const handleIncrease = (questionIdx, setQuestions) => {
    setQuestions((prev) => {
        let copy = [...prev];
        copy[questionIdx].maxSubmitTimes += 1;
        return copy;
    });
};

export const handleDecrease = (questionIdx, setQuestions) => {
    setQuestions((prev) => {
        let copy = [...prev];
        if (copy[questionIdx].maxSubmitTimes <= 0) return copy;
        copy[questionIdx].maxSubmitTimes -= 1;
        return copy;
    });
};
