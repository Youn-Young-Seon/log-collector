import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class FwConnInfoSchema extends Document {
  @Prop({
    name: "nat_rule_id"
  })
  natRuleId: number;

  @Prop({
    name: "nat_rule_id"
  })
  natRuleName: string;

  @Prop({
    name: "src_ip"
  })
  srcIp: string;

  @Prop()
  srcPort: number;

  @Prop()
  dstIp: string;

  @Prop()
  dstPort: number;

  @Prop()
  protocol: number;
}

export const ConnInfoSchema = SchemaFactory.createForClass(FwConnInfoSchema);