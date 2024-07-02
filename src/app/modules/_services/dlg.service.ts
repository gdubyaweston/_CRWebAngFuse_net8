import { Injectable } from "@angular/core";
import { GlobalFunctionsService } from "./gfinfo.service";
import { MatDialog } from "@angular/material/dialog";


@Injectable({
    providedIn: 'root'
})
export class DialogService {

    _gfs: GlobalFunctionsService = new GlobalFunctionsService();

    constructor(
        private _dialog: MatDialog,
    ) 
    { 
        this._gfs.showLog('DialogService', 'constructor', '', null);
        this._gfs.allowCall = false;
    }

    public dlgWidth(dlgSize: string): string {
        if(dlgSize === 'xsmall'){
          return '45';
        }
        else if(dlgSize === 'small'){
          return '60';
        }
        else if(dlgSize === 'medium'){
          return '75';
        }
        else if(dlgSize === 'large'){
          return '90';
        }
        else if(dlgSize === 'xlarge'){
          return '95';
        }
        else{
          return '75';
        }
  }
  
  public dlgHeight(dlgSize: string): string {
      if(dlgSize === 'xsmall'){
        return '45';
      }
      else if(dlgSize === 'small'){
        return '60';
      }
      else if(dlgSize === 'medium'){
        return '75';
      }
      else if(dlgSize === 'large'){
        return '90';
      }
      else if(dlgSize === 'xlarge'){
        return '95';
      }
      else{
        return '75';
      }
  }

}
