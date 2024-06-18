
import {Col, Row } from 'react-bootstrap';

const ViewQuestion = () => {
    return (
        <div className="bg-black h-100 rounded">
            <Row className="header">
                <h1>Stack Management</h1>
            </Row>
            <Row className="subplacement">
                <Col>
                    <input placeholder='Search room'>

                    </input>
                </Col>
                <Col>
                    <span>Status: </span>
                    
                </Col>
            </Row>
            <Row className="inforBoard">

            </Row>
        </div>
    )
}

export default ViewQuestion;