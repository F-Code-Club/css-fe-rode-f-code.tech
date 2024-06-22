import { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { Stack } from 'react-bootstrap';
import { FEInitQuestion, BEInitQuestion } from './initialData';
import { toastError, toastSuccess } from '../../../components/Toast';
import questionApi from '../../../utils/api/questionApi';
import localFilesAPI from '../../../utils/api/localFilesAPI';
import CreateBEQuestions from './components/CreateBEQuestions';
import CreateFEQuestions from './components/CreateFEQuestions';
import Dropdown from 'react-bootstrap/Dropdown';
import './style.scss';

const QuestionCreate = () => { 
    const [typeInfo, setTypeInfo] = useState('BE');
    const [questions, setQuestions] = useState(BEInitQuestion);
    const [errors, setErrors] = useState([]);
    const [stackName, setStackName] = useState("");
    const [questionsUpdated, setQuestionsUpdated] = useState(false);

    const createStack = async () => {
        const stackMax = typeInfo === 'BE' ? 15 : 10;
        const data = {
            name: stackName, 
            stackMax: stackMax,
            type: typeInfo,
        }
        try {
            const res = await questionApi.createNewStack(data);
            if (res.status === 200) {
                return res.data.id;
            } else if (res.status === 400) {
                console.error('Failed to create stack: Invalid data');
                return null;
            } 
        } catch (error) {
            console.error('Failed to create stack:', error);
            return null;
        }
    };

    const uploadQuestionFile = async (question, questionId) => {
        if (typeInfo === 'FE' && question.questionImage && question.colors) {
            const res = await localFilesAPI.uploadQuestionFile(question.questionImage, question.colors, questionId);
            if (res.status !== 200) {
                console.log(res);
                throw new Error('Failed to upload question image');
            }
        } 
        else if (typeInfo === 'BE' && question.questionImage && question.testCases) {
            const res = await localFilesAPI.uploadQuestionFile(question.questionImage, '', questionId);
            if (res.status !== 200) {
                throw new Error('Failed to upload question image');
            }
            await uploadTestCases(question.testCases, questionId);
        }
    };

    const uploadTestCases = async (testCases, questionId) => {
        const promises = testCases.map(async (testcase) => {
            const res = await questionApi.createNewTestcase(testcase, questionId);
            if (res.status !== 200) {
                throw new Error('Failed to upload testcase');
            }
        });
        await Promise.all(promises);
    };

    const createQuestion = async (stackId, maxSubmitTimes, score) => {
        const data = {
            maxSubmitTime: maxSubmitTimes,
            score: score,
        };
        try {
            const res = await questionApi.createNewQuestion(data, stackId);
            if (res.status === 200) {
                console.log(`Created question with ID: ${res.data.id}`);
                return res.data.id;
            } else {
                console.error('Failed to create question: Invalid data');
                return null;
            }
        } catch (error) {
            console.error('Failed to create question:', error);
            return null;
        }
    };

    const createQuestions = async (stackId) => {
        try {
            const promises = questions.map(async (question) => {
                const questionId = await createQuestion(stackId, question.maxSubmitTimes, question.score);
                if (!questionId) {
                    throw new Error('Failed to create question');
                }
                console.log(`Uploading files for question ID: ${questionId}`);
                await uploadQuestionFile(question, questionId);
            });
            await Promise.all(promises);
            toastSuccess('Stack created successfully');
        } catch (error) {
            toastError(error.message);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        let stackId = null;
        try {
            stackId = await createStack(); 
            if (!stackId) {
                toastError('Failed to create stack');
                return;
            }

            await createQuestions(stackId);

            setStackName(""); 
            setQuestions(typeInfo === 'FE' ? FEInitQuestion : BEInitQuestion); 
            setQuestionsUpdated(false); 
        } catch (error) {
            console.error('Error handling submit:', error);
            toastError('Failed to create stack or questions');
        }
    };

    useEffect(() => {
        setQuestions(typeInfo === 'FE' ? FEInitQuestion : BEInitQuestion);
        setQuestionsUpdated(false); 
    }, [typeInfo]);

    useEffect(() => {
        const isQuestionsUpdated = compareQuestionsWithInit(typeInfo, questions);
        if (isQuestionsUpdated) {
            setQuestionsUpdated(true); 
        }
    }, [questions, typeInfo]);

    const compareQuestionsWithInit = (type, questions) => {
        if (type === 'FE') {
            return JSON.stringify(questions) !== JSON.stringify(FEInitQuestion);
        }else  if (type === 'BE') {
            return JSON.stringify(questions) !== JSON.stringify(BEInitQuestion);
        } 
        else {
            return JSON.stringify(questions) !== JSON.stringify(BEInitQuestion);
        }
    }

    const handleSelect = (eventKey) => {
        setTypeInfo(eventKey);
    };

    const handeStackName = (event) => {
        setStackName(event.target.value);
    }

    return (
        <div className="main container h-100 rounded shadow mb-4">
            <Row className='main-header'>
                <Col>
                    <input 
                        className='main-title' 
                        placeholder='Input stack name...'
                        onChange = {handeStackName}
                        value={stackName}/>
                </Col>
                <Col>
                    <Dropdown onSelect={handleSelect} className='main-header-dropdown'>
                        <Dropdown.Toggle variant="success" id="dropdown-basic">
                            Choose type : {typeInfo}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item eventKey="BE">BE</Dropdown.Item>
                            <Dropdown.Item eventKey="FE">FE</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </Col>
            </Row>
            <Row className='main-content-question'>
                {typeInfo === 'FE' 
                ? (
                    <CreateFEQuestions
                        type = {typeInfo}
                        questions={questions}
                        setQuestions={setQuestions}
                        error={errors.find((err) => err.at === 'questions')?.chidren}
                    />
                ) : (
                    <CreateBEQuestions
                        type = {typeInfo}
                        questions={questions}
                        setQuestions={setQuestions}
                        error={errors.find((err) => err.at === 'questions')?.chidren}
                    />
                )}
            </Row>
            <Stack direction="horizontal" gap={3} className="justify-content-end mb-4 main-confirm">
                <button className='confirm-cancel'>Cancel</button>
                <button className='confirm-create' onClick={handleSubmit}>Create Stack</button>
            </Stack>
        </div>
    )
}

export default QuestionCreate;