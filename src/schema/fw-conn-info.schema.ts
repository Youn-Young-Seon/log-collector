import { Document } from 'mongoose';
import { Prop, Schema } from '@nestjs/mongoose';

@Schema({ _id: false })
export class FwConnInfo extends Document {
  @Prop({
    name: "nat_rule_id"
  })
  natRuleId: number;

  @Prop({
    name: "nat_rule_name"
  })
  natRuleName: string;

  @Prop({
    name: "src_ip"
  })
  srcIp: string;

  @Prop({
    name: "src_port"
  })
  srcPort: number;

  @Prop()
  dstIp: string;

  @Prop()
  dstPort: number;

  @Prop()
  protocol: number;
}