import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }
  
  FindUserByMail(user){
      return new Promise(res => {
      this.http.post('http://localhost:3000/findUserByMail', user).subscribe(data => {
        console.log(data);
        res(data)
      });
    })
  }

  // FindUserByMail(user): Promise<any> {
  //   return new Promise(res => {
  //     this.http.post('http://localhost:3000/findUserByMail', user).subscribe(data => {
  //       console.log(data);
  //       res(data)
  //     });
  //   })
  // }

}
