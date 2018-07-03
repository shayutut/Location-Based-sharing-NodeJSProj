import { IUser } from './user-model';


export class EventModel {
  title: string;
  date: Date;
  genre: string;
  location: string;
  publisher: IUser;

  constructor(model: EventModel) {
    // this = new EventModel();
    if(model)
    {
      this.title=model.title;
      this.location=model.location;
      this.date=model.date;
      this.publisher=model.publisher;
      this.genre=model.genre;
    }

  }
}

// let Ganers = ["Board Games", "Pocker", "Jam", "Rock Concert"];
