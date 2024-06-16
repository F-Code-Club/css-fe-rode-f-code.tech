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
