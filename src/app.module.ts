import { Module } from '@nestjs/common';
import { createObserveModule } from '@nestjs/observe';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { userModule } from './User/user.module.js';
import { PostModule } from './post/post.module.js';
import { MessageModule } from './message/message.module.js';
import { ConfigModule, ConfigService } from '@nestjs/config';
import Joi from 'joi';
import { MongooseModule } from '@nestjs/mongoose';
import { SecurityModule } from './common/security/security.module.js';
import { HashService } from './common/security/hash.service.js';
import { EncryptionService } from './common/security/encryption.service.js';
import { CacheModule } from '@nestjs/cache-manager';
import { createKeyv } from "@keyv/redis";
import { Keyv, KeyvCacheableMemory } from 'cacheable';
import { CategoryModule } from './category/category.module.js';
import { ProductModule } from './product/product.module.js';
import { FavouriteModule } from './favourite/favourite.module.js';
import { CartModule } from './cart/cart.module.js';
export const { ObserveModule, ObserveInstrument } = createObserveModule();

@Module({
  imports: [
    userModule, PostModule, MessageModule,ConfigModule.forRoot({
    envFilePath:"./config/.env",
    isGlobal:true,
     validationSchema:Joi.object({
       PORT:Joi.number().required(),
       DB_URL:Joi.string().required()
    })
  }),

  MongooseModule.forRootAsync({
    imports:[ConfigModule,SecurityModule],
    inject:[ConfigService,HashService,EncryptionService],
    useFactory:(
      ConfigService:ConfigService,
      hashservice:HashService,
      encryptionservice:EncryptionService          
    )=>({
      uri:ConfigService.get<string>("DB_URL"),
      onConnectionCreate:(connection)=>{
      connection.on('connected', () => console.log('connected'));
    connection.on('open', () => console.log('open'));
    connection.on('disconnected', () => console.log('disconnected'));
    connection.on('reconnected', () => console.log('reconnected'));
    connection.on('disconnecting', () => console.log('disconnecting'));
     return connection
    },
serverSelectionTimeoutMS:5000
    })
    
  }),
  SecurityModule,
  CacheModule.registerAsync({
    isGlobal:true,
    useFactory:async()=>{
      return{
        stores:[
           createKeyv("redis://127.0.0.1:6379"),
           new Keyv({
                store: new KeyvCacheableMemory({ ttl: 60000, lruSize: 5000 }),
              })
        ],
      }
    }
  }),
  CategoryModule,
  ProductModule,
  FavouriteModule,
  CartModule
],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
