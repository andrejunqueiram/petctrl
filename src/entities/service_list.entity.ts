import {
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
} from "typeorm";
import { Pet } from "./pets.entity";
import { PetServices } from "./pet_services.entity";

@Entity("servicelist")
export class ServiceList {
  @PrimaryColumn("uuid")
  readonly id: string;

  @ManyToOne((type) => Pet, (pet) => pet.service_list)
  pet: Pet;

  @OneToMany(
    (type) => PetServices,
    (pet_services) => pet_services.service_list,
    {
      eager: true,
    }
  )
  pet_services: PetServices[];

  @CreateDateColumn()
  service_date: Date;
}
