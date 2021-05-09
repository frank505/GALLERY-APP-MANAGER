import { Connection, createConnection } from "typeorm";


export const connection = async() =>
{
const  connection:Connection =  await createConnection(
            {
            type: "postgres",
            host: "localhost",
            port: 5432,
            username: "postgres",
            password: "password",
            database: "gallery_app",
            entities: ["src/database/entities/**/*.ts"],
            synchronize: true,
            // name:'postgres'
          }
          ); 
          return connection; 
}

