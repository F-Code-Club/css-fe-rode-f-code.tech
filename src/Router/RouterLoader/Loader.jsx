import Localstorage from '../../utils/Localstorage';
import authApi from '../../utils/api/authApi';
import roomApi from '../../utils/api/roomApi';

export async function loaderInfoGG() {
    const credential = Localstorage.getCredential();
    const info = await authApi.getInfoFromGG(credential);
    return info.data.data;
}
export async function GetInfoRoomByCode({ params }) {
    const CodeID = params.id;
    console.log(CodeID);
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
        questions: [{
            codeTemplate: '',
            questionImage: '',
            colors: '#e26a53, #282c34, #f04338',
            maxSubmitTimes: 3
        }],
        duration: 10
    };
    const CodeID = params.id;
    const info = await roomApi.getRoomByCode(CodeID);
    console.log(info.data)

    data_base.duration = getMinutesToClose(info.data.data.closeTime)
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
