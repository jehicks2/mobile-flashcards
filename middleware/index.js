import thunk from 'redux-thunk'
import { createLogger } from 'redux-logger'
import { applyMiddleware } from 'redux'

const loggerMiddleware = createLogger()

export default applyMiddleware(
    thunk, 
    loggerMiddleware
)