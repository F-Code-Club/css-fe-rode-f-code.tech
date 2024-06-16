import React from 'react';
import { useState } from 'react';
import { Accordion, Col, Row } from 'react-bootstrap';
import Dropdown from 'react-bootstrap/Dropdown';
import * as St from '../styles';
import {
    editInputTestcase as handleInput,
    editOutputTestcase as handleOutput,
    deleteTestcase,
} from './utils';

const Testcase = ({item, testcaseIdx, questionIdx, setQuestions, error }) => {
    const [visible, setVisible] = useState(true);

    const handleDelete = () => {
        deleteTestcase(questionIdx, testcaseIdx, setQuestions);
    };

    const handleCheckboxChange = () => {
        setVisible(!visible);
        setQuestions((prev) => {
            const newQuestions = [...prev];
            newQuestions[questionIdx].testCases[testcaseIdx].visible = !newQuestions[questionIdx].testCases[testcaseIdx].visible;
            return newQuestions;
        });
    };

    return (
        <Accordion.Item eventKey={testcaseIdx}>
            <Accordion.Header className={`header-testcase  ${visible ? '' : 'orange-background'}`}>
                Testcase {testcaseIdx + 1} 
            </Accordion.Header>
            <Accordion.Body className='testcase'>
                <St.Testcase className="row testcase-body">
                    <Row className='testcase-header'>
                        <Col className='testcase-delete' >
                            <button onClick={handleDelete}>Delete</button>
                        </Col>
                        <Col className='testcase-visible'>
                            <span>Is Visible</span>
                            <input type='checkbox'
                                checked={item.visible}
                                onChange={handleCheckboxChange}
                            ></input>
                        </Col>
                    </Row>
                    <Row className='testcase-inputs'> 
                        <Col className='testcase-input'>
                            <div className="col-6">
                            <label htmlFor="input" className='testcase-input-title'>Input</label>
                            <textarea
                                name="input"
                                id="input"
                                cols="20"
                                rows="7"
                                onChange={(e) =>
                                    handleInput(e.target.value, questionIdx, testcaseIdx, setQuestions)
                                }
                                ></textarea>
                            </div>
                        </Col>
                        <Col className='testcase-input'>
                            <div className="col-6">
                                <label htmlFor="output" className='testcase-input-title'>Output</label>
                                <textarea
                                    name="output"
                                    id="output"
                                    cols="20"
                                    rows="7"
                                    onChange={(e) =>
                                        handleOutput(e.target.value, questionIdx, testcaseIdx, setQuestions)
                                    }
                                ></textarea>
                            </div>
                        </Col>
                    </Row>
                </St.Testcase>
            </Accordion.Body>
            <h6 className="text-danger">{error}</h6>
        </Accordion.Item>
    );
};

export default Testcase;
