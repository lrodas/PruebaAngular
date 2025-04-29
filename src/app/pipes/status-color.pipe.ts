import { Pipe, PipeTransform } from '@angular/core';
import { TaskStatus } from '../models/task_status.enum';

@Pipe({
  name: 'statusColor',
  standalone: false
})
export class StatusColorPipe implements PipeTransform {
  transform(status: TaskStatus): string {
    return status === TaskStatus.COMPLETE ? 'green' : 'red';
  }
}
