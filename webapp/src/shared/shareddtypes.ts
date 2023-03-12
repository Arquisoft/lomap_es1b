export type User = {
  name: string;
  email: string;
}

export interface IPMarker {
  id: number
  date: Date
  lat: number
  lng: number
  name: string
  description: string
}