import { Router } from 'express'
import { body, param } from 'express-validator'
import { createProduct, deleteProduct, getProductById, getProducts, updateAvailability, updateProduct } from './handlers/product'
import { handleInputErrors } from './middleware'

const router: Router = Router()

/**
 * @swagger
 * components:
 *  schemas:
 *      Product:
 *          type: object
 *          properties:
 *              id:
 *                  type: integer
 *                  description: The product id
 *                  example: 1
 *              name:
 *                  type: string
 *                  description: The product name
 *                  example: Monitor curvo de 49 pulgadas
 *              price:
 *                  type: number
 *                  description: The product price
 *                  example: 300
 *              availability:
 *                  type: boolean
 *                  description: The product availability
 *                  example: true
 */

/**
 * @swagger
 * /api/products:
 *  get:
 *      summary: obtiene una lista de productos
 *      tags:
 *          - Products
 *      description: devuelve una lista de productos
 *      responses: 
 *          200:
 *              description: respuesta correcta
 *              content:
 *                  application/json: 
 *                      schema:
 *                          type: object
 *                          properties:
 *                              data:
 *                                  type: array
 *                                  items:
 *                                      $ref: '#/components/schemas/Product'
 */
router.get('/', getProducts)

/**
 * @swagger
 * /api/products/{id}:
 *  get:
 *      summary: devuelve un producto por su id
 *      tags: 
 *          - Products
 *      description: devuelve un producto basado en su id
 *      parameters:
 *        - in: path
 *          name: id
 *          description: el id del producto a obtener
 *          required: true
 *          schema:
 *              type: integer
 *      responses:
 *          200:
 *              description: respuesta correcta
 *              content:
 *                  application/json: 
 *                      schema:
 *                          type: object
 *                          properties:
 *                              data:
 *                                  type: array
 *                                  items:
 *                                      $ref: '#/components/schemas/Product'
 *          404:
 *              description: no encontrado
 *          400: 
 *              description: id no valido
 */
router.get('/:id', 
    param('id').isInt().withMessage('ID no válido'),
    handleInputErrors,
    getProductById
)

/**
 * @swagger
 * /api/products:
 *  post:
 *      summary: crea un nuevo producto
 *      tags: [Products]
 *      description: devuelve el nuevo registro creado
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          name:
 *                              type: string
 *                              example: Monitor curvo 49 pulgadas
 *                          price:
 *                              type: number
 *                              example: 399
 *      responses:
 *          201:
 *              description: producto creado correctamente     
 *          404:
 *              description: producto no encontrado
 *          400:
 *              description: request invalido
 */
router.post('/', 
    // Validación
    body('name')
        .notEmpty().withMessage('El nombre de Producto no puede ir vacio'),
    body('price')
        .isNumeric().withMessage('Valor no válido')
        .notEmpty().withMessage('El precio de Producto no puede ir vacio')
        .custom(value => value > 0).withMessage('Precio no válido'),
    handleInputErrors,
    createProduct
)

/**
 * @swagger
 * /api/products/{id}:
 *  put:
 *      summary: actualiza un producto con la informacion entrante
 *      tags: [Products]
 *      description: busca un producto por su id y lo actualiza
 *      parameters:
 *        - in: path
 *          name: id
 *          description: el id del producto a actualizar
 *          required: true
 *          schema:
 *              type: integer
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          name:
 *                              type: string
 *                              example: Monitor curvo 49 pulgadas
 *                          price:
 *                              type: number
 *                              example: 399
 *                          availability:
 *                              type: boolean
 *                              example: true
 *      responses:
 *          200:
 *              description: respuesta correcta
 *              content:
 *                  application/json: 
 *                      schema:
 *                          type: object
 *                          properties:
 *                              data:
 *                                  type: array
 *                                  items:
 *                                      $ref: '#/components/schemas/Product'
 *          404:
 *              description: no encontrado
 *          400: 
 *              description: id no valido
 */
router.put('/:id', 
    param('id').isInt().withMessage('ID no válido'),
    body('name')
        .notEmpty().withMessage('El nombre de Producto no puede ir vacio'),
    body('price')
        .isNumeric().withMessage('Valor no válido')
        .notEmpty().withMessage('El precio de Producto no puede ir vacio')
        .custom(value => value > 0).withMessage('Precio no válido'),
    body('availability')
        .isBoolean().withMessage('Valor para disponibilidad no válido'),
    handleInputErrors,
    updateProduct
)

/**
 * @swagger
 * /api/products/{id}:
 *  patch:
 *      summary: actualiza un producto con la informacion entrante
 *      tags: [Products]
 *      description: busca el producto por su id y lo actualiza
 *      parameters:
 *        - in: path
 *          name: id
 *          description: el id del producto a actualizar
 *          required: true
 *          schema:
 *              type: integer
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          name:
 *                              type: string
 *                              example: Monitor curvo 49 pulgadas
 *                          price:
 *                              type: number
 *                              example: 399
 *                          availability:
 *                              type: boolean
 *                              example: true
 *      responses:
 *          200:
 *              description: respuesta correcta
 *              content:
 *                  application/json: 
 *                      schema:
 *                          type: object
 *                          properties:
 *                              data:
 *                                  type: array
 *                                  items:
 *                                      $ref: '#/components/schemas/Product'
 *          404:
 *              description: no encontrado
 *          400: 
 *              description: id no valido
 */
router.patch('/:id', 
    param('id').isInt().withMessage('ID no válido'),
    handleInputErrors,
    updateAvailability
)

/**
 * @swagger
 * /api/products/{id}:
 *  delete:
 *      summary: elimina un producto por su id
 *      tags: [Products]
 *      description: busca un producto por su id y lo elimina
 *      parameters:
 *        - in: path
 *          name: id
 *          description: el id del producto a eliminar
 *          required: true
 *          schema:
 *              type: integer
 *      responses:
 *          200:
 *              description: respuesta correcta
 *              content:
 *                  application/json: 
 *                      schema:
 *                          type: object
 *                          properties:
 *                              data:
 *                                  type: string
 *                                  example: producto eliminado
 *          404:
 *              description: no encontrado
 *          400: 
 *              description: id no valido
 */
router.delete('/:id', 
    param('id').isInt().withMessage('ID no válido'),
    handleInputErrors,
    deleteProduct
)

export default router