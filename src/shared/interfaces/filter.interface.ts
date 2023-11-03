import Status from './status.enum';
import Gender from './gender.enum';

export interface Filter {
  id: number;
  name: string;
  value: Status | Gender | undefined;
}