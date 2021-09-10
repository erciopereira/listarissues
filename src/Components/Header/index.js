import { useSelector, useDispatch } from 'react-redux';
import { Filtros } from '../Filtros';
import { Cabecalho } from './styles';

export function Header() {
    const dispatch = useDispatch();

    const ultimaAtualizacaoReducer = useSelector(
        state => state.AtualizarDadosReducer.ultimaAtualizacao
    );

    const atualizarDados = () => {
        dispatch({
            type: 'SET_ATUALIZAR_DADOS',
            payload: true,
        });
    }

    return (
        <Cabecalho>
            <Filtros />
            <button onClick={() => atualizarDados()}>Atualizar dados</button>
            <div>
                <span>Última atualização: </span>
                <span>{ultimaAtualizacaoReducer}</span>
            </div>
        </Cabecalho>
    )
}