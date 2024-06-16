import { useState, useEffect } from 'react';

import { Col, Form, Row } from 'react-bootstrap';

import Loading from '../../../components/Loading';
import questionApi from '../../../utils/api/questionApi';
import TableQuestion from './components/Table';
import { RoomStyle } from './style';

const AdminQuestion = () => {
    const [loading, setLoading] = useState(true);
    const [status, setStatus] = useState('');
    const [type, setType] = useState('');

    const [listQuestion, setListQuestion] = useState([]);

    useEffect(() => {
        let req = {};
        if (status !== ''){
            req.status = status
        } else {
            delete req.status;
        }
        setLoading(true);
        questionApi.getQuestionStack(req).then((response) => {
            setListQuestion(response?.data.data);
            setLoading(false);
        });
    }, [type, status]);

    return loading ? (
        <Loading />
    ) : (
        <div className="w-100 p-2">
            <RoomStyle>
                <div className="box-style">
                    <Col className="p-3">
                        <Row className="color-primary mb-3">
                            <h3 className="fw-bold">Questions Management</h3>
                        </Row>

                        <Row className="d-flex justify-content-around align-items-center mb-3">
                            <Col className="col-4 d-flex justify-content-center col-md-3"></Col>
                            <Col className="col-4 d-flex justify-content-center col-md-3"></Col>
                            <Col className="col-4 d-flex justify-content-center col-md-3">
                                <Col className="col-lg-6">
                                    <Form.Select
                                        id="searchStatus"
                                        aria-label="Default select"
                                        value={status}
                                        onChange={(e) => {
                                            setStatus(e.target.value);
                                        }}
                                    >
                                        <option value="" className="rfs">
                                            All
                                        </option>
                                        <option value="DRAFT" className="rfs">
                                            DRAFT
                                        </option>
                                        <option value="ACTIVE" className="rfs">
                                            ACTIVE
                                        </option>
                                        <option value="DE_ACTIVE" className="rfs">
                                            DE_ACTIVE
                                        </option>
                                        <option value="USED" className="rfs">
                                            USED
                                        </option>
                                    </Form.Select>
                                </Col>
                            </Col>
                        </Row>
                        <Row className="d-flex justify-content-center">
                            <TableQuestion listQuestion={listQuestion} />
                        </Row>
                    </Col>
                </div>
            </RoomStyle>
        </div>
    );
};
export default AdminQuestion;
