import { EventModel } from "./event-model";

export class marker {
  event?: EventModel;
  lat: number;
  lng: number;
  label?: string;
  draggable: boolean;
}