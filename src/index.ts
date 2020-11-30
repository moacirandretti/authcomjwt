import express from 'express'
import routes from './routes'
import 'reflect-metadata'
import './database/connect'

const app = express()

app.use(express.json())
app.use(routes)

app.listen(3333, () => console.log('🍵 Servidor rodando! Porta 3333 🍵'))
