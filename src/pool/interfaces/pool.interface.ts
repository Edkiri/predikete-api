import { Group } from 'src/group/entities/group.entity';
import { User } from 'src/user/entities/user.entity';

export interface IPool {
  owner: User;
  group: Group;
}
