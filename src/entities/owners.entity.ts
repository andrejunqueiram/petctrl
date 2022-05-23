import { Entity, Column, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Pet } from "./pets.entity";

@Entity("owners")
export class Owner {
  @PrimaryGeneratedColumn("uuid")
  readonly id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  address: string;

  @Column()
  phone_number: string;

  @OneToMany((type) => Pet, (pet) => pet.owner, {
    eager: true,
  })
  pets: Pet[];
}
