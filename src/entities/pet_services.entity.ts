import { Entity, PrimaryColumn, OneToMany, ManyToOne, Column } from "typeorm";

@Entity("petservices")
export class PetServices {
  @PrimaryColumn("uuid")
  readonly id: string;

  @ManyToOne((type) => Pet, (pet) => pet.petsservices)
  pet: Pet;

  @OneToMany((type) => Services, (services) => services.petservices)
  service: Services[];

  @Column()
  service_date: Date;
}
