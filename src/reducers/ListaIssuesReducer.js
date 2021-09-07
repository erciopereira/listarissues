const initialState = {
    listaIssues: [],
    filtroIssues: [],
    erroBuscaIssues: '',
};

export function ListaIssuesReducer(state = initialState, action) {
    switch (action.type) {
        case 'SET_LISTA_ISSUES':
            return { ...state, listaIssues: action.payload };
        case 'SET_FILTRO_ISSUES':
            return { ...state, filtroIssues: action.payload };
        case 'SET_MENSAGEM_ERRO':
            return { ...state, erroBuscaIssues: action.payload };
        default:
            return state;
    }
};