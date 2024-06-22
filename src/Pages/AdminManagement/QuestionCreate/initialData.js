import { themes } from '../../../themes';

const BEInitQuestion = [
    {
        maxSubmitTimes: 0,
        score: 0,
        questionImage: '',
        testCases: [
            { input: '', output: '' , isVisible: false },
        ],
    },
];

const FEInitQuestion = [
    {
        maxSubmitTimes: 0,
        score: 0,
        questionImage: '',
        colors: themes.colors.primary, 
    },
];

export { BEInitQuestion, FEInitQuestion };
