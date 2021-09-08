import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CircularProgress } from '@material-ui/core';
import useApi from '../../consultaAPI/API';
import { Container } from './styles';
import { Tabela } from '../../Components/Tabela';
import { Filtros } from '../../Components/Filtros';

export function Home() {
    const api = useApi();
    const dispatch = useDispatch();

    const mensagemErroRequisicao = useSelector(
        state => state.ListaIssuesReducer.erroBuscaIssues
    );

    const dadosLocalStorage = JSON.parse(
        localStorage.getItem('dadosIssues')
    );
    const pegarUltimaAtualizacao = JSON.parse(
        localStorage.getItem('dataUltimaAtualizacao')
    )
    
    const [ultimaAtualizacao, setUltimaAtualizacao] = useState('');
    const [carregando, setCarregando] = useState(true);
    const [atualizarDados, setAtualizarDados] = useState(false);

    useEffect(() => {
        const buscarDadosApi = async () => {
            setCarregando(true);
            const montarDadosIssues = [];
            let numeroPagina = 1;
            while (numeroPagina > 0) {
                const listarIssues = async (numeroPagina) => {
                    const getIssues = await api.getListaIssues(numeroPagina);
                    if (getIssues.erro !== '') {
                        if (getIssues.erro.status === 403) {
                            dispatch({
                                type: 'SET_MENSAGEM_ERRO',
                                payload: 'O limite de requisições foi excedido',
                            });
                        }
                        return ([])
                    } else {
                        return (getIssues.res)
                    }
                }

                const resultadoDadosApi = await listarIssues(numeroPagina);

                resultadoDadosApi.forEach((item) => {
                    montarDadosIssues.push({
                        numero: item.number,
                        status: item.state,
                        descricao: item.title,
                        label: item.labels.length > 0 ? item.labels[0].name : '',
                        dataCriacao: item.created_at,
                        dataAlteracao: item.updated_at
                    });
                });
                if (resultadoDadosApi.length > 0) {
                    numeroPagina = numeroPagina + 1
                } else {
                    numeroPagina = 0
                }
            }
            setCarregando(false);
            dispatch({
                type: 'SET_LISTA_ISSUES',
                payload: montarDadosIssues,
            });
            localStorage.setItem('dataUltimaAtualizacao', JSON.stringify(new Date()));
            localStorage.setItem('dadosIssues', JSON.stringify(montarDadosIssues));
            const now = new Date();
            setUltimaAtualizacao(`${now.toLocaleDateString('pt-br')} ${now.toLocaleTimeString('pt-br')}`)
        }

        if (dadosLocalStorage === null || atualizarDados) {
            buscarDadosApi()
        } else {
            dispatch({
                type: 'SET_LISTA_ISSUES',
                payload: dadosLocalStorage,
            });
            setCarregando(false);
            const now = new Date(pegarUltimaAtualizacao);
            setUltimaAtualizacao(`${now.toLocaleDateString('pt-br')} ${now.toLocaleTimeString('pt-br')}`)
        }
    }, [atualizarDados])

    return (
        <Container>
            {carregando ? (
                <div className="area-carregando">
                    <div>Carregando dados</div>
                    <CircularProgress />
                </div>
            ) : (
                <>
                    <div className="area-cabecalho">
                        <Filtros />
                        <button onClick={() => setAtualizarDados(true)}>Atualizar dados</button>
                        <div>
                            <span>Última atualização: </span>
                            <span>{ultimaAtualizacao}</span>
                        </div>
                    </div>
                    {mensagemErroRequisicao !== '' ? (
                        <div>
                            {mensagemErroRequisicao}
                        </div>
                    ) : (
                        <Tabela />
                    )}
                </>
            )}
        </Container>
    )
}