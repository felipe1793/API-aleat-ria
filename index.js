const express = require('express')
const app = express()
const port = 3000
let id = 0
let usuarios = []

app.use(express.json())

app.get('/', (req, res) => {
    res.send(usuarios)
})

app.get('/:id', (req, res) => {
    usuarios[req.params.id] ? res.send(usuarios[req.params.id]) : res.send("usuário não encontrado")
})

app.listen(port, () => {
    console.log(`O servidor está funcionando na porta: ${port}`)
})

// POST
app.post('/', (req, res) => {
    let {nome} = req.body
    
    if(!nome) {
        res.send("O nome não foi informado")
    } else {
        usuarios.push({id: id++, nome: nome})
        res.json({
            mensagem: "cadastrado com sucesso !"
        })
    }
})


// PUT
app.put('/user/:id', (req, res) => {
    let {nome} = req.body

    if(!usuarios.find(usuario => usuario.id == req.params.id)) {
        return res.send("usuário não foi encontrado")
    } else {

        usuarios[req.params.id].nome = nome

        res.json({
            mensagem: 'usuário alterado com sucesso',
            usuario: usuarios[req.params.id]
        })
    }
})

// DELETE

app.delete('/user/:id', (req, res) => {
    let index = usuarios.findIndex(usuario => usuario.id == req.params.id)

    if(index != -1) {
        res.json({
        mensagem:'usuário deletado com sucesso !',
        usuario: usuarios[index]
    })
        usuarios.splice(index, 1)
    } else {
        res.send("usuário não foi encontrado")
    }
})