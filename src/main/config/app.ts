import express from 'express'
import setupMiddlewares from './middlewaeres'

const app = express()
setupMiddlewares(app)
export default app
