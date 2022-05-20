import { Exclude } from "class-transformer";
import {
  Entity,
  Column,
  PrimaryColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Pet } from "./pets.entity";

@Entity()
export class Reports {
  @PrimaryGeneratedColumn("uuid")
  readonly id: string;

  @Column({ nullable: true })
  reports: string;

  @Exclude()
  @ManyToOne((type) => Pet, (pet) => pet.reports)
  pet: Pet;
}
