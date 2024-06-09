import { get, post } from '../ApiCaller';
import authHeader from './HeaderAuthorization';

const accountsApi = {
    getAll: async (req) => {
        const endpoint = `/api/v2/accounts/get-all`;
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
    postActive: async (id) => {
        const endpoint = `/api/v2/accounts/toggle-active/${id}`;

        return await post(endpoint, {}, {}, authHeader())
            .then((res) => {
                // if (res.data.code !== 200) console.log(res.response);
                return res;
            })
            .catch((err) => {
                return err;
            });
    },
};

export default accountsApi;
