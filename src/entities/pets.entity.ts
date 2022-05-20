import { Entity, Column, PrimaryColumn, OneToMany, ManyToOne } from "typeorm";
import { Owner } from "./owners.entity";
import { Reports } from "./reports.entity";
import { ServiceList } from "./service_list.entity";

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

  @OneToMany((type) => ServiceList, (service_list) => service_list.pet, {
    eager: true,
  })
  service_list: ServiceList[];

  @OneToMany((type) => Reports, (report) => report.pet, {
    eager: true,
  })
  reports: Reports[];
}
