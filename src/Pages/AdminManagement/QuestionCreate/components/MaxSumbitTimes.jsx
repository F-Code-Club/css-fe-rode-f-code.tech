import * as St from '../styles';
import { handleIncrease, handleDecrease } from './utils';

const MaxSumbitTimes = ({ question, questionIdx, setQuestions, error }) => {
    return (
        <div className="mb-4">
            <label id='question-type3' htmlFor="maxSubmitTimes">Maximum Submit Time:</label>
            <St.NumberInput>
                <div id='submit-decrease-btn' onClick={() => handleDecrease(questionIdx, setQuestions)}>-</div>
                <p id='submit-input'>{question.maxSubmitTimes}</p>
                <div id='submit-increase-btn' onClick={() => handleIncrease(questionIdx, setQuestions)}>+</div>
            </St.NumberInput>
            <h6 className="text-danger">{error}</h6>
        </div>
    );
};

export default MaxSumbitTimes;
