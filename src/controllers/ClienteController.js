const database = require('../database/connection')

class ClienteController{

    cadastrarCliente(request, response){
        const {nome, cpf, dt_nascimento, dt_cadastro, renda_familiar} = request.body

        database.insert({nome, cpf, dt_nascimento, dt_cadastro, renda_familiar}).table("clientes").then(data=>{
            response.json({message:"Cliente adicionado com sucesso!!!!", code:'ok'})

        }).catch(error=>{
            if(error.code == 'ER_DUP_ENTRY'){
                response.json({message: "CPF já cadastrado.", code:"erro"})
            }
            else{
                response.json({message: "Erro na API.", code:"erro"})
            }
        })
    }

    listarClientes(request, response){
        database.select("id", "nome", "renda_familiar").table("clientes").then(clientes=>{
            response.json(clientes)
        }).catch(error=>{
            response.json({message: "Erro na API.", code:"erro"})
        })
    }

    obterClientePorId(request, response){
        const {id} = request.params

        database.select("*").table("clientes").where({id:id}).then(cliente=>{
            response.json(cliente)
        }).catch(error=>{
            response.json({message: "Erro na API.", code:"erro"})
        })
    }

    editarCliente(request, response){
        const {id, nome, cpf, dt_nascimento, dt_cadastro, renda_familiar} = request.body

        database.where({id:id}).update({id:id, nome: nome, cpf: cpf, dt_nascimento: dt_nascimento, dt_cadastro: dt_cadastro, renda_familiar:renda_familiar})
            .table("clientes").then(cliente=>{
            response.json({message: "Cliente editado com sucesso!", code:'ok'})

        }).catch(error=>{
            if(error.code == 'ER_DUP_ENTRY'){
                response.json({message: "CPF já cadastrado.", code:"erro"})
            }
            else{
                response.json({message: "Erro na API.", code:"erro"})
            }
        })
    }

    excluirCliente(request, response){
        const {id} = request.params

        database.where({id:id}).del().table("clientes").then(cliente=>{
            response.json({message: "Cliente excluído com sucesso!"})
        }).catch(error=>{
            response.json({message: "Erro na API.", code:"erro"})
        })
    }
}

module.exports = new ClienteController()