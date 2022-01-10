import { Entity, Column, PrimaryColumn, ManyToOne, JoinColumn } from "typeorm";
import {v4 as uuid} from "uuid";
import { City } from "./City";
@Entity("person")
export class Person {
    @Column()
    name: string;
    @PrimaryColumn()
    id: string;
    @Column()
    sex: string;
    @Column()
    birthday: Date;
    @Column()
    age: Int16Array;
    @Column()
    city: string;
    @ManyToOne(() => City)
    @JoinColumn({ name: "city" })
    city_id: City;
}