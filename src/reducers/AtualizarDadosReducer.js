const initialState = {
    atualizarDados: false,
    ultimaAtualizacao: ''
};

export function AtualizarDadosReducer(state = initialState, action) {
    switch (action.type) {
        case 'SET_ATUALIZAR_DADOS':
            return { ...state, atualizarDados: action.payload };
        case 'SET_ULTIMA_ATUALIZACAO':
            return { ...state, ultimaAtualizacao: action.payload };
        default:
            return state;
    }
};