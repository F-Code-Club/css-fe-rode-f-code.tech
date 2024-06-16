import { useState } from 'react';

import ButtonStyled from '../../../../components/Button/index.jsx';
import * as St from '../../CreateRoom/styles.js';
import AddColor from '../../CreateRoom/components/AddColor.jsx';
import CodeTemplate from '../../CreateRoom/components/CodeTemplate.jsx';
import MaxSumbitTimes from '../../CreateRoom/components/MaxSumbitTimes.jsx';
import UploadImage from '../../CreateRoom/components/UploadImage.jsx';
import { addFEQuestion } from '../../CreateRoom/components/utils.jsx';

const CreateBEQuestions = ({ questions, setQuestions, error }) => {
    const [imageUrls, setImageUrls] = useState([]);

    return (
        <>
            {questions.map((question, questionIdx) => (
                <St.Questions key={questionIdx}>
                    <St.QuestionTitle>Question {questionIdx + 1}</St.QuestionTitle>

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
                            <UploadImage
                                question={question}
                                questionIdx={questionIdx}
                                setQuestions={setQuestions}
                                setImageUrls={setImageUrls}
                                imageUrls={imageUrls}
                                error={
                                    error &&
                                    error[questionIdx]?.chidren?.find(
                                        (e) => e.at === 'questionImage'
                                    )?.message
                                }
                            />
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

                        <div className="col-md-6">
                            <CodeTemplate
                                questionIdx={questionIdx}
                                setQuestions={setQuestions}
                                error={
                                    error &&
                                    error[questionIdx]?.chidren?.find(
                                        (e) => e.at === 'codeTemplate'
                                    )?.message
                                }
                            />
                        </div>
                    </div>
                    <hr />
                </St.Questions>
            ))}

            <div className="d-grid gap-2 my-2">
                <ButtonStyled buttonType="dashed" onClick={() => addFEQuestion(setQuestions)}>
                    + Add questions
                </ButtonStyled>
            </div>
        </>
    );
};

export default CreateBEQuestions;
