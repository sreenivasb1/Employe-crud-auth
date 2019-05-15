import { Injectable } from '@angular/core';
import { User } from './user.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';   // importing it to send to frontend
import { environment } from 'src/environments/environment';  // consists of baseUrl

@Injectable({
  providedIn: 'root'
})
export class UserService {
  // import it in sign-up com.ys
  selectedUser: User = {
  fullName: '',
  email: '',
  password: ''
};

  constructor(private http: HttpClient) { }

  postUser(user: User){
   return this.http.post(environment.apiBaseUrl+'/register',user);
  }

   // call dis login from signin comp.ts
   login(authCredentials){
    return this.http.post(environment.apiBaseUrl+'/authenticate',authCredentials)
  }
// to store jwt
// call dis in sigin.comp.ys
setToken(token:string){
  localStorage.setItem('token',token);
}

}
