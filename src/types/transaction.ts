export interface Transaction {
  id: string;
  card_information: card_information;
  terminal_information: terminal_information;
  operation_information: operation_information;
  user_cnr_id: string;
  property_id_number_national_registry: string;
}

export interface card_information {
  card_number: string;
  card_expiry_date: string;
  card_cvv: string;
}

export interface terminal_information {
  audit_number: string;
  receipt_number: string;
}

export interface operation_information {
  amount: string;
  reference: string;
  network_id: string;
  authorization: string;
  response: string;
  message: string;
  transaction_operation: string;
  transaction_addition: string;
}
