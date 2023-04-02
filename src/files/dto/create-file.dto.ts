import { ApiProperty } from "@nestjs/swagger";

export class CreateFileDto {
    @ApiProperty({example: 'image.jpg', description: 'Название файла'})
    readonly image: string;
}