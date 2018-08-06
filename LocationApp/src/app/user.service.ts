import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService implements OnInit{
  serverURL: string

  ngOnInit(): void {
    this.serverURL = environment.serverURL;
  }

  constructor(private http: HttpClient) { }
  
  FindUserByMail(user){
      return new Promise(res => {
      this.http.post(this.serverURL+'findUserByMail', user).subscribe(data => {
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
