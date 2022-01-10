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
                        type: 'uuid',
                        isPrimary: true
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
                        name: "city_id",
                        type: "uuid"
                    }
                ],
                foreignKeys: [
                    {
                        name: "fk_city",
                        columnNames: ["city_id"],
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