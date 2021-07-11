import { Connection, createConnection } from "typeorm";




export const  connection =   createConnection(
            {
            type: "postgres",
            host: "localhost", 
            port: 5432,
            username: "postgres",
            password: "password",
            database: "gallery_app_test",
            entities: ["src/database/entities/**/*.ts"],
            synchronize: true, 
             name:'default'
          }); 
          

