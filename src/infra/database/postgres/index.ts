import { createConnection } from "typeorm";

createConnection();

/* 
    export class Connector {
        async create () {
            await createConnection();
        }
    }
*/

export const connect = async () => {
    await createConnection();
}