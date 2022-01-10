import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class City1641822913312 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "city",
                columns: [
                    {
                        name: "name",
                        type: "varchar",
                        isUnique:true
                    },
                    {
                        name: 'id',
                        type: 'uuid',
                        isPrimary: true
                    },
                    {
                        name:"state",
                        type: "varchar"
                    }
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("city");
    }

}
