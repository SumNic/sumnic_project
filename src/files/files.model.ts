import { ApiProperty } from "@nestjs/swagger";
import { Column, DataType, Model, Table } from "sequelize-typescript";

// generic - показывает какие поля нам нужны для создания класса, остальные поля для создания класса не нужны
interface FileCreationAttrs {
    essenceId: number;
    essenceTable: string;
    image: string;
}

@Table({tableName: 'files'})
export class Files extends Model<Files, FileCreationAttrs> {
    @ApiProperty({example: '1', description: 'Уникальный идентификатор'})
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @Column({type: DataType.STRING})
    essenceTable: string;

    @Column({type: DataType.INTEGER})
    essenceId: number;

    @ApiProperty({example: 'image.jpg', description: 'Название файла'})
    @Column({type: DataType.STRING, allowNull: false})
    image: string;
}
