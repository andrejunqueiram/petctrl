import { Entity, PrimaryColumn, ManyToOne, Column } from "typeorm";
import { Service } from "./services.entity";
import { ServiceList } from "./service_list.entity";

@Entity("petservices")
export class PetServices {
  @PrimaryColumn("uuid")
  readonly id: string;

  @ManyToOne((type) => ServiceList)
  service_list: ServiceList;

  @ManyToOne((type) => Service, { eager: true })
  service: Service;

  @Column()
  service_date: Date;
}
