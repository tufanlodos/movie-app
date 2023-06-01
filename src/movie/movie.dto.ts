import {
  ArrayMinSize,
  IsArray,
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { Session as ISession, ROOMS, TIME_SLOTS } from './session.model';

class AddSessionDto implements Pick<ISession, 'date' & 'timeSlot' & 'room'> {
  @IsDateString()
  @IsNotEmpty()
  date: Date;

  @IsString()
  @IsNotEmpty()
  @IsEnum(TIME_SLOTS, {
    message: `timeSlot should be one of these values: ${TIME_SLOTS}`,
  })
  timeSlot: string;

  @IsNumber()
  @IsNotEmpty()
  @IsEnum(ROOMS, { message: `room should be one of these values: ${ROOMS}` })
  room: number;
}

class UpdateSessionDto extends AddSessionDto {
  @IsString()
  @IsNotEmpty()
  id: string;
}

export class AddMovieDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  minAge: number;

  @IsArray()
  @IsNotEmpty()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => AddSessionDto)
  sessions: AddSessionDto[];
}

export class UpdateMovieDto {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsOptional()
  name: string;

  @IsNumber()
  @IsOptional()
  minAge: number;

  @IsArray()
  @IsOptional()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => UpdateSessionDto)
  sessions: UpdateSessionDto[];
}

export class DeleteMovieDto {
  @IsString()
  @IsNotEmpty()
  id: string;
}
