import Api from '../../consultaAPI/API';

export async function buscarDados() {
    const api = Api();
    const montarDadosIssues = [];
    let numeroPagina = 1;
    while (numeroPagina > 0) {
        const listarIssues = async (numeroPagina) => {
            const getIssues = await api.getListaIssues(numeroPagina);
            return (getIssues.res)
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
    return montarDadosIssues;
}