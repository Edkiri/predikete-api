import { Group } from '../entities/group.entity';

export class GroupInfo {
  group: Group;
  groupAdmin: string;
  members: number;
  activePools: number;
}
