import express from 'express'
import path from 'path'
import { config } from './config'
import { errorMiddleware } from './middleware/error-middleware'
import { router } from './router/api'
import { publicRouter } from './router/public-api'
import { logging } from './utils/logging'


export const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'public')))


app.use(publicRouter)
app.use(router)
app.use(errorMiddleware)



// connection.end()



app.listen(config.PORT, () => logging.info(`Server running on port ${config.PORT}`)) 