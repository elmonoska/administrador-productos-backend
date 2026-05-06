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
        console.error(error)
    }
}

// Instancia de express
const server: Express = express()

// permitir conexiones de cors
const allowedOrigins = [
  process.env.FRONTEND_URL,
  'http://localhost:5173',
  'https://administrador-productos-backend-v34y.onrender.com'
];

const corsOptions: CorsOptions = {
  origin: function (origin, callback) {

    // permitir requests sin origin (Postman, navegador directo)
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    return callback(new Error('Error de cors'));
  }
};

server.use(cors(corsOptions));

// Leer datos de formularios
server.use(express.json())

server.use(morgan('dev'))

server.use('/api/products', router)

// docs
server.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec, swaggerUiOptions))

export default server