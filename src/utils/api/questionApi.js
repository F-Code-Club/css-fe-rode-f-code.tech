import {postAd, getAd, removeAd, putAd } from '../ApiCaller';
import authHeader from './HeaderAuthorization';
import localFileApi from './localFileApi';

const questionApi = {

    //STACK 
    createNewStack: async(data)=>{
        const endpoint = `/api/v2/question-stacks`; 
        return await postAd(endpoint, data, {}, authHeader())
            .then((res) => {
                return res.data;
            })
            .catch((err) => {
                return err;
            });
    },

    updateStack: async(data, id)=>{
        const endpoint = `/api/v2/question-stacks/${id}`; 
        const token = authHeader();
        const data2= JSON.stringify(data);
        const headers =  {
                'Content-Type': 'application/json',
                ...token
        };
        return await putAd(endpoint, data2, {}, headers)
            .then((res) => {
                return res;
            })
            .catch((err) => {
                return err;
            });
    },

    getStackByStatus: async (status) => {
        const endpoint = `/api/v2/question-stacks`; 
        return await getAd(endpoint,status, authHeader())
            .then((res) => {
                return res.data.data;
            })
            .catch((err)=> {
                return err;
            })
    },

    getStackById: async (id) => {
        const endpoint = `/api/v2/question-stacks/${id}`; 
        return await getAd(endpoint,{}, authHeader())
            .then((res) => {
                return res.data;
            })
            .catch((err)=> {
                return err;
            })
    },

    getStackByName: async (name) => {
    const data = [];
    const statusList = ['DRAFT', 'ACTIVE', 'DE-ACTIVE', 'USED'];
    const endpoint = `/api/v2/question-stacks`; 
    const uniqueQuestions = new Set();

    try {
        const promises = statusList.map(async (status) => {
            const res = await getAd(endpoint, status, authHeader());
            const questionList = res.data.data;
            if (questionList != null) {
                questionList.forEach((q) => {
                    if (q.name === name && !uniqueQuestions.has(q.id)) {  // Assuming each question has a unique 'id'
                        console.log(q);
                        data.push(q);
                        uniqueQuestions.add(q.id);
                    }
                });
            }
        });

        await Promise.all(promises);
        return data;
    } catch (err) {
        return err;
    }
},

    deleteStack: async(id) => {
        const endpoint = `/api/v2/question-stacks/${id}`;
        return await removeAd(endpoint,{},{}, authHeader())
            .then((res)=> {
                return(res);
            }).catch((err) => {
                return err;
            })
    },

    //QUESTION
    createNewQuestion: async(data, stackId)=>{
        const endpoint = `/api/v2/question-stacks/question/${stackId}`; 
        return await postAd(endpoint, data, {}, authHeader())
            .then((res) => {
                return res.data;
            })
            .catch((err) => {
                return err;
            });
    },

    updateQuestion: async(data, id)=>{
        const endpoint = `/api/v2/question-stacks/questions/${id}`; 
        const token = authHeader();
        const data2= JSON.stringify(data);
        const headers =  {
                'Content-Type': 'application/json',
                ...token
        };
        return await putAd(endpoint, data2, {}, headers)
            .then((res) => {
                return res;
            })
            .catch((err) => {
                return err;
            });
    },

    getQuestionById: async(id) => { 
        const endpoint = `/api/v2/question-stacks/questions/${id}`; 
        return await getAd(endpoint,{}, authHeader())
            .then((res)=> {
                return(res);
            }).catch((err) => {
                return err;
            })
    },

    deleteQuestion: async(id) => {
        const endpoint = `/api/v2/question-stacks/question/${id}`;
        return await removeAd(endpoint,{},{}, authHeader())
            .then((res)=> {
                return(res);
            }).catch((err) => {
                return err;
            })
    },

    //TESTCASE 
    createNewTestcase: async(data, questionId)=>{
        const endpoint = `/api/v2/question-stacks/test-cases/${questionId}`; 
        return await postAd(endpoint, data, {}, authHeader())
            .then((res) => {
                return res.data;
            })
            .catch((err) => {
                return err;
            });
    },

    updateTestcase: async(data, id)=>{
        const endpoint = `/api/v2/question-stacks/test-cases/${id}`; 
        const token = authHeader();
        const data2= JSON.stringify(data);
        const headers =  {
                'Content-Type': 'application/json',
                ...token
        };
        return await putAd(endpoint, data2, {}, headers)
            .then((res) => {
                return res;
            })
            .catch((err) => {
                return err;
            });
    },

    getTestcaseById: async(id) => { 
        const endpoint = `/api/v2/question-stacks/test-cases/${id}`; 
        return await getAd(endpoint,{}, authHeader())
            .then((res)=> {
                return(res);
            }).catch((err) => {
                return err;
            })
    },

    deleteTestcase: async(id) => {
        const endpoint = `/api/v2/question-stacks/question/${id}`;
        return await removeAd(endpoint,{},{}, authHeader())
            .then((res)=> {
                return(res);
            }).catch((err) => {
                return err;
            })
    },
};

export default questionApi;
