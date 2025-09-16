import express from 'express'
import { PrismaClient } from '#prisma'

const prisma = new PrismaClient()

const app = express()
app.use(express.json())



app.post('/usuarios', async (req, res) => { 

    await prisma.user.create({ 
        data: {
            email: req.body.email,
            name: req.body.name,
            age: req.body.age
        }
    })

    res.status(201).json(req.body) /* retorna o usuário criado com status 201 (Created) em formato JSON */

})

app.get('/usuarios',async ( req, res) => { 

    let users = []
    if ( req.query){
        users = await prisma.user.findMany( {
            where: {
                name: req.query.name,
                email: req.query.email,
                age: req.query.age
            }
        })
    } else {
        users = await prisma.user.findMany() /* busca todos os usuários no banco de dados */
    }

    res.status(200).json(users) /*  retorna o array users como resposta em formato JSON */

})

app.put('/usuarios/:id', async (req, res) => { 

    await prisma.user.update({ 
        where: {
            id: req.params.id /* busca o usuário pelo id passado na URL */
        },
        data: {
            email: req.body.email,
            name: req.body.name,
            age: req.body.age
        }
    })

    res.status(201).json(req.body) /* retorna o usuário criado com status 201 (Created) em formato JSON */

})

app.delete('/usuarios/:id', async ( req, res) => { /* rota para deletar um usuário pelo id passado na URL */
    await prisma.user.delete({
        where: {
            id: req.params.id /* busca o usuário pelo id passado na URL */
        }
    })
    res.status(200).json({message: 'Usuário deletado com Sucesso!'}) /* retorna uma mensagem de sucesso com status 200 (OK) em formato JSON */
})


app.listen(3000)




/*
    Criar API de usuários
    - Criar um usuário
    - Listar todos usuários
    - Editar um usuário
    - Deletar um usuário
*/