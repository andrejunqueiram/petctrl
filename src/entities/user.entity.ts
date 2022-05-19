import { Entity, Column, PrimaryColumn } from "typeorm";

@Entity("users")
export class User {
  @PrimaryColumn("uuid")
  readonly id: string;

  @Column()
  name: string;

  @Column()
  password: string;

  @Column()
  isAdm: boolean;
}
