import { PrismaClient } from "@prisma/client"
import { Router } from "express"

const prisma = new PrismaClient()
const router = Router()

// Lista tudo
router.get("/", async (req, res) => {
  const cardapios = await prisma.cardapio.findMany()
  res.status(200).json(cardapios)
})

// Insere dados
router.post("/", async (req, res) => {
  const { prato, categoria, preco, calorias } = req.body

  if (!prato || !categoria || !preco || !calorias) {
    res.status(400).json({ "erro": "Informe todos os dados" })
    return
  }

  const cardapio = await prisma.cardapio.create({
    data: { prato, categoria, preco, calorias }
  })
  res.status(201).json(cardapio)
})

// Deleta dados
router.delete("/:id", async (req, res) => {
  const { id } = req.params

  const cardapio = await prisma.cardapio.delete({
    where: { id: Number(id) }
  })
  res.status(200).json(cardapio)
})

// Altera dados
router.put("/:id", async (req, res) => {
  const { id } = req.params
  const { prato } = req.body

  const cardapio = await prisma.cardapio.update({
    where: { id: Number(id) },
    data: { prato }
  })
  res.status(200).json(cardapio)
})

router.get("/calorias", async (req, res) => {

  const cardapio = await prisma.cardapio.findMany({
    select: {
      prato: true,
      preco: true,
      calorias: true
    },
    orderBy: {
      calorias: "asc"
    }
  })
  res.status(200).json(cardapio)
})

router.get("/mediaPreco", async (req, res) => {
  
  const cardapio = await prisma.cardapio.aggregate({
    _avg: {
      preco: true
    }
  })
  res.status(200).json(cardapio)
})

router.get("/mediaCal", async (req, res) => {
  
  const cardapio = await prisma.cardapio.aggregate({
    _avg: {
      calorias: true
    }
  })
  res.status(200).json(cardapio)
})

router.get("/:categoria/:preco", async (req, res) => {

  const { categoria } = req.params
  const { preco } = req.params

  const cardapio = await prisma.cardapio.findMany({
    where:  { 
      categoria: String(categoria), 
      preco: { lte: Number(preco) }
    }
  })

  res.status(200).json(cardapio)
})

router.get("/agrupar", async (req, res) => {

  const cardapio = await prisma.cardapio.groupBy({
    by: ['categoria'],
    _count: {
      prato: true
    }
  })
  res.status(200).json(cardapio)
})



export default router
