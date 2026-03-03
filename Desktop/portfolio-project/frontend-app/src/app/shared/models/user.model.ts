// src/app/shared/models/user.model.ts
export interface User {
  id: number;
  email: string;
  firstName?: string;
  lastName?: string;
  role?: string; // ex: 'admin' ou 'visitor'
}