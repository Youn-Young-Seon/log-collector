import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { FwConnInfo } from './fw-conn-info.schema';
import { FwBaseInfo } from './fw-base-info.schema';

@Schema({
  timestamps: true,
})
export class FwLog extends Document {
  @Prop({
    type: FwConnInfo
  })
  fwConnInfo: FwConnInfo;

  @Prop({
    type: FwBaseInfo
  })
  fwBaseInfo: FwBaseInfo;
}

export const LogSchema = SchemaFactory.createForClass(FwLog);
