export interface RolePayload {
    id?: number,
    name: string,
    description: string,
}

export interface RoleSlice{
    Roles: RolePayload[],
    isFetching: boolean
}


export interface UserRecord {
    id: string;
    name: string;
    country: string;
    description: string;
  }
export interface CarTypeState {
    listCarType : UserRecord[],
    keyword: '';
}

  