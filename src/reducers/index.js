import { combineReducers } from 'redux';
import { ListaIssuesReducer } from './ListaIssuesReducer';
import { AtualizarDadosReducer } from './AtualizarDadosReducer';
import { MensagemErroReducer } from './MensagemErroReducer';

export default combineReducers({
    ListaIssuesReducer,
    AtualizarDadosReducer,
    MensagemErroReducer
})