import { TaskStatus } from "./task_status.enum";

export class Task {
  constructor(
    public title: string,
    public status: TaskStatus = TaskStatus.INCOMPLETE,
    public id: number = Date.now()
  ) {}
}
