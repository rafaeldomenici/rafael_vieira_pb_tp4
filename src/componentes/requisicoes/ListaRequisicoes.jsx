import DataTable from 'react-data-table-component';
import '../../App.css'

export default function ListaRequisicoes({ requisicoes = [], setIdEmEdicao }) {
  
    const colunas = [
        {
            name: 'Nome do produto',
            selector: row => row.produtoRequisicao,
            sortable: true,
        },
        {
            name: 'Justificativa',
            selector: row => row.justificativa,
        },
        {
            name: 'Data',
            selector: row => row.dataRequisicao,
        },
        {
          name: 'Status',
          selector: row => row.status,
        }
        
    ];

    const opcoes = { rowsPerPageText: 'Linhas por página:', rangeSeparatorText: 'de' };

    function handleChange({ selectedRows }) {
        const id = selectedRows[0]?.id;
        console.log(id);
        if(id) {
            setIdEmEdicao(id);
        } else {
            setIdEmEdicao("");
        }
    }

  
    return (
        <DataTable
            
            columns={colunas}
            data={requisicoes}
            pagination
            paginationPerPage={5}
            dense
            responsive
            striped
            paginationComponentOptions={opcoes}
            noDataComponent="Cadastro Vazio"
            defaultSortFieldId={1}
            selectableRows
            selectableRowsHighlight
            selectableRowsSingle
            onSelectedRowsChange={handleChange}
        />
    );
}