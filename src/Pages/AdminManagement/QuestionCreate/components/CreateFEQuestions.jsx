import { useState } from 'react';

import ButtonStyled from '../../../../components/Button';
import * as St from '../styles';
import AddColor from './AddColor';
import MaxSumbitTimes from './MaxSumbitTimes';
import Score from './Score';
import UploadImage from './UploadImage';
import { addFEQuestion } from './utils';
import { FaPlus } from "react-icons/fa";
import { Col, Row } from 'react-bootstrap';
import questionApi from '../../../../utils/api/questionApi';

const CreateFEQuestions = ({type, questions, setQuestions, error, questionIds }) => {
    const [imageUrls, setImageUrls] = useState([]);
    return (
        <>
            {questions.map((question, questionIdx) => (
                <St.Questions key={questionIdx}>
                    <St.QuestionTitle className='question-title'>
                        Question: {questionIdx + 1}
                    </St.QuestionTitle>
                    <div className="row">
                        <div className="col-md-6">
                            <MaxSumbitTimes
                                question={question}
                                questionIdx={questionIdx}
                                setQuestions={setQuestions}
                                error={
                                    error &&
                                    error[questionIdx]?.chidren?.find(
                                        (e) => e.at === 'maxSubmitTimes'
                                    )?.message
                                }
                            />
                            <Score 
                                questionIdx={questionIdx}
                                setQuestions={setQuestions}
                            />
                            <UploadImage
                                type={type}
                                question={question}
                                questionIdx={questionIdx}
                                setQuestions={setQuestions}
                                error={
                                    error &&
                                    error[questionIdx]?.chidren?.find(
                                        (e) => e.at === 'questionImage'
                                    )?.message
                                }
                            />
                        </div>
                        <div className="col-md-6">
                            <AddColor
                                questionIdx={questionIdx}
                                setQuestions={setQuestions}
                                question={question}
                                error={
                                    error &&
                                    error[questionIdx]?.chidren?.find((e) => e.at === 'colors')
                                        ?.message
                                }
                            />
                        </div>
                    </div>
                    <hr />
                </St.Questions>
            ))}

            <div className="d-grid gap-2 my-2">
                <ButtonStyled buttonType='dashed' onClick={() => addFEQuestion(setQuestions)} id='template-button'>
                    <FaPlus className='button-icon' />
                    <span className='question-type2'>Add questions</span>
                </ButtonStyled>
            </div>
        </>
    );
};

export default CreateFEQuestions;
