import { useState } from 'react';

import { Container, Spinner } from 'react-bootstrap';
import { useCookies } from 'react-cookie';
import { useLocation, useLoaderData, useNavigate } from 'react-router-dom';

import ButtonStyled from '../../../../components/Button';
import { toastSuccess, toastError, toastInfo } from '../../../../components/Toast';
import { USER_ROOM_ID } from '../../../../config';
import submitApi from '../../../../utils/api/submitApi';
import userRoomApi from '../../../../utils/api/userRoomApi';
import { BoxEditor, ChooseQWrapper, WrapRightSection } from '../../styled';

import { cppLanguage } from '@codemirror/lang-cpp';
import { htmlLanguage } from '@codemirror/lang-html';
import { javaLanguage } from '@codemirror/lang-java';
import { tokyoNight } from '@uiw/codemirror-theme-tokyo-night';
import CodeMirror from '@uiw/react-codemirror';
import Dropdown from 'react-bootstrap/Dropdown';

const RightSection = ({
    questionId,
    currentQuestion,
    code,
    setCode,
    showResult,
    setShowResult,
}) => {
    const [cookies, setCookie] = useCookies([USER_ROOM_ID]);
    const language = localStorage.getItem('language');
    const location = useLocation();
    const roomInfo = useLoaderData();

    const [submitStatus, setSubmitStatus] = useState(true);
    const [oneTimeSubmit, setOneTimeSubmit] = useState(true);
    const [isLanguage, setIsLanguage] = useState(language ? true : false);
    const [select, setSelect] = useState(language ? language : 'Choose language');
    const navigate = useNavigate();
    const langs = [
        { name: 'C_CPP', id: 1 },
        { name: 'JAVA', id: 2 },
        { name: 'PYTHON', id: 3 },
    ];
    const handleSelectChange = (eventKey) => {
        setSelect(eventKey);
        localStorage.setItem('language', eventKey);
        setIsLanguage(true);
    };
    const submitCode = async () => {
        setSubmitStatus(false);
        if (!isLanguage) {
            toastError('Language is not defined');
            return;
        } else if (code == null) {
            toastError("Can't submit Empty Code");
            return;
        }
        const res = await submitApi.submitV2({
            roomId: roomInfo?.id,
            questionId: questionId,
            code: code,
            language: select,
        });

        if (res.data.status === 200) {
            setSubmitStatus(true);
            setOneTimeSubmit(false);
            localStorage.setItem('authenticated', JSON.stringify(res.data.data));
            toastSuccess(res.data.message);
        } else {
            setSubmitStatus(true);
            toastError(res.data.err);
        }
    };
    function deleteCookies(name) {
        cookies.remove(name, { path: '/' });
    }
    const finish = async () => {
        let res = await userRoomApi.postFinish(cookies.userroomid);

        if (res.data.status === 200) {
            navigate('/', { state: { success: true } });
            localStorage.removeItem('code');
            localStorage.removeItem('authenticated');
            localStorage.removeItem('countdownFuture');
            cookies.remove(USER_ROOM_ID, { path: '/' });
            deleteCookies(USER_ROOM_ID);
            toastSuccess(res.data.message);
        }
    };

    return (
        <Container className="p-2">
            <WrapRightSection>
                <div className="text-light mb-4">
                    <h4 className="text-center"> SUBMIT CODE</h4>
                    <ChooseQWrapper>
                        <Dropdown className="d-inline mx-2 mt-2" onSelect={handleSelectChange}>
                            <Dropdown.Toggle
                                id="dropdown-autoclose-true"
                                className="bg border button head  styled"
                            >
                                {select}
                            </Dropdown.Toggle>

                            <Dropdown.Menu className="bg border transform menu">
                                {langs.map((lang) => {
                                    return (
                                        <Dropdown.Item
                                            eventKey={lang.name}
                                            key={lang.id}
                                            name={`${lang.name}`}
                                        >
                                            {lang.name}
                                        </Dropdown.Item>
                                    );
                                })}
                            </Dropdown.Menu>
                        </Dropdown>
                    </ChooseQWrapper>
                </div>
                <BoxEditor maxHeight={showResult}>
                    <CodeMirror
                        className="editor"
                        value={code}
                        style={{ transition: `all 0.4s ease-in;` }}
                        theme={tokyoNight}
                        height="calc(100vh - 390px);"
                        maxHeight={showResult ? '40vh' : 'calc(100vh - 400px)'}
                        extensions={[cppLanguage, javaLanguage]}
                        onChange={(event) => {
                            setCode(event);
                            localStorage.setItem('codeBE', event);
                        }}
                    />
                </BoxEditor>
                <div className="d-flex align-items-center justify-content-center text-light pt-2 gap-3">
                    <ButtonStyled
                        buttonType="outline2"
                        onClick={submitCode}
                        disabled={!submitStatus}
                    >
                        {submitStatus ? 'SUBMIT' : <Spinner size="sm" />}
                    </ButtonStyled>
                    <ButtonStyled buttonType="outline" onClick={finish} disabled={oneTimeSubmit}>
                        FINISH
                    </ButtonStyled>
                </div>
            </WrapRightSection>
        </Container>
    );
};

export default RightSection;
