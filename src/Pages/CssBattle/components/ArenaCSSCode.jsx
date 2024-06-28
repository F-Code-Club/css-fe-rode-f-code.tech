import {useState, useEffect, useRef} from 'react';

import { useCookies } from 'react-cookie';
import { useLocation, useNavigate } from 'react-router-dom';

import ButtonStyled from '../../../components/Button';
import OffCanvasComponents from '../../../components/OffCanvas/OffCanvas';
import { toastSuccess, toastError } from '../../../components/Toast';
import { USER_ROOM_ID } from '../../../config';
import submitApi from '../../../utils/api/submitApi';

import userRoomApi from '../../../utils/api/userRoomApi';
import { BoxEditor, TextStyled, TextSmall } from '../styled';
import MySolution from './MySolution';

import { tokyoNight } from '@uiw/codemirror-theme-tokyo-night';
import Spinner from 'react-bootstrap/Spinner';
import Stack from 'react-bootstrap/Stack';

import { CodeTemplateTmp } from '../../../utils/Constant/Dummy';

import * as Y from 'yjs';
import { WebsocketProvider } from 'y-websocket'
import { yCollab } from 'y-codemirror.next';
import { EditorView, } from '@codemirror/view';
import { EditorState } from '@codemirror/state';
import { defaultKeymap } from '@codemirror/commands';
import { dropCursor } from '@codemirror/view';
import { highlightSpecialChars, drawSelection, highlightActiveLine, keymap } from '@codemirror/view';
import { html } from '@codemirror/lang-html';
import {basicSetup} from "codemirror";

const ArenaCSSCode = ({ setCode, setCount, count, code, data, submitService, showRoom, currentQuestionID, infoUser, teamID }) => {
    const [show, setShow] = useState(false);
    const handleShow = () => setShow(true);
    const [userSubmit, setUserSubmit] = useState([]);
    const [submitStatus, setSubmitStatus] = useState(true);
    const [oneTimeSubmit, setOneTimeSubmit] = useState(true);
    const location = useLocation();
    const navigate = useNavigate();
    // const questionResult = JSON.parse(localStorage.getItem('authenticated(do not delete)'));
    const [cookies, setCookie] = useCookies([USER_ROOM_ID]);

    const submitCode = async () => {
        setSubmitStatus(false);
        const formatData = {
            room_code: data.id,
            question_id: currentQuestionID,
            code: code,
            language: "CSS"
        };

        const res = await submitApi.submit(formatData);
        if (res?.status === 200) {
            setOneTimeSubmit(false);
            setSubmitStatus(true);
            localStorage.setItem('authenticated', JSON.stringify(res.data));
            toastSuccess("Successfully.");
        } else {
            setSubmitStatus(true);
            toastError(res.response.data.message);
        }
    };
    function deleteCookies(name) {
        cookies.remove(name, { path: '/' });
    }
    const finish = async () => {
        // let res = await userRoomApi.postFinish(cookies.userroomid);
        //
        // if (res.data.status === 200) {
            navigate('/', { state: { success: true } });
            localStorage.removeItem('code');
            localStorage.removeItem('authenticated');
            localStorage.removeItem('countdownFuture');
            cookies.remove(USER_ROOM_ID, { path: '/' });
            deleteCookies(USER_ROOM_ID);
            toastSuccess(res.data.message);
        // }
    };

    const editorRef = useRef(null);

    useEffect(() => {
        setCode('');
        localStorage.setItem('code', '');
        if (!currentQuestionID) return;
        // Create a Yjs document
        const ydoc = new Y.Doc();

        // Create a WebRTC provider to enable collaborative editing
        const provider = new WebsocketProvider(
            'wss://demos.yjs.dev/ws',
            `${currentQuestionID}/${teamID}`,
            ydoc);

        provider.awareness.setLocalStateField('user', {
            name: infoUser.full_name
        });
        // Create a shared Yjs text type
        const yText = ydoc.getText('codemirror');
        provider.on('synced', () => {
            if (yText.toString().length === 0) {
                yText.insert(0, CodeTemplateTmp);
            }
        });
        // Listener to handle editor updates
        const updateListener = EditorView.updateListener.of((update) => {
            if (update.docChanged) {
                let value = update.state.doc.toString();
                setCode(value);
                localStorage.setItem('code', value);
                setCount(value.length);
            }
        });

        // Create an EditorState instance with the collaborative plugin
        const state = EditorState.create({
            doc: yText.toString(),
            theme: tokyoNight,
            extensions: [
                basicSetup,
                highlightSpecialChars(),
                drawSelection(),
                dropCursor(),
                highlightActiveLine(),
                keymap.of(defaultKeymap),
                yCollab(yText, provider.awareness),
                updateListener,
                html(),
                tokyoNight,
                EditorView.theme({
                    '&.cm-editor': { height: 'calc(100vh - 200px)', width: '100%' },
                    '&.cm-editor .cm-scroller': { overflow: 'auto' }
                })
            ]
        });

        // Create an EditorView instance and attach it to the DOM
        const view = new EditorView({
            state,
            parent: editorRef.current
        });
        return () => {
            view.destroy();
            provider.destroy();
        };
    }, [currentQuestionID]);

    return (
        <>
            <OffCanvasComponents title="My Solution" show={show} setShow={setShow}>
                <MySolution data={userSubmit} />
            </OffCanvasComponents>

            <Stack direction="horizontal" className="justify-content-between mb-3">
                <TextStyled>EDITOR</TextStyled>
                <TextSmall>{count} characters</TextSmall>
            </Stack>
            <BoxEditor>
                <div className="editor" ref={editorRef} style={{ border: '1px solid black', height: 'calc(100vh - 200px)', width: '100%' }}></div>
            </BoxEditor>
            <Stack
                direction="horizontal"
                className="align-items-center mt-3 justify-content-center"
                gap={3}
            >
                <ButtonStyled
                    className="d-xl-none"
                    buttonType="outline"
                    onClick={() => showRoom(true)}
                >
                    ROOM INFORMATION
                </ButtonStyled>

                {/*<ButtonStyled buttonType="outline" onClick={handleShow}>*/}
                {/*    MY SOLUTION*/}
                {/*</ButtonStyled>*/}
                <ButtonStyled buttonType="outline2" onClick={submitCode} disabled={!submitStatus}>
                    {submitStatus ? 'SUBMIT' : <Spinner size="sm" />}
                </ButtonStyled>
                <ButtonStyled buttonType="outline" onClick={finish} disabled={oneTimeSubmit}>
                    FINISH
                </ButtonStyled>
            </Stack>
        </>
    );
};

export default ArenaCSSCode;
