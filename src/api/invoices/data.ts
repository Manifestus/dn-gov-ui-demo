import { addDays, subDays, subHours } from "date-fns";
import type { Invoice } from "src/types/invoice";

const now = new Date();

export const invoices: Invoice[] = [
  {
    id: "5ecb868d0f437390ef3ac62c",
    currency: "$",
    dueDate: addDays(now, 5).getTime(),
    issueDate: new Date(),
    number: "INV-0019",
    status: "paid",
    totalAmount: 55.5,
  },
  {
    id: "59d78b0b0e15394130c373ff",
    currency: "$",
    dueDate: addDays(now, 6).getTime(),
    issueDate: new Date(),
    number: "INV-0018",
    status: "paid",
    totalAmount: 688.9,
  },
  {
    id: "2a05e7f757c35fe823da3c5a",
    currency: "$",
    dueDate: addDays(now, 9).getTime(),
    issueDate: new Date(),
    number: "INV-0017",
    status: "paid",
    totalAmount: 695.2,
  },
  {
    id: "5ecb868ada8deedee0638502",
    currency: "$",
    dueDate: addDays(now, 25).getTime(),
    issueDate: new Date(),
    number: "INV-0021",
    status: "pending",
    totalAmount: 23.11,
  },
  {
    id: "750f519b8bc4d21af9528437",
    currency: "$",
    dueDate: addDays(now, 17).getTime(),
    issueDate: new Date(),
    number: "INV-0020",
    status: "pending",
    totalAmount: 253.76,
  },
  {
    id: "5ecb868700aba84d0f1c0e48",
    currency: "$",
    dueDate: addDays(now, 11).getTime(),
    issueDate: new Date(),
    number: "INV-0015",
    status: "canceled",
    totalAmount: 781.5,
  },
  {
    id: "5ecb8682038e1rl239438dks1",
    currency: "$",
    dueDate: addDays(now, 3).getTime(),
    issueDate: new Date(),
    number: "INV-0014",
    status: "paid",
    totalAmount: 96.64,
  },
  {
    id: "5ecb8682038e1ddf4e868764",
    currency: "$",
    dueDate: addDays(now, 1).getTime(),
    issueDate: new Date(),
    number: "INV-0013",
    status: "canceled",
    totalAmount: 496.23,
  },
];

export const invoice: Invoice = {
  id: "5ecb86785312dcc69b5799ad",
  currency: "$",

  dueDate: addDays(now, 5).getTime(),
  issueDate: new Date(),

  number: "INV-0019",
  status: "paid",
  subtotalAmount: 50.0,
  taxAmount: 5.5,
  totalAmount: 55.5,
};
