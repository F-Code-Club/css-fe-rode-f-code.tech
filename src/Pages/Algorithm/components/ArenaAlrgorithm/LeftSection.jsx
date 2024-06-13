// import { useState } from 'react';

// import { Col, Container, Row, Stack } from 'react-bootstrap';

// import localFileApi from '../../../../utils/api/localFileApi';
// import CountdownTimer from '../../../CssBattle/components/CountDown';
// import { TimeText, ChooseQWrapper } from '../../styled';
// import { Title } from '../LeaderBoard/styled';
// import { FormSelectStyled } from '../LeaderBoard/styled';
// import { Timer } from '../LeaderBoard/styled';
// import RightSection from './RightSection';

// import Dropdown from 'react-bootstrap/Dropdown';
// import Form from 'react-bootstrap/Form';


// const LeftSection = ({ roomInfo }) => {
//     // Localstorage here
//     const [currentQuestion, setCurrentQuestion] = useState(0);
//     const currCode = localStorage.getItem('codeBE');
//     const currQuestion = JSON.parse(localStorage.getItem('question'));
//     const codeTemplate = roomInfo?.questions[currentQuestion]?.codeTemplate;

//     const [question, setQuestion] = useState({
//         current: currQuestion ? currQuestion.current : 'Choose question',
//         questionImg: currQuestion
//             ? currQuestion.questionImg
//             : roomInfo?.questions[0]?.questionImage,
//     });

//     const TestImg = localFileApi.getImg(question.questionImg);
//     const [imageError, setImageError] = useState(false);
//     const [showRemind, setShowRemind] = useState(currQuestion ? false : true);
//     const handleImageError = () => {
//         setImageError(true);
//     };
//     const [code, setCode] = useState(currCode ? currCode : codeTemplate);
//     const [questionId, setQuestionId] = useState();
//     const handleQuestionChange = (eventKey, e) => {
//         setQuestion({
//             current: e.target.name,
//             questionImg: eventKey,
//         });

//         localStorage.setItem(
//             'question',
//             JSON.stringify({
//                 current: e.target.name,
//                 questionImg: eventKey,
//             })
//         );
//     };

//     const [showResult, setShowResult] = useState(false); // Show small tabs
//     const [showImg, setShowImg] = useState(currQuestion ? true : false);
//     return (
//         <Container fluid={'lg'}>
//             <Row className="overflow-y-auto p-4 ">
//                 <div className="d-flex justify-content-between align-items-center mb-4">
//                     <ChooseQWrapper>
//                         <Dropdown className="d-inline mx-2" onSelect={handleQuestionChange}>
//                             <Dropdown.Toggle
//                                 id="dropdown-autoclose-true"
//                                 className="bg border button head  styled"
//                             >
//                                 {question.current}
//                             </Dropdown.Toggle>

//                             <Dropdown.Menu className="bg border transform menu">
//                                 {roomInfo.questions.length !== 0 ? (
//                                     roomInfo.questions.map((question, id) => {
//                                         return (
//                                             <Dropdown.Item
//                                                 eventKey={question.questionImage}
//                                                 key={id}
//                                                 name={`Question ${id + 1}`}
//                                                 onClick={() => {
//                                                     const codeTemplate =
//                                                         roomInfo?.questions[id]?.codeTemplate;
//                                                     setQuestionId(question.id);
//                                                     setCurrentQuestion(id);
//                                                     setShowImg(true);
//                                                     setCode(codeTemplate);
//                                                 }}
//                                             >
//                                                 Question {id + 1}
//                                             </Dropdown.Item>
//                                         );
//                                     })
//                                 ) : (
//                                     <div> ERROR</div>
//                                 )}
//                             </Dropdown.Menu>
//                         </Dropdown>
//                     </ChooseQWrapper>
//                     <Timer>
//                         <Title>Times:</Title>
//                         <TimeText>
//                             <CountdownTimer targetDate={roomInfo.duration} />
//                         </TimeText>
//                     </Timer>
//                 </div>
//                 <Col className=" d-flex align-items-center justify-content-center">
//                     {imageError ? (
//                         <div className="text-light"> Image ERROR!!!!!</div>
//                     ) : (
//                         <>
//                             {showImg && (
//                                 <div className={{ pointerEvents: 'none' }}>
//                                     <img
//                                         src={TestImg}
//                                         alt="target_img"
//                                         onError={handleImageError}
//                                     />
//                                 </div>
//                             )}
//                         </>
//                     )}
//                 </Col>
//                 <Col>
//                     <RightSection
//                         roomInfo={roomInfo}
//                         questionId={questionId}
//                         currentQuestion={currentQuestion}
//                         code={code}
//                         setCode={setCode}
//                         showResult={showResult}
//                         setShowResult={setShowResult}
//                     />
//                 </Col>
//             </Row>
//         </Container>
//     );
// };

