import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { FwLog, LogSchema } from './schema/fw-log.schema';
import { FwConnInfo } from './schema/fw-conn-info.schema';
import { FwBaseInfo } from './schema/fw-base-info.schema';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://test:qhdks00!!@192.168.30.167:27017'),
    MongooseModule.forFeature([
      {
        name: FwLog.name,
        schema: LogSchema, 
      },
      {
        name: FwConnInfo.name,
        schema: LogSchema,
      },
      {
        name: FwBaseInfo.name,
        schema: LogSchema,
      },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
