import express, { Router } from 'express'
import userRouter from './routes/users.routes'
import databaseService from './services/database.services'
import { defaultErrorHandler } from './middlewares/error.middlewares'
import mediasRouter from './routes/medias.routes'
import { initFolder } from './utils/file'
import staticRouter from './routes/static.routes'

databaseService.connect()

const app = express()
const port = 4000

initFolder()

app.use(express.json())
app.use('/users', userRouter)
app.use('/medias', mediasRouter)
app.use('/static', staticRouter)

app.use(defaultErrorHandler)
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
