import { createConnection, getConnectionOptions } from 'typeorm';

export const connect = async () => {
  const connectionOptions = await getConnectionOptions(
    process.env.CONNECTION_NAME,
  );
  await createConnection({ ...connectionOptions, name: 'default' });
};
