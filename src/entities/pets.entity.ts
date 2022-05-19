import { Entity, Column, PrimaryColumn, JoinTable, OneToMany, ManyToMany } from "typeorm";
import Service from "./Services";


@Entity()
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

  @ManyToMany((type) => Service, (service) => service.id, {
    eager: true,
  })
  @JoinTable()
  attendance: Service[];


  // @OneToMany((type) => Owners, {
  //   eager: true,
  // })
  // @JoinTable()
  // owner_id: string;

//     @OneToMany((type) => Reports, {
//         eager: true,
//     })
//   @JoinTable()
//   reports: Reports[];
}
