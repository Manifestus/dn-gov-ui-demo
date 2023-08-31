import { User } from "./user";

export type InvoiceStatus = "canceled" | "paid" | "pending";

export interface Invoice {
  id?: string;
  number: string;
  status: InvoiceStatus;
  currency?: string;
  issueDate?: Date;
  dueDate?: number;
  subtotalAmount?: number;
  taxAmount?: number;
  totalAmount?: number;
  createdAt?: Date;
  updatedAt?: Date;

  user?: string;
  transaction?: string;
  property?: string;
}
