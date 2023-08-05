import setupMiddlewares from './middlewaeres'
import setupRoutes from './routes'
import express from 'express'

const app = express()
setupMiddlewares(app)
setupRoutes(app)
export default app
