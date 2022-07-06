# Generate Nest Js Project

```bash
$ nest new project-name
```

# cd into project

```bash
$ cd project-name
```

# Configuration

```bash
$ npm i --save @nestjs/config
```

in app.module.ts => imports

```ts
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
  ],
```

# Add Database (I'm using docker and postgres as database)

- Get docker postgres image

- Create Docker file (docker-compose.yml) in root folder

```yml
services:
  dev-db:
    image: postgres
    ports:
      - 5432:5432
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: passwordMy
      POSTGRES_DB: eCommerceDatabase
```

- Configure Environment variables

```env
DATABASE_URL="postgresql://postgres:passwordMy@localhost:5432/eCommerceDatabase?schema=public"
```

- Run docker postgres image

```bash
$ docker compose up -d
```

# Install Prisma

```bash
$ npm install prisma --save-dev
```

# Install Prisma Client (optinal)

```bash
$ npm install @prisma/client
```

# Generate Prisma folder

```bash
$ npx prisma init
```

# Declare Prisma Model in schema.prisma file

example

```prisma

// User model
// Relation with bookmark (one to many)
model User {
  id                 Int        @id @default(autoincrement())
  createdAt          DateTime   @default(now())
  updatedAt          DateTime   @updatedAt
  email              String     @unique
  hash               String
  hashedRefreshToken String?
  firstName          String?
  lastName           String?
  Bookmarks          Bookmark[]

  @@map("users")
}
// Bookmark model
// Relation with user (Every  bookmark belongs to a user, many to one)
model Bookmark {
  id          Int      @id @default(autoincrement())
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  title       String
  description String?
  link        String
  userId      Int
  user        User     @relation(fields: [userId], references: [id])

  @@map("bookmarks")
}
```

# Generate Prisma migration

```bash
$ npx prisma migrate dev --create-only
```

every time you do changes in schema.prisma file, run migration
Emilius angalia tableplus (prisma client)

# Generate Prisma migration to the database

```bash
$ npx prisma db push
```

# Open Prisma studio (Client)

```bash
$ npx prisma studio
```

# Create Prisma Module and Service

When we start application we want to be able to connect to the database schema

```ts
// prisma module
import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
@Global() // module will be available for every other module
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}

// prisma service
import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaClient } from '@prisma/client';
import { envConstants } from 'src/utility';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  constructor(configService: ConfigService) {
    super({
      datasources: {
        db: {
          url: configService.get(envConstants.DATABASE_URL),
        },
      },
    });
  }
  async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
```

# Install nest class validator and transformer

```bash
$ npm i --save class-validator class-transformer
```

# Register Pipe as globe pipe in main.ts file

```ts
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );
  await app.listen(3000);
}
bootstrap();
```

# Password hashing bcrypt or argon2

```bash
$ npm install bcrypt

$ npm install --save-dev @types/bcrypt

# OR

$ npm install argon2
```

# Passport Jwt

```bash
$ npm install @nestjs/passport passport

$ npm install --save @nestjs/jwt passport-jwt

$ npm install --save-dev @types/passport-jwt
```

# Strategy

1. Create AccessTokenStrategy
2. Create RefreshTokenStrategy

# Authentication

- Registration
- Login
- Change Password
- Reset Password

# Landing Page

- User Management
- Properties

# User Management

- ~~Create User~~
- Read User
- Update User
  - Roles management
- Delete User

```ts
export interface User {
  firstName: string;
  middleName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  roles: string[];
}
```

# Properties Management

- Create Property
- Read Property
- Update Property
- Delete Property

```ts
export interface Property {
  imageProperties: ImageProperties[];
  propertyType: PropertyTypeEnum;
  bathroom: number;
  bedroom: number;
  price: number;
  currency?: string;
  region: string;
  district: string;
  village: string;
  agentName?: string;
  agentImageUrl?: string;
  agentPhoneNumber1?: number;
  agentPhoneNumber2?: number;
  description: string;
  id?: string;
  status: StatusEnum;
}
export interface ImageProperties {
  base64?: string;
  name: string;
  size: string;
  type: string;
}
export enum PropertyTypeEnum {
  forSale = 'forSale',
  forRent = 'forRent',
}
export enum StatusEnum {
  occupied = 'occupied',
  available = 'available',
}
```

# Package.json script

```json
  "scripts": {
    "prebuild": "rimraf dist",
    "build": "nest build",
    "format": "prettier --write \"src/**/*.ts\" \"test/**/*.ts\"",
    "start": "nest start",
    "start:dev": "nest start --watch",
    "start:debug": "nest start --debug --watch",
    "start:prod": "node dist/main",
    "lint": "eslint \"{src,apps,libs,test}/**/*.ts\" --fix",
    "test": "jest",
    "test:watch": "jest --watch",
    "test:cov": "jest --coverage",
    "test:debug": "node --inspect-brk -r tsconfig-paths/register -r ts-node/register node_modules/.bin/jest --runInBand",
    "test:e2e": "jest --config ./test/jest-e2e.json",
    "prisma:migrate": "npx prisma migrate dev",
    "prisma:push": "npx prisma db push",
    "prisma:deploy": "npx prisma migrate deploy",
    "prisma:studio": "npx prisma studio",
    "docker:rm": "docker compose rm dev-db -s -f -v",
    "docker:up": "docker compose up dev-db -d",
    "db:start": "npm run docker:rm && npm run docker:up && sleep 1 && npm run prisma:deploy"
  },
```
## Auth
