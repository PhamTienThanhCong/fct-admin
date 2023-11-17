export interface stationPortsPayload {
    id?: number,
    station_id: number,
    port_code: string,
    price: string,
    power: string,
    status: string
}

export interface stationPortsState {
    listStationPorts : stationPortsPayload[],
    keyword : string
}