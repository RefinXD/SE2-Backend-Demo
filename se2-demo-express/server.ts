import express from 'express'
import { PrismaClient } from '@prisma/client';
import * as dotenv from 'dotenv'
import bodyParser = require('body-parser');

dotenv.config() // Load the environment variables

const prisma = new PrismaClient()
const app = express()

const port = 3000
app.get('/', (req, res) => {
  res.send('Hello World!')
})


app.get('/users', async (req, res) => {
	  const users = await prisma.user.findMany()
	  res.json(users)
})

app.post('/user', bodyParser.json() , async (req, res) => {
    console.log(req.body)
	  const { email, name, address } = req.body
  	  const user = await prisma.user.create({
  	    data: {
  	      email,
  	      name,
          address
  	    },
  	  })
    res.json(user)
  })



const server = app.listen(port, () =>
  console.log(`
🚀 Server ready at: http://localhost:3000
⭐️ See sample requests: http://pris.ly/e/ts/rest-express#3-using-the-rest-api`),
)