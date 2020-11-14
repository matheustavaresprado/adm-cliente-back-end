const database = require('../database/connection')

class ClienteController{

    cadastrarCliente(request, response){

        const {nome, cpf, dt_nascimento, dt_cadastro, renda_familiar} = request.body

        console.log(nome, cpf, dt_nascimento, dt_cadastro, renda_familiar)

        database.insert({nome, cpf, dt_nascimento, dt_cadastro, renda_familiar}).table("clientes").then(data=>{
            console.log(data)
            response.json({message:"Cliente adicionado com sucesso!!!!"})
        }).catch(error=>{
            console.log(error)
        })
    }

    listarClientes(request, response){
        database.select("id", "nome", "renda_familiar").table("clientes").then(clientes=>{
            response.json(clientes)
        }).catch(error=>{
            console.log(error)
        })
    }

    obterClientePorId(request, response){
        const id = request.params

        database.select("*").table("clientes").where({id:id}).then(cliente=>{
            response.json(cliente)
        }).catch(error=>{
            console.log(error)
        })
    }

    editarCliente(request, response){
        const id = request.params
        const {nome, cpf, dt_nascimento, dt_cadastro, renda_familiar} = request.body

        database.where({id:id}).update({nome: nome, cpf: cpf, dt_nascimento: dt_nascimento, dt_cadastro: dt_cadastro, renda_familiar:renda_familiar})
            .table("clientes").then(cliente=>{
            response.json({message: "Cliente editado com sucesso!"})
        }).catch(error=>{
            console.log(error)
        })
    }

    excluirCliente(request, response){
        const id = request.params

        database.where({id:id}).del().table("clientes").then(cliente=>{
            response.json({message: "Cliente excluído com sucesso!"})
        }).catch(error=>{
            console.log(error)
        })
    }
}

module.exports = new ClienteController()