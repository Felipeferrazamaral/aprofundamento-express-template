import express, { Request, Response } from 'express'
import cors from 'cors'
import { accounts } from './database'
import { ACCOUNT_TYPE } from './types'

const app = express()

app.use(express.json())
app.use(cors())

app.listen(3003, () => {
    console.log("Servidor rodando na porta 3003")
})

app.get("/ping", (req: Request, res: Response) => {
    res.send("Pong!")
})

app.get("/accounts", (req: Request, res: Response) => {
    res.send(accounts)
})

// GET USANDO PATH PARAMS
app.get('/accounts/:id', (req: Request, res: Response) => {
	const idToFind = req.params.id // não precisamos forçar a tipagem aqui, porque todo path params é string

	const result = accounts.find((account) => account.id === idToFind)

  res.status(200).send(result)
})

app.delete('/accounts/:id', (req: Request, res: Response) => {
    // identificação do que será deletado via path params
const idToDelete = req.params.id

    // encontrar o index do item que será removido
const accountIndex = accounts.findIndex((account) => account.id === idToDelete)

    // caso o item exista, o index será maior ou igual a 0
if (accountIndex >= 0) {
            // remoção do item através de sua posição
    accounts.splice(accountIndex, 1)
}

res.status(200).send("Item deletado com sucesso")
})


app.put('/accounts/:id', (req: Request, res: Response) => {
    // id do ACCOUNT que será atualizado chega via path params
const id = req.params.id

 
    
    const newOwnerName = req.body.ownerName as string | undefined     // cliente pode ou não enviar ownerName
    const newBalance = req.body.balance as number | undefined       // cliente pode ou não enviar balance
    const newType = req.body.type as ACCOUNT_TYPE | undefined   // cliente pode ou não enviar type

const account = accounts.find((account) => account.id === id)

    
    
    account.ownerName = newOwnerName || account.ownerName
    account.type = newType || account.type

    account.balance = isNaN(newBalance) ? account.balance : newBalance



res.status(200).send("Atualização realizada com sucesso")
})