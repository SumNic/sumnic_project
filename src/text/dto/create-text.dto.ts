import { ApiProperty } from "@nestjs/swagger";

export class CreateTextDto {
    @ApiProperty({example: 'main-hero-text', description: 'Уникальное название для поиска'})
    readonly uniq_title: string;
    @ApiProperty({example: 'Название', description: 'Название текстового блока'})
    readonly title: string;
    @ApiProperty({example: 'Текст', description: 'Содержание текстового блока'})
    readonly content: string;
    @ApiProperty({example: 'image.jpg', description: 'Название файла'})
    readonly image: string;
    @ApiProperty({example: 'main-page', description: 'Название группы'})
    readonly grup: string;
    @ApiProperty({example: 'text', description: 'Название таблицы'})
    readonly essenceTable: string;
}