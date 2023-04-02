export type User = {
  id: string,
  name: string,
  email: string,
  friends: Array<string>
}

export interface IPMarker {
  id: number,
  date: Date,
  lat: number,
  lng: number,
  name: string,
  description: string
}