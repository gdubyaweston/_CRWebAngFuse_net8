export class LoginUser {
    id: string = "";
    userName: string = "";
    email: string = "";
    emailConfirmed: boolean = false;
    vectorsUID: number = 0;
  }
  
  export class LoginResult {
    userInfo: LoginUser = new LoginUser();
    token: string = "";
    expiresAt: Date = new Date();
    tfToken: string = "";
  }
  
  export class Login {
    userName: string = "";
    password: string = "";
    token: string = "";
  }