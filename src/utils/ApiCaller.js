/* eslint-disable prettier/prettier */
import Axios from 'axios';
import objectAssign from 'object-assign';

import { API_URL, API_ADMIN_URL } from '../config/index';

export const request = (endpoint, method, headers = {}, params = {}, body = {}) => {
    return Axios({
        url: API_URL + endpoint,
        method,
        headers: objectAssign({}, headers),
        params: objectAssign(params),
        data: body,
    });
};
export const requestAd = (endpoint, method, headers = {}, params = {}, body = {}) => {
    return Axios({
        url: API_ADMIN_URL + endpoint,
        method,
        headers: objectAssign({}, headers),
        params: objectAssign(params),
        data: body,
    });
};

export const get = (endpoint, params = {}, headers = {}) => {
    return request(endpoint, 'GET', headers, params);
};
export const getAd = (endpoint, params = {}, headers = {}) => {
    return requestAd(endpoint, 'GET', headers, params);
};

export const post = (endpoint, body = {}, params = {}, headers = {}) => {
    return request(endpoint, 'POST', headers, params, body);
};
export const postAd = (endpoint, body = {}, params = {}, headers = {}) => {
    return requestAd(endpoint, 'POST', headers, params, body);
};

export const put = (endpoint, body = {}, params = {}, headers = {}) => {
    return request(endpoint, 'PUT', headers, params, body);
};
export const putAd = (endpoint, body = {}, params = {}, headers = {}) => {
    return requestAd(endpoint, 'PUT', headers, params, body);
};

export const remove = (endpoint, body = {}, params = {}, headers = {}) => {
    return request(endpoint, 'DELETE', headers, params, body);
};

export const removeAd = (endpoint, body = {}, params = {}, headers = {}) => {
    return requestAd(endpoint, 'DELETE', headers, params, body);
};
