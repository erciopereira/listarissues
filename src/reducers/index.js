import { combineReducers } from 'redux';
import { ListaIssuesReducer } from './ListaIssuesReducer';
import { AtualizarDadosReducer } from './AtualizarDadosReducer';

export default combineReducers({
    ListaIssuesReducer,
    AtualizarDadosReducer
})