import { useState } from 'react';

import ButtonStyled from '../../../../components/Button';
import * as St from '../styles';
import CodeTemplate from './CodeTemplate';
import MaxSumbitTimes from './MaxSumbitTimes';
import Testcase from './Testcase';
import UploadImage from './UploadImage';
import { addBEQuestion, addTestcase } from './utils';
import { FaPlus } from "react-icons/fa";

import Accordion from 'react-bootstrap/Accordion';

const CreateBEQuestions = ({ questions, setQuestions, error }) => {
    const [imageUrls, setImageUrls] = useState([]);
    // console.log(error[0]?.chidren?.find((e) => e.at === 'maxSubmitTimes'));

    return (
        <>
            {questions?.map((question, questionIdx) => (
                <St.Questions key={questionIdx}>
                    <St.QuestionTitle className='question-title'>Question {questionIdx + 1}:</St.QuestionTitle>

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
                            <div className='line'></div>
                            <div className="d-grid gap-2">
                                <ButtonStyled 
                                    buttonType='dashed' 
                                    id='template-button'
                                    onClick={() => addTestcase(questionIdx, setQuestions)}
                                >
                                    <FaPlus className='button-icon' /> 
                                    <span className='question-type3'>Add testcase</span>
                                </ButtonStyled>
                            </div>

                        </div>
                    </div>
                    <hr />
                </St.Questions>
            ))}

            <div className="d-grid gap-2 my-2">
                <ButtonStyled buttonType='dashed' onClick={() => addBEQuestion(setQuestions)} id='template-button'>
                    <FaPlus className='button-icon' />
                    <span className='question-type2'>Add questions</span>
                </ButtonStyled>
            </div>
        </>
    );
};

export default CreateBEQuestions;
