
export interface StationRecord {
    name: string;
    description: string;
    address: string;
    local_x: number;
    local_y: number;
    phone: string;
    email: string;
    image: string;
    open_time: string; 
    close_time: string; 
    is_order: number;
    id: number;
    owner_id: number;
}
export interface StationState {
    listStation : StationRecord[],
    keyword:string;
}
