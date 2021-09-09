const initialState = {
    listaIssues: [],
    filtroIssues: [],
    semDadosFiltro: false,
    erroBuscaIssues: '',
};

export function ListaIssuesReducer(state = initialState, action) {
    switch (action.type) {
        case 'SET_LISTA_ISSUES':
            return { ...state, listaIssues: action.payload };
        case 'SET_FILTRO_ISSUES':
            return { ...state, filtroIssues: action.payload };
        case 'SET_SEM_DADOS_FILTRO':
            return { ...state, semDadosFiltro: action.payload };
        default:
            return state;
    }
};