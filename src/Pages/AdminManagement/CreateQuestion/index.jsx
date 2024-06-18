import { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { Stack } from 'react-bootstrap';
//import ButtonStyled from '../../../components/Button';
import { FEInitQuestion, BEInitQuestion } from './initialData';
import { toastError, toastSuccess } from '../../../components/Toast';
import questionApi from '../../../utils/api/questionApi';
import CreateBEQuestions from './components/CreateBEQuestions';
import CreateFEQuestions from './components/CreateFEQuestions';
import Dropdown from 'react-bootstrap/Dropdown';
import './style.scss';

const CreateQuestion = () => { 
    const [roomInfo, setRoomInfo] = useState('BE');
    const [questions, setQuestions] = useState(BEInitQuestion);
    const [errors, setErrors] = useState([]);
    const [stackName, setStackName] = useState("");
    
    const handleSubmit = async () => {
            const stackMax = roomInfo === 'BE' ? 15 : 10;
            const data = {
                name: stackName, 
                stackMax: stackMax,
                type: roomInfo,
            }
            await questionApi.createNewStack(data).then((res)=> { 
                if(res.data.status == 200){
                    toastSuccess(res.data.message);
                }
            })
            
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