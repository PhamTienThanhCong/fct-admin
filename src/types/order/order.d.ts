export interface OrderPayload {
  charging_port_id: number;
  start_time: string;
  end_time: string;
  id: number;
  customer_id: number;
  status: string;
  total_price: string;
  total_time: string;
  created_at: string;
  customer: {
    id: number;
    full_name: string;
    phone: string;
    address: string;
  };
}

export interface OrderState {
  listOrder: OrderPayload[];
  keyword: string;
}
