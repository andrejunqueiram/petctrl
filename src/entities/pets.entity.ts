import { Entity, Column, PrimaryColumn, JoinTable, OneToMany } from "typeorm";

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

//   @OneToMany((type) => Owners, {
//     eager: true,
//   })
//   @JoinTable()
//   owner_id: Owners[];

    // @OneToMany((type) => Services, {
    //     eager: true,
    // })
//   @JoinTable()
//   attendance: Services[];

    // @OneToMany((type) => Reports, {
    //     eager: true,
    // })
//   @JoinTable()
//   reports: Reports[];
}
