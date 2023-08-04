export type InvoiceStatus = "canceled" | "paid" | "pending";

export interface Invoice {
  id: string;
  currency: string;
  dueDate?: number;
  issueDate?: number;
  number: string;
  status: InvoiceStatus;
  subtotalAmount?: number;
  taxAmount?: number;
  totalAmount?: number;
}
