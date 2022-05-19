import {
  Entity,
  Column,
  PrimaryColumn,
  JoinTable,
  OneToMany,
  ManyToMany,
  ManyToOne,
} from "typeorm";
import { Owner } from "./owners.entity";
import { Reports } from "./reports.entity";
import Service from "./services.entity";

@Entity("pets")
export class Pet {
  @PrimaryColumn("uuid")
  readonly id: string;

  @Column()
  name: string;

  @Column()
  breed: string;

  @Column()
  type: string;

  @Column()
  birthday: Date;

  @ManyToOne((type) => Owner, (owner) => owner.pets)
  owner: Owner;

  @OneToMany((type) => Reports, (report) => report.pet, {
    eager: true,
  })
  reports: Reports[];
}
