import Localstorage from '../Localstorage';

export default function authHeader() {
    const user = Localstorage.getToken();

    if (user) {
        return {
            Authorization: 'Bearer ' + user,
        };
    } else {
        return {};
    }
}
