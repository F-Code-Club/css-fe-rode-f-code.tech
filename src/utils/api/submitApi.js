import { post, get } from '../ApiCaller';
import Localstorage from '../Localstorage';
import authHeader from './HeaderAuthorization';

const submitApi = {
    submit: async (data) => {
        const endpoint = `/scoring/submit`;
        // eslint-disable-next-line no-return-await
        const token = localStorage.getItem('token');

    // Include the token in the headers
    const headers = {
      'Authorization': `Bearer ${token}`
    };
    console.log('Headers:', headers);
    console.log('token jwt:', token);
        return await post(endpoint, data, {}, headers)
            .then((res) => {
                if (res.data.code !== 200) console.log(res.response);
                return res.data;
            })
            .catch((err) => {
                return err;
            });
    },
    submitV2: async (data) => {
        const endpoint = `/scoring/submit-v2`;
        // eslint-disable-next-line no-return-await

        return await post(endpoint, data, {}, authHeader())
            .then((res) => {
                // if (res.data.code !== 200) console.log(res.response);
                return res;
            })
            .catch((err) => {
                return err;
            });
    },
};

export default submitApi;
