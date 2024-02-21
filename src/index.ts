import express, {Router} from 'express'
import userRouter from "./routes/users.routes"
import databaseService from './services/database.services'
import { defaultErrorHandler } from './middlewares/error.middlewares'

const app = express()
const port = 3000
app.use(express.json())
app.use('/users', userRouter)
databaseService.connect()
app.use(defaultErrorHandler)
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})