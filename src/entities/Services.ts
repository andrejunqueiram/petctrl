import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("services")
class Service {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column()
  price: number;

  @Column()
  category: string;
}

export default Service;
