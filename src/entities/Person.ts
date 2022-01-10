import { Entity, Column, CreateDateColumn, PrimaryColumn, ManyToOne, JoinColumn } from "typeorm";
import { v4 as uuid } from "uuid"
import { City } from "./City";

@Entity("person")
export class Person {
    @PrimaryColumn()
    id: string;
    @Column()
    name: string;
    @Column()
    sex: string;
    @Column()
    birthday: Date;
    @Column()
    age: number;
    @Column()
    city_id: string;
    @ManyToOne(()=>City)
    @JoinColumn({name: "city_id"})
    city: City;


    constructor() {
        if (!this.id) {
            this.id = uuid()
        }
    }
}