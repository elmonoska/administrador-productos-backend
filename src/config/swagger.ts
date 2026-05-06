import swaggerJSDoc from "swagger-jsdoc";
import { SwaggerUiOptions } from "swagger-ui-express";

const options: swaggerJSDoc.Options = {
  definition: {
    openapi: '3.0.0',
    tags: [
      {
        name: "Products",
        description: "API operations related to products"
      }
    ],
    info: {
      title: "RES API Node.js / Express / TypeScript",
      version: "1.0.0",
      description: "API Docs for Products"
    }
  },
  apis: ["./src/router.ts"]
}

const swaggerSpec = swaggerJSDoc(options)

const swaggerUiOptions: SwaggerUiOptions = {
    customCss: `
        .topbar-wrapper .link svg {
            display: none;
        }
        .topbar-wrapper .link::after {
            content: '';
            display: block;
            width: 200px;
            height: 40px;
            background-image: url('https://elmonoska.pages.dev/assets/logo-name-black-BTC7WSPZ.svg');
            background-repeat: no-repeat;
            background-size: contain;
        }
    `,
  customSiteTitle: "Documentacion de REST API Express / TypeScript",
  
}

export default swaggerSpec
export {swaggerUiOptions}