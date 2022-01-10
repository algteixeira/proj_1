import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class Person1641822922802 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "person",
                columns: [
                    {
                        name: "name",
                        type: "varchar"
                    },
                    {
                        name: 'id',
                        type: 'varchar',
                        isPrimary: true,
                        generationStrategy: 'uuid',
                    },
                    {
                        name: "sex",
                        type: "varchar"
                    },
                    {
                        name: "birthday",
                        type: "date"
                    },
                    {
                        name: "age",
                        type: "int"
                    },
                    {
                        name: "city",
                        type: "varchar"
                    }
                ],
                foreignKeys: [
                    {
                        name: "fk_city",
                        columnNames: ["city"],
                        referencedTableName: "city",
                        referencedColumnNames: ["id"]
                    }
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("person");
    }

}
