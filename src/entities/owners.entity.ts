import { Entity, Column, PrimaryColumn, JoinTable, OneToMany } from "typeorm";
import { Pet } from "./pets.entity";

@Entity("owner")
export class Owner {
  @PrimaryColumn("uuid")
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
