export class InvalidInfo extends Error {
  description: string;
  statusCode: number;
  constructor(model) {
    const message = `${model} is not supported in the database.`;
    super(message);
    this.description = `${model} is not supported in the database.`;
    this.statusCode = 400;
  }
}
