import { RowDataPacket } from 'mysql2/promise';

export interface User extends RowDataPacket {
  id?: number;
  fullname: string;
  email: string;
  username: string;
  password: string;
  country: string;
}
