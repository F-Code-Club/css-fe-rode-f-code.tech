import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import questionApi from '../../../utils/api/questionApi';
import { useNavigate } from 'react-router-dom';

const QuestionEdit = () => {
    const { id } = useParams();
    const [stack, setStack] = useState(null);
    const [name, setName] = useState('');
    const [type, setType] = useState('');
    const [status, setStatus] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchStackById = async () => {
            try {
                const res = await questionApi.getStackById(id);
                if (res) {
                    setStack(res);
                    setName(res.name);
                    setType(res.type);
                    setStatus(res.status);
                } else {
                    console.log("Stack not found");
                }
            } catch (err) {
                console.log("Error fetching stack: " + err);
            }
        };

        fetchStackById();
    }, [id]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            // const updatedStack = { id, name, type, status };
            // await questionApi.updateStack(updatedStack);
            console.log('update' + name);
            navigate('/admin/question'); // Sau khi cập nhật thành công, quay trở lại trang quản lý stack
        } catch (err) {
            console.log("Error updating stack: " + err);
        }
    };

    const handleCancel = () => {
        navigate('/admin/question'); // Hủy chỉnh sửa và quay trở lại trang quản lý stack
    };

    const handleChangeName = (event) => {
        setName(event.target.value);
    };

    const handleChangeType = (event) => {
        setType(event.target.value);
    };

    const handleChangeStatus = (event) => {
        setStatus(event.target.value);
    };

    if (!stack) {
        return <p>Loading...</p>;
    }

    return (
        <div className="container">
            <h1>Edit Stack</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name:</label>
                    <input type="text" value={name} onChange={handleChangeName} />
                </div>
                <div>
                    <label>Type:</label>
                    <input type="text" value={type} onChange={handleChangeType} />
                </div>
                <div>
                    <label>Status:</label>
                    <input type="text" value={status} onChange={handleChangeStatus} />
                </div>
                <button type="submit">Save</button>
                <button type="button" onClick={handleCancel}>Cancel</button>
            </form>
        </div>
    );
};

export default QuestionEdit;
