import { BelongsTo, BelongsToMany, Column, DataType, ForeignKey, HasMany, HasOne, Model, Table } from "sequelize-typescript";
import { Text } from "src/text/text.model";
import { Profile } from "src/users/profile-users.model";
import { User } from "src/users/users.model";

// generic - показывает какие поля нам нужны для создания класса, остальные поля для создания класса не нужны
interface FileCreationAttrs {
    essenceId: number;
    image: string;
}

@Table({tableName: 'files'})
export class Files extends Model<Files, FileCreationAttrs> {
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @Column({type: DataType.STRING})
    essenceTable: string;

    // @Column({type: DataType.INTEGER})
    // essenceId: number;

    @Column({type: DataType.STRING, allowNull: false})
    image: string;

    // @BelongsToMany(() => Text, () => UserRoles)
    // @BelongsToMany(() => Text,)
    // essenceId: Text[];

    @ForeignKey(() => Text)
    @ForeignKey(() => Profile)
    @Column({type: DataType.INTEGER})
    essenceId: number;
}
