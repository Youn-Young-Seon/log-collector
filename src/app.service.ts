import { Injectable, OnModuleInit } from '@nestjs/common';
import * as net from 'net';
import { InjectModel } from '@nestjs/mongoose';
import { FwLogSchema } from './schema/fw-log.schema';
import { Model } from 'mongoose';
import { ConnInfoSchema, FwConnInfoSchema } from './schema/fw-conn-info.schema';
import { BaseInfoSchema, FwBaseInfoSchema } from './schema/fw-base-info.schema';

@Injectable()
export class AppService implements OnModuleInit {
  constructor(
    @InjectModel(FwLogSchema.name)
    private logModel: Model<FwLogSchema>,
    @InjectModel(FwConnInfoSchema.name)
    private connInfoSchema: Model<FwConnInfoSchema>,
    @InjectModel(FwBaseInfoSchema.name)
    private baseInfoSchema: Model<FwBaseInfoSchema>,
  ) {
  }

  onModuleInit() {
    const server = net.createServer((socket) => {
      socket.on('data', (data) => {
        const parsedData = this.parseLog(data.toString());

        if ('_id' in parsedData) {
          delete parsedData._id;
        }

        this.logModel.insertOne(parsedData);
        this.connInfoSchema.insertOne(parsedData);
        this.baseInfoSchema.insertOne(parsedData);

        console.log(parsedData);
      });
    });

    server.listen(3002, () => {
      console.log('Syslog TCP server listening on port 3002');
    });
  }

  parseLog(log: string): Record<string, any> {
    const result: Record<string, any> = {};

    const timestampMatch = log.match(/^\S+/);
    if (timestampMatch) result.timestamp = timestampMatch[0];

    const tagMatch = log.match(/\[(.*?)\]/);
    if (tagMatch) result.tag = tagMatch[1];

    const keyValuePairs = log.match(/\b[\w-]+="?[^"\s]+"?/g);

    if (keyValuePairs) {
      keyValuePairs.forEach((pair) => {
        const [key, valueRaw] = pair.split('=');
        let value: string | number = valueRaw?.replace(/^"|"$/g, '');
        if (!isNaN(value as any)) value = Number(value);
        result[key] = value;
      });
    }

    return this.keysToCamelCase(result);
  }

  keysToCamelCase(obj: any): any {
    if (Array.isArray(obj)) {
      return obj.map(this.keysToCamelCase);
    } else if (obj !== null && typeof obj === 'object') {
      return Object.entries(obj).reduce((acc, [key, value]) => {
        const camelKey = this.toCamelCase(key);
        acc[camelKey] = this.keysToCamelCase(value);
        return acc;
      }, {} as Record<string, any>);
    }
    return obj;
  }

  private toCamelCase(str: string): string {
    return str.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());
  }
}
