export class ServiceResponse<T> {
    data: T;
    success: boolean = false;
    message: string = "";
  }
  
  export class StringListItem {
    id: string = "";
    name: string  = "";
  }
  
  export class IntListItem {
    id: number = -1;
    name: string = "";
  }
  
  export class SearchParameters {
    lastName: string = '';
    email: string = '';
    company: string = '';
    customerID: number = -1;
    playerID: number = -1;
  }