// export default LeftSection;
import { useState, useEffect } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import Dropdown from 'react-bootstrap/Dropdown';
import CountdownTimer from '../../../CssBattle/components/CountDown';
import { TimeText, ChooseQWrapper } from '../../styled';
import { Title, Timer } from '../LeaderBoard/styled';
import RightSection from './RightSection';
import styled from 'styled-components'; // or your preferred styling solution

// New styled components for the description
const DescriptionWrapper = styled.div`
  color: #ffffff; // White text
`;

const QuestionTitle = styled.h2`
  color: #ffffff;
  margin-bottom: 1rem;
`;

const QuestionDescription = styled.p`
  color: #ffffff;
  margin-bottom: 1.5rem;
`;

const ExamplesTitle = styled.h4`
  color: #ffffff;
  margin-top: 1.5rem;
`;

const ExampleItem = styled.div`
  color: #ffffff;
  margin-bottom: 1rem;
`;

const ConstraintsTitle = styled.h4`
  color: #ffffff;
  margin-top: 1.5rem;
`;

const ConstraintsList = styled.ul`
  color: #ffffff;
  padding-left: 1.5rem;
`;

const LeftSection = ({ roomInfo, currentQuestion, setCurrentQuestion }) => {
  const [question, setQuestion] = useState({
    current: `Question ${currentQuestion + 1}`,
    data: roomInfo.questions[currentQuestion],
  });

  useEffect(() => {
    setQuestion({
      current: `Question ${currentQuestion + 1}`,
      data: roomInfo.questions[currentQuestion],
    });
  }, [currentQuestion, roomInfo.questions]);

  const handleQuestionChange = (eventKey) => {
    const questionIndex = parseInt(eventKey, 10) - 1;
    setCurrentQuestion(questionIndex);
  };

  return (
    <Container fluid={'lg'}>
      <Row className="overflow-y-auto p-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <ChooseQWrapper>
            <Dropdown className="d-inline mx-2" onSelect={handleQuestionChange}>
              <Dropdown.Toggle id="dropdown-autoclose-true" className="bg border button head styled">
                {question.current}
              </Dropdown.Toggle>
              <Dropdown.Menu className="bg border transform menu">
                {roomInfo.questions.map((_, index) => (
                  <Dropdown.Item eventKey={index + 1} key={index}>
                    Question {index + 1}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
          </ChooseQWrapper>
          <Timer>
            <Title>Time:</Title>
            <TimeText>
              <CountdownTimer targetDate={roomInfo.duration} />
            </TimeText>
          </Timer>
        </div>
        <Col className="mb-4">
          <DescriptionWrapper>
            <QuestionTitle>{question.data.title}</QuestionTitle>
            <QuestionDescription>{question.data.description}</QuestionDescription>
            <ExamplesTitle>Examples:</ExamplesTitle>
            {question.data.examples.map((example, index) => (
              <ExampleItem key={index}>
                <p>Input: {example.input}</p>
                <p>Output: {example.output}</p>
                <p>Explanation: {example.explanation}</p>
              </ExampleItem>
            ))}
            <ConstraintsTitle>Constraints:</ConstraintsTitle>
            <ConstraintsList>
              {question.data.constraints.map((constraint, index) => (
                <li key={index}>{constraint}</li>
              ))}
            </ConstraintsList>
          </DescriptionWrapper>
        </Col>
        <Col>
          <RightSection
            questionData={question.data}
            code={question.data.codeTemplate}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default LeftSection;