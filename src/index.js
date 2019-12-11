import express  from 'express'
import cors from 'cors'
import { connect } from './models/database'
import schema from './schema'
import * as bodyParser from 'body-parser'


const app = express()

app.use(bodyParser.json({limit: '5mb'}))

app.use(cors())
connect()

schema.applyMiddleware({
    app
})

app.listen(5555, () => {
    console.log('Server on port 3000')
})