import { query } from "express";
import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class City1641821450451 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "city",
                columns: [
                    {
                        name: "name",
                        type: "varchar"
                    },
                    {
                        name: "id",
                        type: "int",
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
