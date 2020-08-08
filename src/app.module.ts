import { Module } from '@nestjs/common';
import {  ViewController,CreateController,DeleteController,UpdateController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [],
  controllers: [ViewController,CreateController,DeleteController,UpdateController],
  providers: [AppService],
})
export class AppModule {}
