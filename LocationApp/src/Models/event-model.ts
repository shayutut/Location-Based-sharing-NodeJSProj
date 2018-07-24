import { IUser } from './user-model';


export class EventModel {
  title: string;
  date: Date;
  genre: string;
  location: locationModel;
  publisher: any;
  image?: string;
  description?: string;
  subscribers: { email: string, name: string }[];

  constructor(model: EventModel) {
    // this = new EventModel();
    if (model) {
      this.title = model.title;
      this.location = model.location;
      this.date = model.date;
      this.publisher = model.publisher;
      this.genre = model.genre;
      this.description = model.description;
    }

  }
}
export class locationModel { lat: number; lng: number };

// let Ganers = ["Board Games", "Pocker", "Jam", "Rock Concert"];
