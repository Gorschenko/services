import { IsString } from 'class-validator';

export class ChangeProfileDto {
    @IsString()
    displayName: string
}