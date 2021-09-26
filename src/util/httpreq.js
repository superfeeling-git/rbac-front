import axios from './config';

var query = (url,params) => {
    return axios.get(url, { params: params });
};

export default query;