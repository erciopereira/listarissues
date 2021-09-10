import axios from 'axios';

const baseURL = 'https://api.github.com/repos/reactjs/reactjs.org/';

const API = {
    getListaIssues: async (numeroPagina) => {
        const res = {res: '', erro: ''};
        await axios
        .get(`${baseURL}issues`, {
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
    },
    getListaLabels: async () => {
        const res = {res: '', erro: ''};
        await axios
        .get(`${baseURL}labels`)
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