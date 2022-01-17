export class NotFound extends Error {
  description: string;
  statusCode: number;
  constructor(model) {
    const message = `${model} haven't been found in the database.`;
    super(message);
    this.description = `${model} haven't been found in the database.`;
    this.statusCode = 404;
  }
}
