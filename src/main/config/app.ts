import setupMiddlewares from './middlewaeres'
import setupStaticFiles from './static-files'
import setupRoutes from './routes'
import setupSwagger from './config-swagger'
import express from 'express'

const app = express()
setupStaticFiles(app)
setupSwagger(app)
setupMiddlewares(app)
setupRoutes(app)
export default app
