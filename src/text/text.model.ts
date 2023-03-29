import { BelongsTo, BelongsToMany, Column, DataType, ForeignKey, HasMany, HasOne, Model, Table } from "sequelize-typescript";
import { User } from "src/users/users.model";

// generic - показывает какие поля нам нужны для создания класса, остальные поля для создания класса не нужны
interface TextCreationAttrs {
    uniq_title: string;
    title: string;
    content: string;
    image: string;
    grup: string;
    userId: number;
}

@Table({tableName: 'text'})
export class Text extends Model<Text, TextCreationAttrs> {
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @Column({type: DataType.STRING, unique: true, allowNull: false})
    uniq_title: string;

    @Column({type: DataType.STRING, allowNull: false})
    title: string;

    @Column({type: DataType.STRING, allowNull: false})
    content: string;

    @Column({type: DataType.STRING, allowNull: false})
    image: string;

    @Column({type: DataType.STRING, allowNull: false})
    grup: string;

    @ForeignKey(() => User)
    @Column({type: DataType.INTEGER})
    userId: number; 

    @BelongsTo(() => User) 
    author: User;

    
}
