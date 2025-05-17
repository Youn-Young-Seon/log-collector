import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes } from 'mongoose';
import { FwConnInfoSchema } from './fw-conn-info.schema';
import { FwBaseInfoSchema } from './fw-base-info.schema';

@Schema({
  timestamps: true,
})
export class FwLogSchema extends Document {
  @Prop({
    type: SchemaTypes.ObjectId,
    ref: 'FwConnInfoSchema',
  })
  fwConnInfo: FwConnInfoSchema;

  @Prop({
    type: SchemaTypes.ObjectId,
    ref: 'FwConnInfoSchema',
  })
  fwBaseInfoSchema: FwBaseInfoSchema;
}

export const LogSchema = SchemaFactory.createForClass(FwLogSchema);
