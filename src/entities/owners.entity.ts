import { Entity, Column, PrimaryColumn, JoinTable, OneToMany } from "typeorm";

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

  @Column()
  pets: string;
}