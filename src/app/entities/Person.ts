import { Entity, Column, PrimaryColumn, ManyToOne, JoinColumn } from 'typeorm';
import { randomUUID } from 'crypto';
import { City } from './City';

@Entity('person')
export class Person {
  @PrimaryColumn()
  id: string;
  @Column()
  name: string;
  @Column()
  sex: string;
  @Column()
  birthday: string;
  @Column()
  city_id: string;
  @ManyToOne(() => City)
  @JoinColumn({ name: 'city_id' })
  city: City;

  constructor() {
    if (!this.id) {
      this.id = randomUUID();
    }
  }
}
