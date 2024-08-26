import { useForm } from "react-hook-form"
import { regexEmail, regexNumerico } from "../../Regex";
import { listarProdutos, obterProduto, excluirProduto , inserirProduto, alterarProduto} from "../../infra/produtos";
import { listarFornecedores } from "../../infra/fornecedores";
import { useEffect } from "react";
import { obterRequisicao , inserirRequisicao, alterarRequisicao, excluirRequisicao} from "../../infra/requisicoes";

export default function FormRequisicoes({ idEmEdicao, setIdEmEdicao , controle, setControle, produtos, setProdutos}) {

    const { register, handleSubmit, formState: { errors, isSubmitted }, reset, setValue } = useForm();

    useEffect(() => {
        async function fetchData() {
            
            if (idEmEdicao && !isSubmitted) {
                
                
                const requisicao = await obterRequisicao(idEmEdicao);
                setValue("nomeProduto", requisicao.produtoRequisicao);
                setValue("justificativa", requisicao.justificativa);
                setValue("data", requisicao.data);
                
            } else {
               
                reset();
            }
        }

        fetchData();
    }, [idEmEdicao]);

    async function fetchData2() {
      const novaListaProdutos = await listarProdutos();
      setProdutos(novaListaProdutos);
    }



    useEffect(() => {
      
      fetchData2();
    }, [])


    
      async function submeterDados(dados) {
      if(idEmEdicao) {
        await alterarRequisicao({...dados, id: idEmEdicao})
        setIdEmEdicao("");
        setControle(!controle);
      }
      else {
        dados.status = "Em aberto";
        dados.qtdCotacoes = 0;
        let id = await inserirRequisicao(dados);
        setControle(!controle);
        setIdEmEdicao(id);
        reset();
      }     
        
    }

    async function handleExcluir() {
         await excluirRequisicao(idEmEdicao);
         setControle(!controle);
         setIdEmEdicao("");
        
        
    }

    return (
        <>
            <div className="container">
                <form onSubmit={handleSubmit(submeterDados)}>
                  <div className="containerGrid2">
                    <div>
                      <label>Produto</label>
                      <select {...register("produtoRequisicao")}>
                        <option value={-1}>Selecione um produto</option>
                        {produtos.map(item => <option value={item.nomeProduto}>{item.nomeProduto}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="formLabel" htmlFor="justificativa">Justificativa da Requisição</label>&nbsp;
                      <textarea size={70} {...register("justificativa", {
                        required: "Nome é obrigatório",
                        validate: {
                            minLength: (value) => value.length >= 5 || "Nome tem que ter pelo menos 5 caracteres",
                            maxLength: (value) => value.length <= 50 || "Nome só pode ter até 50 caracteres",
                        },
                    })} />
                    </div>
                    <div>
                      <label className="formLabel" htmlFor="dataRequisicao">Data da requisição</label>&nbsp;
                      <input size={30} {...register("dataRequisicao", {
                        required: "Email é obrigatório",
                        validate: {
                            minLength: (value) => value.length >= 5 || "Email tem que ter pelo menos 5 caracteres",
                            maxLength: (value) => value.length <= 30 || "Email só pode ter até 30 caracteres",
                            
                        },
                    })} />
                    </div>
                    
                    
                    
                    
                  </div>  
                  <div className="botoes2">
                    <input style={{ margin: "5px auto", display: "inline-block" }} type="submit" value="Salvar" />
                    <input style={{ margin: "5px auto", display: "inline-block" }} type="button" value="Excluir" onClick={handleExcluir} />
                  </div> 
                </form>
            </div>
            <div className="errorsContainer">
                {errors.nome?.message && (
                    <div>{errors.nome.message}</div>
                )}
                {errors.email?.message && (
                    <div>{errors.email.message}</div>
                )}
                {errors.fone?.message && (
                    <div>{errors.fone.message}</div>
                )}
            </div>
        </>
    );
}