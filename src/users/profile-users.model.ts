import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { User } from "./users.model";

// generic - показывает какие поля нам нужны для создания класса, остальные поля для создания класса не нужны
interface ProfileCreationAttrs {
    first_name: string;
    last_name: string;
    phone: number;
}

@Table({tableName: 'profile'})
export class Profile extends Model<Profile, ProfileCreationAttrs> {
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @Column({type: DataType.STRING, allowNull: false})
    first_name: string;

    @Column({type: DataType.STRING, allowNull: false})
    last_name: string;

    @Column({type: DataType.INTEGER, allowNull: false})
    phone: number;

    @BelongsTo(() => User)
    user: User;

    @ForeignKey(() => User)
    @Column({type: DataType.INTEGER})
    userId: number; 
}