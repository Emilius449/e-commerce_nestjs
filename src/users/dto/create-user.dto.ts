import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
export class CreateUserDto {
  @ApiHideProperty()
  id: number;
  @ApiHideProperty()
  createdAt: Date;
  @ApiHideProperty()
  updatedAt: Date;
  @ApiProperty()
  email: string;
  @ApiProperty()
  firstName: string;
  @ApiProperty()
  lastName: string;
  @ApiProperty()
  password: string;
  @ApiProperty()
  isAdmin: boolean;
}
