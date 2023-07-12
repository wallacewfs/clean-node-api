import express from 'express'
import setupMiddlewares from './middlewaeres'
import setupRoutes from './routes'

const app = express()
setupMiddlewares(app)
setupRoutes(app)
export default app
