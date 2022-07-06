import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';

@Injectable()
export class AddressesService {
  constructor(private prismaService: PrismaService) {}
  create(createAddressDto: CreateAddressDto) {
    return this.prismaService.address.create({ data: createAddressDto });
  }

  findAll() {
    return this.prismaService.address.findMany();
  }

  findOne(id: number) {
    return this.prismaService.address.findUniqueOrThrow({ where: { id } });
  }

  update(id: number, updateAddressDto: UpdateAddressDto) {
    return this.prismaService.address.update({
      where: { id },
      data: updateAddressDto,
    });
  }

  remove(id: number) {
    return this.prismaService.address.delete({ where: { id } });
  }
}
