import { post, get } from '../ApiCaller';
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
        return await post(endpoint, data, {}, headers)
            .then((res) => {
                if (res.data.code !== 200) console.log(res.response);
                return res.data;
            })
            .catch((err) => {
                return err;
            });
    },
    run: async (data) => {
        const endpoint = `/scoring/run`;
        // eslint-disable-next-line no-return-await

        return await post(endpoint, data, {}, authHeader())
            .then((res) => {
                return res;
            })
            .catch((err) => {
                return err;
            });
    },
    diff_css: async (data) => {
        const endpoint = `/scoring/render-diff-image`;
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
