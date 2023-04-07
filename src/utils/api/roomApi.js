import { post, get } from '../ApiCaller';
import authHeader from './HeaderAuthorization';

const roomAPI = {
    userGetAllRoom: async (data) => {
        const endpoint = `/rooms/user-get-all`;
        // eslint-disable-next-line no-return-await
        console.log(data);
        return await get(endpoint, data, authHeader())
            .then((res) => {
                // if (res.data.code !== 200) console.log(res.response);
                return res;
            })
            .catch((err) => {
                return err;
            });
    },
    getAllRoomType: async () => {
        const token = localStorage.getItem('token');
        const endpoint = `/rooms/get-all-room-type`;
        return await get(endpoint, {}, { Authorization: 'Bearer ' + token });
    },
    getRoomByCode: async (code) => {
        const endpoint = `/rooms/get-one-by-code/${code}`;
        return await get(endpoint, {}, authHeader())
            .then((res) => {
                return res;
            })
            .catch((err) => {
                console.log('🚀 ~ file: roomApi.js:17 ~ getAll: ~ err:', err);
                return err;
            });
    },
    getRoomById: async (roomID) => {
        const endpoint = `/rooms/get-one-by-id/${roomID}`;
        return await get(endpoint, {}, authHeader())
            .then((res) => {
                return res;
            })
            .catch((err) => {
                console.log('🚀 ~ file: roomApi.js:17 ~ getAll: ~ err:', err);
                return err;
            });
    },
    adminGetAll: async (req) => {
        const endpoint = `/rooms/admin-get-all`;
        // eslint-disable-next-line no-return-await

        return await get(endpoint, req, authHeader())
            .then((res) => {
                // if (res.data.code !== 200) console.log(res.response);
                return res;
            })
            .catch((err) => {
                return err;
            });
    },
    createOne: async (data) => {
        const token = localStorage.getItem('token');
        const endpoint = `/rooms/create-one`;
        return await post(endpoint, data, {}, { Authorization: 'Bearer ' + token })
            .then((res) => console.log(res))
            .catch((err) => console.err(err));
    },
    getAllRomType: async () => {
        const endpoint = `/rooms/get-all-room-type`;
        // eslint-disable-next-line no-return-await

        return await get(endpoint, {}, authHeader())
            .then((res) => {
                // if (res.data.code !== 200) console.log(res.response);
                return res;
            })
            .catch((err) => {
                return err;
            });
    },
    getSubmitHistoryByQuestion: async (question) => {
        const endpoint = `/submit-history/get-by-question/${question}`;
        // eslint-disable-next-line no-return-await

        return await get(endpoint, {}, authHeader())
            .then((res) => {
                // if (res.data.code !== 200) console.log(res.response);
                return res;
            })
            .catch((err) => {
                return err;
            });
    },
    getSubmitHistoryByRoom: async (roomID) => {
        const endpoint = `/submit-history/get-by-room/${roomID}`;
        // eslint-disable-next-line no-return-await

        return await get(endpoint, {}, authHeader())
            .then((res) => {
                // if (res.data.code !== 200) console.log(res.response);
                console.log(res);
                return res;
            })
            .catch((err) => {
                return err;
            });
    },
};

export default roomAPI;
