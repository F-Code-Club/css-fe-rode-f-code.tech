import {Col, Row } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import questionApi from '../../../utils/api/questionApi';
import { useNavigate } from 'react-router-dom';
import { IoSearchSharp } from "react-icons/io5";
import { FiPlus } from "react-icons/fi";
import { IoArrowDownOutline } from "react-icons/io5";
import './style.scss';

const ViewQuestion = () => {
    const [status, setStatus] = useState('ACTIVE');
    const [stackName, setStackName] = useState('');
    const [listStack, setListStack] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
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
        fetchStackByStatus();
        return () => {};
    }, [status]);

    const handleSelect = async(event) => {
        const selectedStatus = event.target.value;
        setStatus(selectedStatus);
        setListStack([]); 

        if (selectedStatus !== '') {
            const status2 = { status: selectedStatus };
            return await questionApi.getStackByStatus(status2)
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
            return await questionApi.getStackByName(stackName)
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

    const handleView = () => {}
    const handleEdit = () => {}
    const handleDelete = () => {}

    return (
        <div className="main container h-100 rounded shadow mb-4">
            <Row className="header main-header">
                <h1 className='main-title' >Stack Management</h1>
            </Row>
            <Row className="subplacement">
                <Col>
                    <IoSearchSharp className='icon'/>
                    <input placeholder='Search name...' value={stackName} type="text" onChange={handeStackName} />
                    <button onClick={handleSearch}>Search</button>
                </Col>
                <Col>
                    <span>Status: </span>
                    <select value={status} onChange={handleSelect} className='bg-black'>
                        <option value="DRAFT">Draft</option>
                        <option value="DE_ACTIVE">De-Active</option>
                        <option value="ACTIVE">Acive</option>
                        <option value="USED">Used</option>
                    </select>
                </Col>
                <Col>
                    <button onClick={handleCreateStack}>
                        <FiPlus className='icon'/>
                        Create Question
                    </button>
                </Col>
            </Row>
            <Row className="inforBoard"> 
                    { (listStack.length > 0)
                    ? (<div className='inforBoard-box'>
                        <Row>
                            <Col>Name</Col>
                            <Col>Type</Col>
                            <Col>Status</Col>
                            <Col>
                                Create At 
                                <IoArrowDownOutline className='icon' /> 
                            </Col>
                            <Col>Option</Col>
                             <hr />
                        </Row>
                        {listStack.map(element => (
                            <Row clasName='inforBoard-box--column'>
                                <Col>{element.name}</Col>
                                <Col>{element.type}</Col>
                                <Col>{element.status}</Col>
                                <Col>{element.createdAt}</Col>
                                <Col>
                                    <button onClick={handleView}>View</button>
                                    <button onClick={handleEdit}>Edit</button>
                                    <button onClick={handleDelete}>Delete</button>
                                </Col>
                                <hr />
                            </Row>))}
                    </div>)
                    : (<div>
                        <p>Nothing</p>
                    </div>)}
            </Row>
        </div>
    )
}

export default ViewQuestion;