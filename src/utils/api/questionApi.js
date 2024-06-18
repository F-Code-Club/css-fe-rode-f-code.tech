import {post, get, postAd, getAd, removeAd } from '../ApiCaller';
import authHeader from './HeaderAuthorization';
import localFileApi from './localFileApi';

const questionApi = {

    createNewStack: async(data)=>{
        const endpoint = `/api/v2/question-stacks`; 
        const token = authHeader();
        const data2= JSON.stringify(data);
        const headers =  {
                'Content-Type': 'application/json',
                ...token
        };
        return await postAd(endpoint, data2, {}, headers)
            .then((res) => {
                return res;
            })
            .catch((err) => {
                return err;
            });
    },

    getStackByName: async (name) => {
        const endpoint = `/api/v2/question-stacks`; 
        const params = 'All';
        return await getAd(endpoint,params, authHeader())
            .then((res) => {
                const result = res.data.data.find(item => item.name === name);
                return result ? result : null;
            })
            .catch((err)=> {
                return err;
            })
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

    deleteStack: async(id) => {
        const endpoint = `/api/v2/question-stacks/${id}`;
        //const params = {id: id};
        return await removeAd(endpoint,{},{}, authHeader())
            .then((res)=> {
                return(res);
            }).catch((err) => {
                return err;
            })
    }
};

export default questionApi;
