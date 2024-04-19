import express from 'express'
const app = express()
const port = 3000

import cardapiosRoutes from './routes/cardapios'

app.use(express.json())
app.use("/cardapios", cardapiosRoutes)

app.get('/', (req, res) => {
  res.send('Restaurante Delicias: Cardapio online')
})

app.listen(port, () => {
  console.log(`Servidor rodando na porta: http://localhost:${port}`)
})