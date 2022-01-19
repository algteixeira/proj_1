import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreatePerson1641583311790 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'person',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
          },
          {
            name: 'name',
            type: 'varchar',
          },
          {
            name: 'sex',
            type: 'varchar',
            enum: ['MASCULINO', 'FEMININO', 'OUTROS']
          },
          {
            name: 'city_id',
            type: 'uuid',
          },
          {
            name: 'birthday',
            type: 'varchar',
          },
          {
            name: 'age',
            type: 'numeric',
          },
        ],
        foreignKeys: [
          {
            name: 'fk_city',
            columnNames: ['city_id'],
            referencedTableName: 'city',
            referencedColumnNames: ['id'],
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('videos');
  }
}
// this is the relevant
