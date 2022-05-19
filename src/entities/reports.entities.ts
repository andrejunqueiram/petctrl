import { Entity, Column, PrimaryColumn, JoinTable, OneToMany } from "typeorm";
import { v4 as uuid } from "uuid";

@Entity()
export class Reports {
  @PrimaryColumn("uuid")
  readonly id: string;

  @Column({ nullable: true })
  reports: string;

  @Column()
  pet_id: string;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
