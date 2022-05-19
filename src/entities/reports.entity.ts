import {
  Entity,
  Column,
  PrimaryColumn,
  JoinTable,
  OneToMany,
  ManyToOne,
} from "typeorm";
import { Pet } from "./pets.entity";

@Entity()
export class Reports {
  @PrimaryColumn("uuid")
  readonly id: string;

  @Column({ nullable: true })
  reports: string;

  @ManyToOne((type) => Pet, (pet) => pet.reports)
  pet: Pet;
}
