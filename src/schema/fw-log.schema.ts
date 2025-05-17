import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { FwConnInfo } from './fw-conn-info.schema';
import { FwBaseInfo } from './fw-base-info.schema';

@Schema({
  timestamps: true,
})
export class FwLog extends Document {
  @Prop({
    type: Object
  })
  fwConnInfo: {
    natRuleId: number;
    natRuleName: string;
    srcIp: string;
    srcPort: number;
    dstIp: string;
    dstPort: number;
    protocol: number;
  };

  @Prop({
    type: Object
  })
  fwBaseInfoSchema: {
    tag: string;
    startTime: Date;
    endTime: Date;
    machineName: string;
    fwRuleId: number;
    fwRuleName: string;
    appProtocol: string;
    bytesForward: number;
    bytesBackward: number;
    bytesTotal: number;
    terminateReason: string;
    host: string;
    srcCountry: string;
    dstCountry: string;
  };
}

export const LogSchema = SchemaFactory.createForClass(FwLog);
