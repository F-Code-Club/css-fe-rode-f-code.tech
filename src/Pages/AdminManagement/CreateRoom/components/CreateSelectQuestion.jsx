import {useEffect, useState} from "react";
import roomApi from "../../../../utils/api/roomApi.js";
import {toastError, toastSuccess} from "../../../../components/Toast.jsx";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import {Row} from "react-bootstrap";

const CreateSelectQuestion = ({ questions, setQuestions, chooseQuestion, setChooseQuestion, errs }) => {
    let errorChooseQuestion, setErrorChooseQuestion = useState('');

    useEffect( () => {
        (async () => {
            await roomApi
                .adminGetQuestions({})
                .then((res) => {
                    console.error('Response: ', res.data);
                    if (res.data.status === 200) {
                        // toastSuccess(res.data.message);
                        setQuestions(res.data.data)
                    } else {
                        toastError(`${res.data.message}. Open tab Console for more details`);
                        setErrors(res.data.err);
                    }
                })
                .catch((err) => {
                    console.error(err);
                    toastError(err);
                });
        })();
    }, [])

    return (
        <>
            <Row className="mb-3">
                <Form.Group
                    as={Col}
                    md="6"
                    controlId="validationFormik101"
                    className="position-relative"
                >
                    <Form.Label>Add test:</Form.Label>
                    <Form.Select value={chooseQuestion} onChange={(e) => {
                        setChooseQuestion(e.target.value)
                    }}>
                        <option value="" disabled>Select Test</option>
                        {questions.map((item) => {
                            return (<option value={item.id}>{item.name}</option>);
                        })}
                    </Form.Select>
                    {errs.map((err) => {
                        if (err.at === 'questionStackId')
                            return <h6 className="text-danger">{err.message}</h6>;
                    })}
                </Form.Group>
            </Row>
        </>
    );

}
export default CreateSelectQuestion;
