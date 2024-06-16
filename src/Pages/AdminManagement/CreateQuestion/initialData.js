import { themes } from '../../../themes';

const BEInitQuestion = [
    {
        maxSubmitTimes: 0,
        questionImage: '',
        codeTemplate: '',
        testCases: [
            { input: '', output: '' , visible: false },
            // May have a lot of testcase { input, output }
        ],
    },
    // May have a lot of question { maxSubmitTimes, questionImage, testcases }]
];

const FEInitQuestion = [
    {
        maxSubmitTimes: 0,
        questionImage: '',
        colors: themes.colors.primary, //cắt string từ , ra 
        codeTemplate: '',
    },
    // May have a lot of question { maxSubmitTimes, questionImage, colors, codeTemplate }
];

export { BEInitQuestion, FEInitQuestion };
