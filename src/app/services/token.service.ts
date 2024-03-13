import { Injectable } from '@angular/core';
import { getCookie, removeCookie, setCookie } from 'typescript-cookie';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() { }

  // saveToken(token: string){
  //   localStorage.setItem('token',token);
  // }

  // getToken(){
  //   const token = localStorage.getItem('token');
  //   return token;
  // }

  // removeToken(){
  //   localStorage.removeItem('token');
  // }

  saveToken(token: string){
    setCookie('token-trello', token, {expires: 356, path: '/'});
  }

  getToken(){
    const token = getCookie( 'token-trello');
    return token;
  }

  removeToken(){
    removeCookie('token-trello');
  }
}
