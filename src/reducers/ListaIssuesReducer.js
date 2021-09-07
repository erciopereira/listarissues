const initialState = {
    listaIssues: [],
};

export function ListaIssuesReducer(state = initialState, action) {
    switch (action.type) {
        case 'SET_LISTA_ISSUES':
            return { ...state, listaIssues: action.payload };
        default:
            return state;
    }
};