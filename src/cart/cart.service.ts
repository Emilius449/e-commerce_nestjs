import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';

@Injectable()
export class CartService {
  constructor(private prismaService: PrismaService) {}
  create(createCartDto: CreateCartDto) {
    return this.prismaService.cart.create({ data: createCartDto });
  }

  findAll() {
    return this.prismaService.cart.findMany();
  }

  findOne(id: number) {
    return this.prismaService.cart.findUniqueOrThrow({ where: { id } });
  }

  update(id: number, updateCartDto: UpdateCartDto) {
    return this.prismaService.cart.update({
      where: { id },
      data: updateCartDto,
    });
  }

  remove(id: number) {
    return this.prismaService.cart.delete({ where: { id } });
  }
}
