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

const QuestionCreate = () => { 
    const [typeInfo, setTypeInfo] = useState('BE');
    const [questions, setQuestions] = useState(BEInitQuestion);
    const [errors, setErrors] = useState([]);
    const [stackName, setStackName] = useState("");
    
    const handleSubmit = async (event) => {
        event.preventDefault();
            const stackMax = typeInfo === 'BE' ? 15 : 10;
            const data = {
                name: stackName, 
                stackMax: stackMax,
                type: typeInfo,
            }
            await questionApi.createNewStack(data).then(async(res)=> { 
                if(res.data.status == 200){
                    // let stackId = ''; 
                    // await questionApi.getStackByName(stackName).then((res)=>{
                    //     if(res != null){
                    //         stackId = res.id;
                    //     }
                    // })
                }
            })
            
    //     const payload = { ...typeInfo, questions };
    //     console.log('Payload: ', payload);
    //     await roomApi
    //         .createOne(payload)   //sửa createOne từ room về question  
    //         .then((res) => {
    //             console.error('Response: ', res.data);
    //             if (res.data.status === 200) {
    //                 toastSuccess(res.data.message);
    //                 // setTypeInfo(initialtypeInfo);
    //                 // setQuestions(typeInfo.type === 'FE' ? FEInitQuestion : BEInitQuestion);

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
        setQuestions(typeInfo.type === 'FE' ? FEInitQuestion : BEInitQuestion);
    }, [typeInfo]);

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
                <button className='confirm-create' onClick={handleSubmit}>Create Stack</button>
            </Stack>
        </div>
    )
}

export default QuestionCreate;