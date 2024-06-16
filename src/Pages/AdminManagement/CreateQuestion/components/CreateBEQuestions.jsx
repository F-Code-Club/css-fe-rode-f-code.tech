import { useState } from 'react';

import ButtonStyled from '../../../../components/Button/index.jsx';
import * as St from '../../CreateRoom/styles.js';
import CodeTemplate from '../../CreateRoom/components/CodeTemplate.jsx';
import MaxSumbitTimes from '../../CreateRoom/components/MaxSumbitTimes.jsx';
import Testcase from '../../CreateRoom/components/Testcase.jsx';
import UploadImage from '../../CreateRoom/components/UploadImage.jsx';
import { addBEQuestion, addTestcase } from '../../CreateRoom/components/utils.jsx';

import Accordion from 'react-bootstrap/Accordion';

const CreateBEQuestions = ({ questions, setQuestions, error }) => {
    const [imageUrls, setImageUrls] = useState([]);
    // console.log(error[0]?.chidren?.find((e) => e.at === 'maxSubmitTimes'));

    return (
        <>
            {questions?.map((question, questionIdx) => (
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
                            <div className="row">
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
                            </div>
                            <div className="row">
                                <CodeTemplate
                                    questionIdx={questionIdx}
                                    setQuestions={setQuestions}
                                    error={
                                        error &&
                                        error[questionIdx]?.chidren?.find(
                                            (e) => e.at === 'codeTemplate'
                                        )?.message
                                    }
                                    isBackend={true}
                                />
                            </div>
                        </div>

                        <div className="col-md-6">
                            <Accordion
                                defaultActiveKey={question?.testCases?.length - 1 || 0}
                                flush
                            >
                                {question.testCases?.map((testcase, testcaseIdx) => (
                                    <Testcase
                                        key={testcaseIdx}
                                        item={testcase}
                                        testcaseIdx={testcaseIdx}
                                        questionIdx={questionIdx}
                                        setQuestions={setQuestions}
                                        error={
                                            error &&
                                            error[questionIdx]?.chidren?.find(
                                                (e) => e.at === 'testCases'
                                            )
                                        }
                                    />
                                ))}
                            </Accordion>
                            <div className="d-grid gap-2 ">
                                <ButtonStyled
                                    buttonType="outline"
                                    onClick={() => addTestcase(questionIdx, setQuestions)}
                                >
                                    + Add testcase
                                </ButtonStyled>
                            </div>
                        </div>
                    </div>
                    <hr />
                </St.Questions>
            ))}

            <div className="d-grid gap-2 my-2">
                <ButtonStyled buttonType="dashed" onClick={() => addBEQuestion(setQuestions)}>
                    + Add questions
                </ButtonStyled>
            </div>
        </>
    );
};

export default CreateBEQuestions;
