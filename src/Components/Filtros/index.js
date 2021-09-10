import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container } from './styles';
import IconeFiltro from '@material-ui/icons/FilterList';
import IconeOpen from '@material-ui/icons/Adjust';
import IconeClose from '@material-ui/icons/Check';
import IconeRemover from '@material-ui/icons/HighlightOff';
import useApi from '../../consultaAPI/API';

export function Filtros() {
    const api = useApi();
    const dispatch = useDispatch();

    const dadosIssuesReducer = useSelector(
        state => state.ListaIssuesReducer.listaIssues
    );

    const [filtroStatusSelecionado, setFiltroStatusSelecionado] = useState('');
    const [filtroLabelsSelecionado, setFiltroLabelsSelecionado] = useState('');
    const [filtroSalvoStatus, setFiltroSalvoStatus] = useState([]);
    const [filtroSalvoLabels, setFiltroSalvoLabels] = useState([]);
    const [filtroLabels, setFiltroLabels] = useState([]);

    useEffect(() => {
        const listaLabels = []
        const buscarLabels = async () => {
            const getLabels = await api.getListaLabels();
            if (getLabels.erro.status === 403) {
                dispatch({
                    type: 'SET_MENSAGEM_ERRO',
                    payload: 'O limite de requisições foi excedido. Você poderá atualizar os dados novamente daqui 1 hora.',
                });
                const pegarDadosLabelLocal = JSON.parse(localStorage.getItem('dadosLabels'));
                setFiltroLabels(pegarDadosLabelLocal);
            } else {
                getLabels.res.forEach(item => {
                    listaLabels.push({ name: item.name, color: item.color })
                });
                localStorage.setItem('dadosLabels', JSON.stringify(getLabels));
                setFiltroLabels(listaLabels)
            }
        }
        buscarLabels()
    }, [])

    const abrirFecharModalFiltro = () => {
        const modal = document.querySelector('.modal-filtros')
        if (modal.classList.contains('modal-aberto')) {
            modal.classList.remove('modal-aberto');
        } else {
            modal.classList.add('modal-aberto');
        }
    }

    const executarFiltro = (filtrar) => {
        if (filtrar.length === 0) {
            dispatch({
                type: 'SET_SEM_DADOS_FILTRO',
                payload: true,
            });
        } else {
            dispatch({
                type: 'SET_SEM_DADOS_FILTRO',
                payload: false,
            });
        }
        dispatch({
            type: 'SET_FILTRO_ISSUES',
            payload: filtrar,
        });
    }

    const selecionarFiltroStatus = (status, filtro, cor) => {
        setFiltroStatusSelecionado({ texto: filtro, color: cor });
        abrirFecharModalFiltro();
        const filtrarStatus = dadosIssuesReducer.filter((item) => item.status === status);
        setFiltroSalvoStatus(filtrarStatus);

        if (filtroSalvoLabels.length > 0) {
            const filtrar = filtroSalvoLabels.filter((item) => item.status === status);
            executarFiltro(filtrar);
        } else {
            executarFiltro(filtrarStatus);
        }
    }

    const selecionarFiltroLabels = (label, cor) => {
        setFiltroLabelsSelecionado({ texto: label, color: cor });
        abrirFecharModalFiltro();
        const filtrarLabels = dadosIssuesReducer.filter((item) => item.label === label);
        setFiltroSalvoLabels(filtrarLabels)

        if (filtroSalvoStatus.length > 0) {
            const filtrar = filtroSalvoStatus.filter((item) => item.label === label);
            executarFiltro(filtrar);
        } else {
            executarFiltro(filtrarLabels);
        }
    }

    const limparTodosOsFiltros = () => {
        dispatch({
            type: 'SET_SEM_DADOS_FILTRO',
            payload: false,
        });
        dispatch({
            type: 'SET_FILTRO_ISSUES',
            payload: dadosIssuesReducer,
        });
    }

    const limparFiltro = (tipoFiltro) => {
        if (tipoFiltro === 'status') {
            setFiltroStatusSelecionado('');
            if (filtroSalvoLabels.length > 0) {
                executarFiltro(filtroSalvoLabels);
            } else {
                limparTodosOsFiltros();
            }
            setFiltroSalvoStatus([]);
        } else {
            setFiltroLabelsSelecionado('');
            if (filtroSalvoStatus.length > 0) {
                executarFiltro(filtroSalvoStatus);
            } else {
                limparTodosOsFiltros();
            }
            setFiltroSalvoLabels([]);
        }
    }

    return (
        <Container className="area-filtros">
            <IconeFiltro style={{ cursor: 'pointer' }} onClick={() => abrirFecharModalFiltro()} />
            <div className="modal-filtros">
                <div>
                    <div className="titulos-filtros">Status</div>
                    <div className="tipos-filtros" onClick={() => selecionarFiltroStatus('open', 'Issues abertos', '#ff9900')}>
                        <IconeOpen />
                        <span>Issues abertos</span>
                    </div>
                    <div className="tipos-filtros" onClick={() => selecionarFiltroStatus('closed', 'Issues fechados', '#5fb12b')}>
                        <IconeClose />
                        <span>Issues fechados</span>
                    </div>
                </div>
                <hr style={{ margin: '10px' }} />
                <div>
                    <div className="titulos-filtros">Etiquetas</div>
                    {filtroLabels.map((item) => (
                        <div
                            className="tipos-filtros"
                            style={{ color: `#${item.color}` }}
                            onClick={() => selecionarFiltroLabels(item.name, `#${item.color}`)}
                        >
                            {item.name}
                        </div>
                    ))}
                </div>

            </div>
            {filtroStatusSelecionado !== '' &&
                <div className="filtro-selecionado" style={{ backgroundColor: filtroStatusSelecionado.color }}>
                    <span>{filtroStatusSelecionado.texto}</span>
                    <IconeRemover onClick={() => limparFiltro('status')} />
                </div>
            }
            {filtroLabelsSelecionado !== '' &&
                <div className="filtro-selecionado" style={{ backgroundColor: filtroLabelsSelecionado.color }}>
                    <span>{filtroLabelsSelecionado.texto}</span>
                    <IconeRemover onClick={() => limparFiltro('labels')} />
                </div>
            }
        </Container>
    )
}