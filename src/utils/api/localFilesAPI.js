import { post, get } from '../ApiCaller';

const localFilesAPI = {
    uploadQuestionFile: async (file) => {
        const endpoint = `/api/v2/templates/upload`;
        return await post(endpoint, { files: file }, {}, { 'Content-Type': 'multipart/form-data' });
    },
};

export default localFilesAPI;
