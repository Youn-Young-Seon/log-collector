import { Document } from 'mongoose';
import { Prop, Schema } from '@nestjs/mongoose';

@Schema({ _id: false })
export class FwBaseInfo extends Document {
  @Prop()
  tag: string;

  @Prop()
  startTime: Date;

  @Prop()
  endTime: Date;

  @Prop()
  machineName: string;

  @Prop()
  fwRuleId: number;

  @Prop()
  fwRuleName: string;

  @Prop()
  appProtocol: string;

  @Prop()
  bytesForward: number;

  @Prop()
  bytesBackward: number;

  @Prop()
  bytesTotal: number;

  @Prop()
  terminateReason: string;

  @Prop()
  host: string;

  @Prop()
  srcCountry: string;

  @Prop()
  dstCountry: string;
}