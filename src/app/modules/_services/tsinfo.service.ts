import { Injectable } from '@angular/core';
import jwt_decode, { jwtDecode } from 'jwt-decode';

import { LoginUser } from '../_modules/loginclasses';
import { GlobalFunctionsService } from './gfinfo.service';

const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';
const VALID_DATE_KEY = 'auth-date';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {
  
  //urlAddress: string = 'https://localhost:6001';

  _gfs: GlobalFunctionsService = new GlobalFunctionsService();

  constructor() {
    this._gfs.showLog('TokenStorageService', 'constructor', '', null);
    this._gfs.allowCall = false;
   }

  public signOut(): void {
    this._gfs.showLog('TokenStorageService', 'signOut', '', null);
    sessionStorage.clear();
  }

  public saveToken(token: string): void {
    this._gfs.showLog('TokenStorageService', 'saveToken', '', null);
    sessionStorage.removeItem(TOKEN_KEY);
    sessionStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(): string | null {
    this._gfs.showLog('TokenStorageService', 'getToken', '', null);
    return sessionStorage.getItem(TOKEN_KEY);
  }

  public saveUser(user: LoginUser): void {
    this._gfs.showLog('TokenStorageService', 'saveUser', '', null);
    sessionStorage.removeItem(USER_KEY);
    sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  public getUser(): LoginUser {
    this._gfs.showLog('TokenStorageService', 'getUser', '', null);
    const user = sessionStorage.getItem(USER_KEY);
    if (user) {
      return JSON.parse(user);
    }
    this._gfs.showLog('TokenStorageService', 'getUser', 'loginUser:', user);
    return new LoginUser();
  }

  public decodedToken(): any {
    this._gfs.showLog('TokenStorageService', 'decodeToken', '', null);
    var utt = this.getToken();
    if(utt === null || utt === '')
      return '';
    return jwtDecode(utt);
  }

  public IsEscrow(): boolean {
    var tt = this.decodedToken();
    if(tt === null || tt === '')
      return false;
    return tt['Escrow'] ? tt['Escrow'] : false;
  }

  public IsAdmin(): boolean {
    var tt = this.decodedToken();
    if(tt === null || tt === '')
      return false;// false;
    return tt['Administrator'] ? tt['Administrator'] : false;
  }

  public IsDeveloper(): boolean {
    var tt = this.decodedToken();
    if(tt === null || tt === '')
      return false;
    return tt['Developer'] ? tt['Developer'] : false;
  }

  public IsAgent(): boolean {
    var tt = this.decodedToken();
    if(tt === null || tt === '')
      return false;
    return tt['Agent'] ? tt['Agent'] : false;
  }


  public signIn(token: string, user: LoginUser, expDate: string): void {
    this._gfs.showLog('TokenStorageService', 'signIn', '', null);
    this.saveToken(token);
    this.saveUser(user);
  }

  public isLoggedIn(): boolean {
    let tt = this.getToken();
    let uu = this.getUser();
    if(tt !== null && uu !== null && uu.id !== '')
      return true;
    return false;
  }


}
