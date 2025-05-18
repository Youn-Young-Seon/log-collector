import { FwConnInfoDto } from './fw-conn-info.dto';
import { FwBaseInfoDto } from './fw-base-info.dto';
import { Type } from 'class-transformer';

export class FwLogDto {
  @Type(() => FwConnInfoDto)
  fwConnInfo: FwConnInfoDto;

  @Type(() => FwConnInfoDto)
  fwBaseInfo: FwBaseInfoDto;
}