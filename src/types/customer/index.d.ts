
export type ICustomer = {
  "email": string,
  "full_name": string,
  "phone": string,
  "address": string,
  "birthday": string,
  "card_id": string,
  "id": 0
}

export type CustomerSliceState = {
  "customers": ICustomer[],
  "isFetching": boolean,
}

export type CustomerPayload = {
  "phone": string,
  "full_name": string,
  "password": string
}

