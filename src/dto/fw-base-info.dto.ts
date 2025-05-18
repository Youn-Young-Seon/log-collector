export class FwBaseInfoDto {
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
}