import { useEffect, useState } from 'react';

import { Stack } from 'react-bootstrap';

import ButtonStyled from '../../../components/Button';
import { toastError, toastSuccess } from '../../../components/Toast';
import roomApi from '../../../utils/api/roomApi';
import CreateBEQuestions from '../CreateQuestion/components/CreateBEQuestions.jsx';
import CreateFEQuestions from '../CreateQuestion/components/CreateFEQuestions.jsx';
import CreateRoomInfo from './components/CreateRoomInfo';
import { initialRoomInfo, FEInitQuestion, BEInitQuestion } from './initialData';
import * as St from './styles';
import {Link} from "react-router-dom";
import CreateSelectQuestion from "./components/CreateSelectQuestion.jsx";

const CreateRoom = () => {
    // Create question
    const [roomInfo, setRoomInfo] = useState(initialRoomInfo);
    const [questions, setQuestions] = useState([]);
    const [chooseQuestion, setChooseQuestion] = useState('');
    const [errors, setErrors] = useState([]);

    useEffect(() => {
        roomInfo.questionStackId = chooseQuestion;
    }, [chooseQuestion]);

    // Submit
    const handleSubmit = async () => {
        // const payload = { ...roomInfo, questions };
        const payload = roomInfo;
        console.log('Payload: ', payload);
        await roomApi
            .createOne(payload)
            .then((res) => {
                console.error('Response: ', res.data);
                if (res.data.status === 200) {
                    toastSuccess(res.data.message);
                    // setRoomInfo(initialRoomInfo);
                    // setQuestions(roomInfo.type === 'FE' ? FEInitQuestion : BEInitQuestion);

                    // setTimeout(() => {
                    //     window.location.reload();
                    // }, 2000);
                } else {
                    toastError(`${res.data.message}. Open tab Console for more details`);
                    setErrors(res.data.err);
                }
            })
            .catch((err) => {
                console.error(err);
                toastError(err);
            });
    };

    // Re-render when room type change
    // useEffect(() => {
    //     setQuestions(roomInfo.type === 'FE' ? FEInitQuestion : BEInitQuestion);
    // }, [roomInfo.type]);

    return (
        <St.Wrapper>
            <St.Title>Create Room</St.Title>
            <CreateRoomInfo roomInfo={roomInfo} setRoomInfo={setRoomInfo} errs={errors} />
            <CreateSelectQuestion roomInfo={roomInfo} questions={questions} chooseQuestion={chooseQuestion} setChooseQuestion={setChooseQuestion} setQuestions={setQuestions} errs={errors} />
            {/*{roomInfo.type === 'FE' ? (*/}
            {/*    <CreateFEQuestions*/}
            {/*        questions={questions}*/}
            {/*        setQuestions={setQuestions}*/}
            {/*        error={errors.find((err) => err.at === 'questions')?.chidren}*/}
            {/*    />*/}
            {/*) : (*/}
            {/*    <CreateBEQuestions*/}
            {/*        questions={questions}*/}
            {/*        setQuestions={setQuestions}*/}
            {/*        error={errors.find((err) => err.at === 'questions')?.chidren}*/}
            {/*    />*/}
            {/*)}*/}

            <Stack direction="horizontal" gap={3} className="justify-content-end mb-4">
                <Link to="/admin/room" >
                    <ButtonStyled buttonType="secondary">Cancel</ButtonStyled>
                </Link>
                <ButtonStyled buttonType="solid" onClick={handleSubmit}>
                    Create
                </ButtonStyled>
            </Stack>
        </St.Wrapper>
    );
};

export default CreateRoom;
