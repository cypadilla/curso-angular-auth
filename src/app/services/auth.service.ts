import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from '@environments/environment';
import { switchMap, tap } from 'rxjs';
import { TokenService } from './token.service';
import { ResponseLogin } from '@models/auth.model';
import { User } from '@models/users.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiUrl = environment.API_URL;

  constructor(
    private http:HttpClient,
    private tokenService: TokenService
    ) { }

  login(email:string, password: string){
    return this.http.post<ResponseLogin>(`${this.apiUrl}/api/v1/auth/login`,{ email, password })
    .pipe(
      tap(reponse => {
        this.tokenService.saveToken(reponse.access_token);
      })
    )
  }

  register(name: string, email:string, password: string){
    return this.http.post(`${this.apiUrl}/api/v1/auth/register`,{ name, email, password })
  }

  isAvailable(email:string){
    return this.http.post<{isAvailable: boolean}>(`${this.apiUrl}/api/v1/auth/is-available`,{email })
  }

  registerAndLogin(name: string, email:string, password: string){
    return this.register(name, email, password)
    .pipe(
      switchMap(()=>this.login(email,password))
    )
  }

  recovery(email: string) {
    return this.http.post(`${this.apiUrl}/api/v1/auth/recovery`,{email })
  }

  getProfile() {
    const token = this.tokenService.getToken();
    return this.http.get<User>(`${this.apiUrl}/api/v1/auth/profile`,{
      headers: {
        Authorization: `Bearer ${token}`
      }
     });
  }

  changePasword(token: string, newPassword: string) {
    return this.http.post(`${this.apiUrl}/api/v1/auth/change-password`,{token,newPassword });
  }

  logout(){
    this.tokenService.removeToken();
  }
}
