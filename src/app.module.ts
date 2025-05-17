import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { FwLog, LogSchema } from './schema/fw-log.schema';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://test:qhdks00!!@192.168.30.167:27017'),
    MongooseModule.forFeature([
      {
        name: FwLog.name,
        schema: LogSchema,
      },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
