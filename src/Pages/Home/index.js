import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CircularProgress } from '@material-ui/core';
import { Container } from './styles';
import { Tabela } from '../../Components/Tabela';
import { Header } from '../../Components/Header';
import { buscarDados } from '../../Components/BuscarDados/buscarDados';

export function Home() {
    const dispatch = useDispatch();

    const atualizarDadosReducer = useSelector(
        state => state.AtualizarDadosReducer.atualizarDados
    );

    const mensagemErroReducer = useSelector(
        state => state.MensagemErroReducer.mensagemErro
    );

    const dadosLocalStorage = JSON.parse(
        localStorage.getItem('dadosIssues')
    );
    const pegarUltimaAtualizacao = JSON.parse(
        localStorage.getItem('dataUltimaAtualizacao')
    )

    const [carregando, setCarregando] = useState(true);

    useEffect(() => {
        const buscarDadosApi = async () => {
            const retornoDados = await buscarDados();
            console.log(retornoDados);
            if (retornoDados[0] === 403) {
                dispatch({
                    type: 'SET_MENSAGEM_ERRO',
                    payload: 'O limite de requisições foi excedido. Você poderá atualizar os dados novamente daqui 1 hora.',
                });
                dispatch({
                    type: 'SET_LISTA_ISSUES',
                    payload: dadosLocalStorage,
                });
                const now = new Date(pegarUltimaAtualizacao);
                dispatch({
                    type: 'SET_ULTIMA_ATUALIZACAO',
                    payload: `${now.toLocaleDateString('pt-br')} ${now.toLocaleTimeString('pt-br')}`,
                });
            } else {
                dispatch({
                    type: 'SET_LISTA_ISSUES',
                    payload: retornoDados,
                });
                localStorage.setItem('dataUltimaAtualizacao', JSON.stringify(new Date()));
                localStorage.setItem('dadosIssues', JSON.stringify(retornoDados));
                const now = new Date();
                dispatch({
                    type: 'SET_ULTIMA_ATUALIZACAO',
                    payload: `${now.toLocaleDateString('pt-br')} ${now.toLocaleTimeString('pt-br')}`,
                });
            }
            setCarregando(false);
        }

        if (dadosLocalStorage === null || atualizarDadosReducer) {
            setCarregando(true);
            buscarDadosApi();
        } else {
            dispatch({
                type: 'SET_LISTA_ISSUES',
                payload: dadosLocalStorage,
            });
            setCarregando(false);
            const now = new Date(pegarUltimaAtualizacao);
            dispatch({
                type: 'SET_ULTIMA_ATUALIZACAO',
                payload: `${now.toLocaleDateString('pt-br')} ${now.toLocaleTimeString('pt-br')}`,
            });
        }
    }, [atualizarDadosReducer])

    return (
        <Container>
            {carregando ? (
                <div className="area-carregando">
                    <div>Carregando dados</div>
                    <CircularProgress />
                </div>
            ) : (
                <>
                    {mensagemErroReducer !== '' &&
                        <div style={{ textAlign: 'center' }}>{mensagemErroReducer}</div>
                    }
                    <Header />
                    <Tabela />
                </>
            )}
        </Container>
    )
}