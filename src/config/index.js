/* eslint-disable prettier/prettier */
const publicRuntimeConfig = {
    NODE_ENV: import.meta.env.NODE_ENV || 'production',
    API_URL: import.meta.env.VITE_REACT_APP_BASE_URL,
    API_AD_URL: import.meta.env.VITE_REACT_APP_V2_URL,
    LOCAL_STORAGE_TOKEN: import.meta.env.VITE_REACT_APP_TOKEN_NAME,
    USER_ROOM_ID: import.meta.env.VITE_REACT_APP_USER_ROOM_ID,
};

export const { NODE_ENV, API_URL, LOCAL_STORAGE_TOKEN, USER_ROOM_ID, API_AD_URL } = publicRuntimeConfig;

export default publicRuntimeConfig.NODE_ENV;
