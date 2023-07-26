// user.model.ts

import { RoleType } from './role-type.enum';
import { Book } from './book.model';

export interface User {
  userId: number;
  userFirstName: string;
  userLastName: string;
  userDescription: string;
  Role: RoleType;
  username: string;
  password: string;
  reservedBooks: Book[];
}
