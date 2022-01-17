export class AlreadyExists extends Error {
  description: string;
  statusCode: number;
  constructor(model) {
    const message = `${model} already exists in the database.`;
    super(message);
    this.description = `${model} already exists in the database.`;
    this.statusCode = 400;
  }
}
