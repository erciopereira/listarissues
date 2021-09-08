import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
    ClickAwayListener
} from '@material-ui/core';

const colunas = [
    { id: 'numero', label: 'Numero', align: 'left', },
    { id: 'status', label: 'Status' },
    { id: 'descricao', label: 'Descrição', minWidth: 170 },
    { id: 'label', label: 'Etiqueta' },
    {
        id: 'dataCriacao',
        label: 'Data de criação',
        align: 'center',
        format: (value) => new Date(value).toLocaleDateString('pt-br')
    },
    {
        id: 'dataAlteracao',
        label: 'Data da última alteração',
        align: 'center',
        format: (value) => new Date(value).toLocaleDateString('pt-br')
    },
];

export function Tabela() {
    const [pagina, setPagina] = useState(0);
    const [linhasPorPagina, setLinhasPorPagina] = useState(10);
    const [dataIssues, setDataIssues] = useState([]);

    const dadosIssuesReducer = useSelector(
        state => state.ListaIssuesReducer.listaIssues
    );

    const filtroIssuesReducer = useSelector(
        state => state.ListaIssuesReducer.filtroIssues
    );

    const semDadosFiltroReducer = useSelector(
        state => state.ListaIssuesReducer.semDadosFiltro
    );

    useEffect(() => {
        if (filtroIssuesReducer.length > 0 ||
            (filtroIssuesReducer.length === 0 && semDadosFiltroReducer)) {
            setDataIssues(filtroIssuesReducer);
        } else {
            setDataIssues(dadosIssuesReducer);
        }
    }, [dadosIssuesReducer, filtroIssuesReducer])

    const alterarPagina = (event, novaPagina) => {
        setPagina(novaPagina)
    }

    const alterarLinhasPorPagina = event => {
        setLinhasPorPagina(event.target.value)
        setPagina(0);
    }

    return (
        <>
            <TableContainer style={{ minHeight: '600px' }}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {colunas.map((col) => (
                                <TableCell
                                    key={col.id}
                                    align={col.align}
                                    style={{ minWidth: col.minWidth }}
                                >
                                    {col.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {dataIssues.slice(pagina * linhasPorPagina, pagina * linhasPorPagina + linhasPorPagina).map((linha) => {
                            return (
                                <TableRow hover role="checkbox" tabIndex={-1} key={linha.number}>
                                    {colunas.map((col) => {
                                        const value = linha[col.id];
                                        return (
                                            <TableCell key={col.id} align={col.align}>
                                                {col.format ? col.format(value) : value}
                                            </TableCell>
                                        );
                                    })}
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={dataIssues.length}
                rowsPerPage={linhasPorPagina}
                page={pagina}
                onPageChange={alterarPagina}
                onRowsPerPageChange={alterarLinhasPorPagina}
            />
        </>
    )
}