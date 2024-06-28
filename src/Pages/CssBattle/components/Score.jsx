import { percentToNumber } from '../../../utils/helper';
import { ScoreText } from '../styled';

const Scores = ({ submitTimes, submit }) => {
    return (
        <>
            <div>
                Last Score: <ScoreText>{percentToNumber(submit?.score)}%</ScoreText>
            </div>
            <div>
                MaxSubmit:
                {/*<ScoreText> {submitTimes - (submit ? submit.times.current : 0)} times</ScoreText>*/}
                <ScoreText> {submitTimes} times</ScoreText>
            </div>
        </>
    );
};

export default Scores;
