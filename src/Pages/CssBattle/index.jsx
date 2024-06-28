import {useState, Suspense, useEffect} from 'react';

import { Container } from 'react-bootstrap';
import { useLoaderData } from 'react-router-dom';

import ModalComponent from '../../components/Modal/Modal';
import OffCanvasComponents from '../../components/OffCanvas/OffCanvas';
import { CodeTemplateTmp } from '../../utils/Constant/Dummy';
import userRoomApi from '../../utils/api/userRoomApi';
import ArenaCSSCode from './components/ArenaCSSCode';
import Output from './components/Output';
import RoomInfo from './components/RoomInfo';
import { PaddingRow } from './styled';

import Col from 'react-bootstrap/Col';
import {GetInfoUser} from "../../Router/RouterLoader/Loader.jsx";
import authApi from "../../utils/api/authApi.js";

const ArenaCSS = () => {
    const roomInfo = useLoaderData();
    const currCode = localStorage.getItem('code');
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const codeTemplate = roomInfo?.questions[currentQuestion]?.codeTemplate
        ? roomInfo?.questions[currentQuestion].codeTemplate
        : CodeTemplateTmp;
    const [code, setCode] = useState(currCode ? currCode : codeTemplate);
    const currQuestion = null
    const [questionId, setQuestionId] = useState();
    const [question, setQuestion] = useState({
        current: currQuestion ? currQuestion.current : 'Choose question',
        questionImg: currQuestion
            ? currQuestion.questionImg
            : roomInfo?.questions[currentQuestion]?.questionImage,
    });

    const [infoUser, setInfoUser] = useState(null);
    const [teamID, setTeamID] = useState(null);

    useEffect(() => {
        (async () => {
            let info_user = await authApi.getTeamId();
            console.log(info_user.status)
            if (info_user.status === 200){
                setTeamID(info_user.data);
            }
            console.log(teamID)
        })();
    }, []);

    useEffect(() => {
        (async () => {
            let info_user = await authApi.getUserInfo();
            console.log(info_user.status)
            if (info_user.status === 200){
                setInfoUser(info_user.data);
            }
        })();
    }, []);

    useEffect(() => {
        console.log(questionId, currentQuestion)
    }, [questionId, currentQuestion])

    const handleQuestionChange = (eventKey, e) => {
        setQuestion({
            current: e.target.name,
            questionImg: eventKey,
        });

        localStorage.setItem(
            'question',
            JSON.stringify({
                current: e.target.name,
                questionImg: eventKey,
            })
        );
    };

    const [count, setCount] = useState(0);
    const [submit, setSubmit] = useState();
    const [show, setShow] = useState(false);
    return (
        <PaddingRow>
            {/* Columns start at 50% wide on mobile and bump up to 33.3% wide on desktop */}

            <OffCanvasComponents title="Room information" show={show} setShow={setShow}>
                <RoomInfo
                    data={roomInfo}
                    submit={submit}
                    question={question}
                    currentQuestion={currentQuestion}
                    setCurrentQuestion={setCurrentQuestion}
                    action={setQuestionId}
                    QuestionChange={handleQuestionChange}
                />
            </OffCanvasComponents>
            <Col md={false} xl={3} className="d-none d-xl-grid px-4">
                <RoomInfo
                    data={roomInfo}
                    submit={submit}
                    question={question}
                    currentQuestion={currentQuestion}
                    setCurrentQuestion={setCurrentQuestion}
                    action={setQuestionId}
                    QuestionChange={handleQuestionChange}
                />
            </Col>
            <Col xs={12} md={6} xl={5} className="px-4">
                <ArenaCSSCode
                    submitService={{ submit, setSubmit }}
                    setCode={setCode}
                    setCount={setCount}
                    count={count}
                    code={code}
                    data={roomInfo}
                    showRoom={setShow}
                    currentQuestionID={questionId}
                    infoUser={infoUser}
                    teamID={teamID}
                />
            </Col>

            <Col xs={12} md={6} xl={4} className="px-4">
                <Output code={code} data={roomInfo} currentQuestion={currentQuestion} />
            </Col>
        </PaddingRow>
    );
};

export default ArenaCSS;
