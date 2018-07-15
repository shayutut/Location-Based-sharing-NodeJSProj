import { IUser } from './user-model';


export class EventModel {
  title: string;
  date?: Date;
  genre: string;
  location?: location;
  publisher?: any;
  image?: string;
  description?:string;

  constructor(model: EventModel) {
    // this = new EventModel();
    if (model) {
      this.title = model.title;
      this.location = model.location;
      this.date = model.date;
      this.publisher = model.publisher;
      this.genre = model.genre;
      this.description=model.description;
    }

  }
}
export class location
  { lat: number; lng: number };

// let Ganers = ["Board Games", "Pocker", "Jam", "Rock Concert"];
