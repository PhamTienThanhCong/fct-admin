
export interface CartypeRecord {
    id: string;
    name: string;
    country: string;
    description: string;
  }
export interface CarTypeState {
  listCarType : CartypeRecord[],
  keyword: string;
}
