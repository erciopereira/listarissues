import axios from 'axios';

const baseURL = 'https://api.github.com/repos/reactjs/reactjs.org/issues';

const API = {
    getListaIssues: async (numeroPagina) => {
        const res = {res: '', erro: ''};
        await axios
        .get(baseURL, {
            params: {
                state: 'all',
                page: numeroPagina,
                per_page: '100'
            }
        })
        .then(response => {
            res.res = response.data
        })
        .catch(error => {
            res.erro = error.response
        })
        return res;
    }
}

export default () => API;