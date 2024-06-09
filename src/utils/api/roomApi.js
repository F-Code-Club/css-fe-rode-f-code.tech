import { post, get } from '../ApiCaller';
import authHeader from './HeaderAuthorization';
import localFileApi from './localFileApi';

const roomApi = {
    userGetAllRoom: async (data) => {
        const endpoint = `/api/v2/rooms/user-get-all`;
        // eslint-disable-next-line no-return-await

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
        const endpoint = `/api/v2/rooms/get-all-room-type`;
        return await get(endpoint, {}, { Authorization: 'Bearer ' + token });
    },
    getRoomByCode: async (code) => {
        const endpoint = `/api/v2/rooms/get-one-by-code/${code.toUpperCase()}`;
        return await get(endpoint, {}, authHeader())
            .then((res) => {
                return res;
            })
            .catch((err) => {
                return err;
            });
    },
    getRoomById: async (roomID) => {
        const endpoint = `/api/v2/rooms/get-one-by-id/${roomID}`;
        return await get(endpoint, {}, authHeader())
            .then((res) => {
                return res;
            })
            .catch((err) => {
                return err;
            });
    },
    adminGetAll: async (req) => {
        const endpoint = `/api/v2/rooms/admin-get-all`;
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
        const endpoint = `/api/v2/rooms/create-one`;
        return await post(endpoint, data, {}, { Authorization: 'Bearer ' + token })
            .then((res) => res)
            .catch((err) => err);
    },
    updateRoomById: async (roomID, data) => {
        const token = localStorage.getItem('token');
        const endpoint = `/api/v2/rooms/update-one-by-id/${roomID}`;
        // eslint-disable-next-line no-return-await

        return await post(endpoint, data, {}, { Authorization: 'Bearer ' + token })
            .then((res) => {
                // if (res.data.code !== 200) console.log(res.response);

                return res;
            })
            .catch((err) => {
                return err;
            });
    },
    getAllRomType: async () => {
        const endpoint = `/api/v2/rooms/get-all-room-type`;
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
    getSubmitHistoryByQuestion: async (question, currentPage) => {
        const endpoint = `/submit-history/get-by-question/${question}?page=${currentPage}&limit=1000`;
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
    getSubmitHistoryByRoom: async (data) => {
        const endpoint = `/submit-history/get-by-room/${data.id}`;
        // eslint-disable-next-line no-return-await

        return await get(endpoint, { roomId: data.id, limit: 100, page: 1 }, authHeader())
            .then((res) => {
                // if (res.data.code !== 200) console.log(res.response);

                return res;
            })
            .catch((err) => {
                return err;
            });
    },
};

export default roomApi;
