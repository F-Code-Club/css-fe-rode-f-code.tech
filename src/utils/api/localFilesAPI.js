import { postAd } from '../ApiCaller';
import authHeader from './HeaderAuthorization';

const localFilesAPI = {
    uploadQuestionFile: async (file, colorCode, questionId) => {
        console.log('File:', file); 
        const endpoint = `/api/v2/templates/upload/${questionId}`;
        
        const formData = new FormData();
        formData.append('file', file);
        formData.append('colorCode', colorCode);
        console.log(formData);;

        return await postAd(endpoint, formData, {}, authHeader())
            .then((res) => {
                console.log(res.data);
                return res.data;
            })
            .catch((err) => {
                return err;
            });
    },
};

export default localFilesAPI;