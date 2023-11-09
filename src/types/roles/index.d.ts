export interface RolePayload {
    id?: number,
    name: string,
    description: string,
}

export interface RoleSlice{
    Roles: RolePayload[],
    isFetching: boolean
}
