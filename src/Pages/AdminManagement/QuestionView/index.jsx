import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ViewBE from './components/ViewBE';
import ViewFE from './components/ViewFE';
import questionApi from '../../../utils/api/questionApi';
import { Col, Row } from 'react-bootstrap';
import './style.scss';

const QuestionView = () => { 
    const { id } = useParams(); 
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [type, setType] = useState('');
    const [stackName, setStackName] = useState('');
    const navigate = useNavigate();

    const getAllQuestion = async (stackID) => {
        setData([]);
        try {
            const res = await questionApi.getStackById(stackID);
            if (res.status === 200) {
                setType(res.data.type);
                setStackName(res.data.name);
                return res.data.questions;
            } else if (res.status === 400) {
                setError('Fail to get question list');
                return null;
            }
        } catch (err) {
            setError(err.message);
            return null;
        }
    };

    const getQuestionInfor = async (listQuestion) => {
        try {
            const questionPromises = listQuestion.map(async (element) => {
                const questionId = element.id;
                const res = await questionApi.getQuestionById(questionId);
                if (res.status === 200) {
                    const questionData = res.data.data;
                    return { 
                        ...questionData, 
                        maxSubmitTimes: element.maxSubmitTimes, 
                        score: element.score 
                    };
                } else {
                    console.log('Fail to get question info');
                    return null;
                }
            });
            const questionData = await Promise.all(questionPromises);
            return questionData.filter((q) => q !== null);
        } catch (err) {
            console.log(err.message);
            return [];
        }
    };

    const fetchQuestions = async () => {
        const listQuestions = await getAllQuestion(id);
        console.log(listQuestions);
        if (listQuestions) {
            const questionData = await getQuestionInfor(listQuestions);
            setData(questionData);
        }
    };

    useEffect(() => {
        fetchQuestions();
    }, [id]);

    const handleEdit = (id) => {
        navigate(`/admin/question/edit/${id}`);
    }

    const handleBack = () => {
        navigate(`/admin/question/`);
    }


    return (
        <div className="main container h-100 rounded shadow mb-4">
            { error ? 
            (<p>{error}</p>): (
            <div>
                <Row className='main-header'>
                    <h1 className='main-title'>Stack name: {stackName}</h1>
                </Row>
                <Row className='main-content-question'>
                    {data && data.map((question, questionIndex) => (
                        <div key={questionIndex} className='container'>
                            {type === 'FE' && question != [] ? (
                                <ViewFE question={question} questionIndex={questionIndex}/>
                            ) : (
                                <ViewBE question={question} questionIndex={questionIndex}/>
                            )}
                        </div>
                    ))}
                </Row>
                <Row className='main-button'>
                    <Col style={{textAlign : 'right'}}>
                        <button onClick={handleBack}>Back to Management</button>
                        <button onClick={handleEdit}>Edit</button>
                    </Col>
                </Row>
            </div>)}
        </div>
    );
};

export default QuestionView;