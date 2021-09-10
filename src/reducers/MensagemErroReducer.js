const initialState = {
    mensagemErro: '',
};

export function MensagemErroReducer(state = initialState, action) {
    switch (action.type) {
        case 'SET_MENSAGEM_ERRO':
            return { ...state, mensagemErro: action.payload };
        default:
            return state;
    }
};