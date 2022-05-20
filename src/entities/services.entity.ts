import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("services")
export class Service {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column()
  price: number;

  @Column()
  category: string;
}
