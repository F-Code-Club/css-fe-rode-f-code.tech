import { get } from '../ApiCaller';
import authHeader from './HeaderAuthorization';

const accountsApi = {
    getAll: async () => {
        const endpoint = `/accounts/get-all`;
        // eslint-disable-next-line no-return-await

        return await get(endpoint, {}, authHeader())
            .then((res) => {
                console.log('res' + res);
                // if (res.data.code !== 200) console.log(res.response);
                return res;
            })
            .catch((err) => {
                console.log('🚀 ~ file: accountsApi.js:17 ~ getAll: ~ err:', err);
                return err;
            });
    },
};

export default accountsApi;
