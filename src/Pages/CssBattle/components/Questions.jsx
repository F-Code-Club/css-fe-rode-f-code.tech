import { useLoaderData } from 'react-router-dom';

import { TypeV2 } from '../../Home/styled';

import Dropdown from 'react-bootstrap/Dropdown';

const Questions = ({ handleQuestionChange, question, setCurrentQuestion, action }) => {
    const types = [
        { name: 'All', id: 1 },
        { name: 'Algorithm', id: 2 },
        { name: 'CSS Battle', id: 3 },
    ];
    const roomInfo = useLoaderData();

    return (
        <TypeV2>
            <Dropdown className="d-inline mx-2" onSelect={handleQuestionChange}>
                <Dropdown.Toggle id="dropdown-autoclose-true" className="bg border button head">
                    {question.current}
                </Dropdown.Toggle>

                <Dropdown.Menu className="bg border transform menu">
                    {roomInfo.questions.length !== 0 ? (
                        roomInfo.questions.map((question, id) => {
                            return (
                                <Dropdown.Item
                                    eventKey={question.questionImage}
                                    key={id}
                                    name={`Question ${id + 1}`}
                                    onClick={() => {
                                        // const codeTemplate = roomInfo?.questions[id]?.codeTemplate;
                                        action(question.id);
                                        setCurrentQuestion(id);
                                        // setShowImg(true);
                                        // setCode(codeTemplate);
                                    }}
                                >
                                    Question {id + 1}
                                </Dropdown.Item>
                            );
                        })
                    ) : (
                        <div> ERROR</div>
                    )}
                </Dropdown.Menu>
            </Dropdown>
        </TypeV2>
    );
};

export default Questions;
// onSelect = { handleTypeChange };
