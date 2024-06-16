import { post, get } from '../ApiCaller';
import authHeader from './HeaderAuthorization';

const questionApi = {
    getQuestionStack: async (data) => {
        const endpoint = `/api/v2/question-stacks`;

        return await get(endpoint, data, authHeader())
            .then((res) => {
                // if (res.data.code !== 200) console.log(res.response);
                return res;
            })
            .catch((err) => {
                return err;
            });
    }
}

export default questionApi;
