import { ApiProperty } from "@nestjs/swagger";
import { Column, DataType, Model, Table } from "sequelize-typescript";
import { Files } from "src/files/files.model";

// generic - показывает какие поля нам нужны для создания класса, остальные поля для создания класса не нужны
interface TextCreationAttrs {
    uniq_title: string;
    title: string;
    content: string;
    grup: string;
    essenceTable: string;
    profileId: number;
}

@Table({tableName: 'text'})
export class Text extends Model<Text, TextCreationAttrs> {
    @ApiProperty({example: '1', description: 'Уникальный идентификатор'})
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @ApiProperty({example: 'main-hero-text', description: 'Уникальное название для поиска'})
    @Column({type: DataType.STRING, unique: true, allowNull: false})
    uniq_title: string;

    @ApiProperty({example: 'Название', description: 'Название текстового блока'})
    @Column({type: DataType.STRING, allowNull: false})
    title: string;

    @ApiProperty({example: 'Текст', description: 'Содержание текстового блока'})
    @Column({type: DataType.STRING, allowNull: false})
    content: string;
    
    @ApiProperty({example: 'main-page', description: 'Название группы'})
    @Column({type: DataType.STRING, allowNull: false})
    grup: string;

    @Column({type: DataType.STRING, defaultValue: 'text'})
    essenceTable: string;

    @Column({type: DataType.DATE})
    files: Files[];
}
