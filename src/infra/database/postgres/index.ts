import { createConnection } from "typeorm";

createConnection();

export const connect = async () => {
    await createConnection();
}