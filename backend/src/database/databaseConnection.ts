import { Connection, createConnection } from "typeorm";


export const connection = async() =>
{
const  connection:Connection =  await createConnection(
            {
            type: "postgres",
            host: process.env.DATABASE_HOST, 
            port: Number(process.env.DATABASE_PORT),
            username: process.env.DATABASE_USERNAME,
            password: process.env.DATABASE_PASSWORD,
            database: process.env.DATABASE_NAME,
            entities: ["src/database/entities/**/*.ts"],
            synchronize: true,
            // name:'postgres'
          }
          ); 
          return connection; 
}

