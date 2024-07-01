import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
  })
  export class GlobalFunctionsService {
    allowCall: boolean = true;

    maxParticipantDisplayLength: number = 35;
    maxDescriptionLength: number = 30;
    maxSubmittedByLength: number = 20;
    maxLength: number = 35;

    constructor() { }

    getMaxSubmittedByLength(): number {
      return this.maxSubmittedByLength;
    }

    getMaxDescriptionLength(): number {
      return this.maxDescriptionLength;
    }

    getMaxParticipantDisplayLength(): number {
      return this.maxParticipantDisplayLength;
    }

    getMaxLength(): number {
      return this.maxLength;
    }

    setAllowCall(allow: boolean): void {
      this.allowCall = allow;
    }

    
    showLog(className: string, methodName: string, message: string, obj: Object): void{
      if(this.allowCall){
        if(className !== null && className !== '' && methodName !== null && methodName !== ''){
          var str = '';
          if(message !== null && message !== '' && message.length > 0){
            str = '[' + className + ' - ' + methodName + '] ' + message;
          } else {
            str = '[' + className + ' - ' + methodName + ']';
          }

          
          console.log(str);
          if(obj !== null){
            console.log(obj);
          } 
                 
                    
        }
      }
    }

  }