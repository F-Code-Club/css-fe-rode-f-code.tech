import { Col, Row } from 'react-bootstrap';
import { FaCheck } from "react-icons/fa";

const ViewBE = ({ question, questionIndex }) => {
    return (
        <div>
            <h2 className='question-title'>Question {questionIndex + 1}</h2>
            <div className="row">
                <div className="col-md-6">   
                   <div className="row">
                        <div className="col-md-6">
                            <span >Maximum Submit Time:</span>
                            <span>{question.maxSubmitTimes}</span>
                        </div>
                        <div className="col-md-6">
                            <span>Score:</span>
                            <span>{question.score}</span>
                        </div>
                   </div>
                    <div className="row">
                        <div>
                            <label>Image</label>
                            {question?.template?.url ? (
                                <div className="position-relative" style={{ width: '300px'}}>
                                <img
                                    style={{ width: '300px', height: '250px', objectFit: 'cover', marginBottom: '20px' }} 
                                    src={question.template.url} 
                                    alt="Image" 
                                />
                                </div>
                            ) : (
                                <div style={{ width: '300px', height: '200px' }}>None</div>
                            )}
                        </div>
                    </div>
                </div>
                <div className="col-md-6">
                    {question?.testCases.map((testcase, testcaseIdx) => (
                        <div key={testcaseIdx}>
                            <h3 className={`header-testcase ${testcase.isVisible ? 'check-background' : ''}`}>
                                Testcase: {testcaseIdx + 1}
                            </h3>
                            <div className='testcase'>
                                <Row className='testcase-header'>
                                    <Col className='testcase-visible'>
                                        <span>Is Visible</span>
                                        <div className={`testcase-visible-check ${testcase.isVisible ? 'check-background' : ''}`}>
                                            {testcase.isVisible ? (<FaCheck className = 'icon-check' />) : ''}
                                        </div>
                                    </Col>
                                </Row>
                                <Row className='testcase-inputs'> 
                                    <Col className='testcase-input'>
                                        <div className="col-6">
                                            <label htmlFor="input" className='testcase-input-title'>Input</label>
                                                <div>{testcase.input}</div>
                                        </div>
                                    </Col>
                                    <Col className='testcase-input'>
                                        <div className="col-6">
                                            <label htmlFor="output" className='testcase-input-title'>Output</label>
                                            <div>{testcase.output}</div>
                                        </div>
                                    </Col>
                                </Row>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <hr />
        </div>
    )
}

export default ViewBE;