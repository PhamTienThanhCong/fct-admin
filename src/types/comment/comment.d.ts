export interface CommentPayload {
  station_id: number;
  title: string;
  content: string;
  rating: number;
  created_at: string;
  id: number;
  customer: {
    id: number;
    full_name: string;
    phone: string;
    address: string;
  };
}

export interface CommentState {
  listComment: CommentPayload[];
  keyword: string;
}
  