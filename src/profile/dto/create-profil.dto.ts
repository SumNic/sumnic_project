export class CreateProfileDto {
    readonly email: string;
    readonly password: string;
    readonly first_name: string;
    readonly last_name: string;
    readonly phone: number;
    readonly essenceTable: string;
    readonly image: string;
}