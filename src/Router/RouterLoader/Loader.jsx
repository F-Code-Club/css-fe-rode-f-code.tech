import Localstorage from '../../utils/Localstorage';
import authApi from '../../utils/api/authApi';
import roomApi from '../../utils/api/roomApi';
import {fetchAQuestion, fetchQuestionStack} from "../../utils/api/questionStackAPI.js";

export async function loaderInfoGG() {
    const credential = Localstorage.getCredential();
    const info = await authApi.getInfoFromGG(credential);
    return info.data.data;
}
export async function GetInfoRoomByCode({ params }) {
    const CodeID = params.id;
    //console.log(CodeID);
    const info = await roomApi.getRoomByCode(CodeID);

    return info.data.data;
}

export async function GetInfoRoomByCodeCssBattle({ params }) {
    function getMinutesToClose(dateClose) {
        const now = new Date();
        const closeDate = new Date(dateClose);
        const diffInMs = closeDate - now;
        return Math.floor(diffInMs / 1000 / 60);
    }
    const data_base = {
        id: 0,
        questions: [],
        duration: 10
    };
    const CodeID = params.id;
    const info = await roomApi.getRoomByCode(CodeID);
    if (info.status !== 200){
        window.location.href = '/';
        return;
    }
    data_base.id = CodeID;
    const dataStack = await roomApi.getListQuestion(CodeID)
    if (dataStack.status !== 200){
        window.location.href = '/';
        return;
    }
    // console.log(dataStack)
    for (let question of dataStack.data){
        let dataQuestion;
        try {
            dataQuestion = await fetchAQuestion(question);
        } catch (e){
            console.log(`question id ${question} error:`, e);
            continue;
        }

        // console.log(dataQuestion)
        if (true){ // TODO: non-filter question of css battle
            data_base.questions.push({
                id: question,
                codeTemplate: '',
                questionImage: "data:image/jpeg;base64,"+dataQuestion.template_buffer,
                colors: dataQuestion.template.color_code ? dataQuestion.template.color_code : "",
                maxSubmitTimes: dataQuestion.max_submit_time,
                score: dataQuestion.score
            });
        }
    }
    data_base.duration = getMinutesToClose(info.data.close_time)
    // return info.data.data;
    return data_base
}

export async function GetInfoUser() {
    const info = await authApi.getUser();
    const formatUser = {
        firstName: info?.data.fname,
        lastName: info?.data.lname,
        studentId: info?.data.studentId,
        role: info?.data.role,
        id: info?.data.id,
    };

    return formatUser;
}
