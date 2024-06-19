import {Button, Col, Modal, Row } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import questionApi from '../../../utils/api/questionApi';
import { useNavigate } from 'react-router-dom';
import { IoSearchSharp } from "react-icons/io5";
import { FiPlus } from "react-icons/fi";
import { IoArrowDownOutline } from "react-icons/io5";
import './style.scss';
import { toastError, toastSuccess } from '../../../components/Toast';

const QuestionManagement = () => {
    const [status, setStatus] = useState('ACTIVE');
    const [stackName, setStackName] = useState('');
    const [listStack, setListStack] = useState([]);
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [idToDelete, setIdToDelete] = useState(null);
    const [stackToDeleteName, setStackToDeleteName] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        fetchStackByStatus();
    }, [status]);

    const fetchStackByStatus = async () => {
            try {
                const params = { status: status };
                const res = await questionApi.getStackByStatus(params);
                if (res.length !== 0) {
                    const sortedData = res.slice().sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                    setListStack(sortedData);
                } else {
                    setListStack([]);
                }
            } catch (err) {
                console.log("Error" + err);
                setListStack([]);
            }
    };
    
    const handleSelect = async(event) => {
        const selectedStatus = event.target.value;
        setStatus(selectedStatus);
        setListStack([]); 

        if (selectedStatus !== '') {
            const status2 = { status: selectedStatus };
            await questionApi.getStackByStatus(status2)
                .then((res)=> {
                    if (res.length != 0){
                        const sortedData = res.slice().sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                        console.log(sortedData);
                        setListStack(sortedData);
                    }else { 
                        setListStack([]);
                    }
                })
                .catch(err => {
                    console.log("Error" + err);
                })
            }  
    };

    const handleSearch = async() => {
        setListStack([]);
        if (stackName != '') {
            await questionApi.getStackByName(stackName)
                .then((res)=> {
                    if (res != null){
                        let arr = []
                        arr.push(res);
                        setListStack(arr); 
                    }else{ 
                        setListStack([]);
                    }
                }).catch(err => {
                    console.log("Error" + err);
                })
            }
      };

    const handeStackName = (event) => {
        setStackName(event.target.value);
    }

    const handleCreateStack = () => {
        navigate('/admin/question/create');
    };

    const handleView = (id) => {
        navigate(`/admin/question/${id}`);
    }
    const handleEdit = (id) => {
        navigate(`/admin/question/edit/${id}`);
    }

    const handleDelete = (id, name) => {
        setIdToDelete(id);
        setStackToDeleteName(name); 
        setShowConfirmModal(true);
    };

    const handleConfirmDelete = async() => {
        if(idToDelete != null){
            await questionApi.deleteStack(idToDelete)
            .then((res)=> {
                if(res.status == 200){
                    toastSuccess('Delete success');
                }else if(res.status == 400){
                    toastError('Delete fail');
                }
            }).catch((err)=>{
                console.log("Error" + err);
            })
        }
        setShowConfirmModal(false);
        setIdToDelete(null);
        setStackToDeleteName(''); 
        fetchStackByStatus();
    };

    const handleCancelDelete = () => {
        setShowConfirmModal(false);
        setIdToDelete(null);
        setStackToDeleteName('');
    };

    return (
        <div className="main container h-100 rounded shadow mb-4">
            <Row className="header main-header">
                <h1 className='main-title' >Stack Management</h1>
            </Row>
            <Row className='subplacement'>
                <Col className='searchArea'>
                    <IoSearchSharp className='icon'/>
                    <input placeholder='Search name...' value={stackName} type="text" onChange={handeStackName} />
                    <button onClick={handleSearch}>Search</button>
                </Col>
                <Col className='statusArea'>
                    <span>Status: </span>
                    <select value={status} onChange={handleSelect} className='bg-black'>
                        <option value="ACTIVE">Active</option>
                        <option value="DE_ACTIVE">De-Active</option>
                        <option value="USED">Used</option>
                        <option value="DRAFT">Draft</option>
                    </select>
                </Col>
                <Col className='createBtn'>
                    <button onClick={handleCreateStack}>
                        <FiPlus className='icon'/>
                        Create Question
                    </button>
                </Col>
            </Row>
            <Row className="inforBoard"> 
                    { (listStack.length > 0)
                    ? (<div className='inforBoard-box'>
                        <Row className='colName'>
                            <Col>Name</Col>
                            <Col>Type</Col>
                            <Col>Status</Col>
                            <Col className='createCol'>
                                Create At 
                                <IoArrowDownOutline className='icon' /> 
                            </Col>
                            <Col className='optionCol'>Option</Col>
                             <hr/>
                        </Row>
                        {listStack.map(element => (
                            <Row className='inforBoard-box--column tableContent'>
                                <Col>{element.name}</Col>
                                <Col>{element.type}</Col>
                                <Col>{element.status}</Col>
                                <Col>{element.createdAt}</Col>
                                <Col className='optionBtn'>
                                    <button className='view' onClick={() => handleView(element.id)}>View</button>
                                    <button className='edit' onClick={() =>handleEdit(element.id)}>Edit</button>
                                    <button className='delete' onClick={() => handleDelete(element.id, element.name)}>Delete</button>
                                </Col>
                                <hr />
                            </Row>))}
                            <Modal className='popUp' show={showConfirmModal} onHide={handleCancelDelete} centered>
                                <Modal.Header closeButton>
                                    <Modal.Title>Delete confirm</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    Stack name: <strong>{stackToDeleteName}</strong>
                                </Modal.Body>
                                <Modal.Footer>
                                    <Button variant="secondary" onClick={handleCancelDelete}>
                                        No
                                    </Button>
                                    <Button variant="danger" onClick={handleConfirmDelete}>
                                        Yes
                                    </Button>
                                </Modal.Footer>
                            </Modal>
                    </div>)
                    : (<div>
                        <p className='nothingStatus'>Nothing</p>
                    </div>)}
            </Row>
        </div>
    )
}

export default QuestionManagement;