import { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { Stack } from 'react-bootstrap';
import ButtonStyled from '../../../components/Button';
import { FEInitQuestion, BEInitQuestion } from './initialData';
import { toastError, toastSuccess } from '../../../components/Toast';
// import roomApi from '../../../utils/api/roomApi';
import CreateBEQuestions from './components/CreateBEQuestions';
import CreateFEQuestions from './components/CreateFEQuestions';
import Dropdown from 'react-bootstrap/Dropdown';
import './style.scss';

const CreateQuestion = () => { 
    useEffect()
    const [roomInfo, setRoomInfo] = useState('BE');
    const [questions, setQuestions] = useState(BEInitQuestion);
    const [errors, setErrors] = useState([]);
    
    const handleSubmit = async () => {
            await authApi.login(credentials).then((res)=>{
                if (res.status == 400) {
                    navigate('/login', { state: res.data });
                } else if (res.status === 200) {
                    localStorage.setItem('token', res.data.token);
                    navigate('/');
                }
            });
    //     const payload = { ...roomInfo, questions };
    //     console.log('Payload: ', payload);
    //     await roomApi
    //         .createOne(payload)   //sửa createOne từ room về question  
    //         .then((res) => {
    //             console.error('Response: ', res.data);
    //             if (res.data.status === 200) {
    //                 toastSuccess(res.data.message);
    //                 // setRoomInfo(initialRoomInfo);
    //                 // setQuestions(roomInfo.type === 'FE' ? FEInitQuestion : BEInitQuestion);

    //                 // setTimeout(() => {
    //                 //     window.location.reload();
    //                 // }, 2000);
    //             } else {
    //                 toastError(`${res.data.message}. Open tab Console for more details`);
    //                 setErrors(res.data.err);
    //             }
    //         })
    //         .catch((err) => {
    //             console.error(err);
    //             toastError(err);
    //         });
    };

    useEffect(() => {
        setQuestions(roomInfo.type === 'FE' ? FEInitQuestion : BEInitQuestion);
    }, [roomInfo]);

    const handleSelect = (eventKey) => {
        setRoomInfo(eventKey);
        console.log(roomInfo);
    };

    return (
        <div className="main container h-100 rounded shadow mb-4">
            <Row className='main-header'>
                <Col><h2>Create TestCase</h2></Col>
                <Col>
                    <Dropdown onSelect={handleSelect} className='main-header-dropdown'>
                        <Dropdown.Toggle variant="success" id="dropdown-basic">
                            Choose room : {roomInfo}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item eventKey="BE">BE</Dropdown.Item>
                            <Dropdown.Item eventKey="FE">FE</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </Col>
            </Row>
            <Row className='main-content-question'>
                {roomInfo === 'FE' 
                ? (
                    <CreateFEQuestions
                        questions={questions}
                        setQuestions={setQuestions}
                        error={errors.find((err) => err.at === 'questions')?.chidren}
                    />
                ) : (
                    <CreateBEQuestions
                        questions={questions}
                        setQuestions={setQuestions}
                        error={errors.find((err) => err.at === 'questions')?.chidren}
                    />
                )}
            </Row>
            <Stack direction="horizontal" gap={3} className="justify-content-end mb-4 main-confirm">
                <button className='confirm-cancel'>Cancel</button>
                <button className='confirm-create' onClick={handleSubmit}>
                    Create
                </button>
            </Stack>
        </div>
    )
}

export default CreateQuestion;