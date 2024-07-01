import { Injectable } from '@angular/core';
import { environment } from 'app/modules/_environment/environment';

@Injectable({
  providedIn: 'root'
})
export class EnvironmentUrlService {

  urlAddress: string = environment.urlAddress;
  
  constructor() { }
}