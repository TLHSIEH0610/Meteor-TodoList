export interface TaskProp {
  _id: string;
  text: string;
  createdAt?: Date;
  isChecked?: boolean;
  userId: string;
}
