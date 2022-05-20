import { Exclude } from "class-transformer";
import {
  Entity,
  PrimaryColumn,
  ManyToOne,
  Column,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Service } from "./services.entity";
import { ServiceList } from "./service_list.entity";

@Entity("petservices")
export class PetServices {
  @PrimaryGeneratedColumn("uuid")
  readonly id: string;

  @ManyToOne((type) => ServiceList)
  service_list: ServiceList;

  @ManyToOne((type) => Service, { eager: true })
  service: Service;

  @Exclude()
  @Column()
  serviceListId: string;

  @Exclude()
  @Column()
  serviceId: string;
}
