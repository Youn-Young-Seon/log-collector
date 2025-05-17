import { Injectable, OnModuleInit } from '@nestjs/common';
import * as net from 'net';
import { InjectModel } from '@nestjs/mongoose';
import { FwLog } from './schema/fw-log.schema';
import { Model } from 'mongoose';

@Injectable()
export class AppService implements OnModuleInit {
  constructor(
    @InjectModel(FwLog.name)
    private logModel: Model<FwLog>,
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

        console.log(parsedData);
      });
    });

    server.listen(5114, () => {
      console.log('Syslog TCP server listening on port 5114');
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
