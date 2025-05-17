import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { FwLogSchema, LogSchema } from './schema/fw-log.schema';
import { ConnInfoSchema, FwConnInfoSchema } from './schema/fw-conn-info.schema';
import { BaseInfoSchema, FwBaseInfoSchema } from './schema/fw-base-info.schema';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://test:qhdks00!!@192.168.30.167:27017'),
    MongooseModule.forFeature([
      {
        name: FwLogSchema.name,
        schema: LogSchema,
      },
      {
        name: FwConnInfoSchema.name,
        schema: ConnInfoSchema,
      },
      {
        name: FwBaseInfoSchema.name,
        schema: BaseInfoSchema,
      },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
