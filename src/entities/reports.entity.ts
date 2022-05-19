import { Entity, Column, PrimaryColumn, JoinTable, OneToMany } from "typeorm";

@Entity()
export class Reports {
  @PrimaryColumn("uuid")
  readonly id: string;

  @Column({ nullable: true })
  reports: string;

  @Column()
  pet_id: string;
}
