import express, { Router, Express } from 'express' 
import colors from 'colors'
import router  from './router'
import db from './config/db'
import swaggerUi from "swagger-ui-express"
import swaggerSpec, { swaggerUiOptions } from './config/swagger'
import cors, { CorsOptions } from 'cors'
import morgan from 'morgan'


// Conectar a base de datos
export async function connectDB() {
    try {
        await db.authenticate()
        db.sync()
        // console.log( colors.blue( 'Conexión exitosa a la BD'))
    } catch (error) {
        // console.log(error)
        console.log( colors.red.bold( 'Hubo un error al conectar a la BD') )
    }
}

// Instancia de express
const server: Express = express()

// permitir conexiones de cors
const corsOptions: CorsOptions = {
    origin: function(origin, callback) {
        if (origin === process.env.FRONTEND_URL) {
            callback(null, true)
        } else {
            callback(new Error('Error de cors'))
        }
    }
}

server.use(cors(corsOptions));

// Leer datos de formularios
server.use(express.json())

server.use(morgan('dev'))

server.use('/api/products', router)

// docs
server.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec, swaggerUiOptions))

export default server