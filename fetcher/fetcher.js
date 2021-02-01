import axios from 'axios';

const fetcher = (url, query) => axios.get(url, { params: query }).then((res) => res.data);

export default fetcher;
