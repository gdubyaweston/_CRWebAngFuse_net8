import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthUtils } from 'app/core/auth/auth.utils';
import { UserService } from 'app/core/user/user.service';
import { EnvironmentUrlService } from 'app/modules/_services/envurlinfo.service';
import { GlobalFunctionsService } from 'app/modules/_services/gfinfo.service';
import { TokenStorageService } from 'app/modules/_services/tsinfo.service';
import { catchError, Observable, of, switchMap, throwError } from 'rxjs';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({providedIn: 'root'})
export class AuthService
{
    private _authenticated: boolean = false;
    
    _gfs: GlobalFunctionsService = new GlobalFunctionsService();
    

    /**
     * Constructor
     */
    constructor(
        private _httpClient: HttpClient,
        private _userService: UserService,
        private _envUrl: EnvironmentUrlService,
        private _rtr: Router,
        private _ts: TokenStorageService,
    )
    {
        this._gfs.showLog('AuthService', 'constructor', '', null);
        this._gfs.allowCall = false;
    }
    
    get baseURLAddress(): string {
        return this._envUrl.urlAddress; //'https://localhost:6001'; // this._ts.urlAddress;
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Setter & getter for access token
     */
    set accessToken(token: string)
    {
        //console.log('[auth.service - SET accessToken] token(localStorage):' + token);
        //console.log('[auth.service - set accessToken] date: ' + this.getTheDate());
        
        this._gfs.showLog('AuthService', 'accessToken', 'saveToken:', token);
        this._ts.saveToken(token);
        localStorage.setItem('accessToken', token);
    }

    get accessToken(): string
    {
        //return localStorage.getItem('accessToken') ?? '';

        var tkn = this._ts.getToken();
        var drstr = new Date().toString();
        this._gfs.showLog('AuthService', 'accessToken', 'getToken:', tkn);
        this._gfs.showLog('AuthService', 'accessToken', 'getDate:', drstr);
        return tkn;
    }

    getTheDate1(): string {
        var mm = new Date().getMonth() + 1;
        var dd = new Date().getDate();
        var yy = new Date().getFullYear();
        var hour = new Date().getHours();
        var minute = new Date().getMinutes();
        var second = new Date().getSeconds();
        var millisecond = new Date().getMilliseconds();
        return mm + '/' + dd + '/' + yy + ' ' + hour + ':' + minute + ':' + second + ':' + millisecond;
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Forgot password
     *
     * @param email
     */
    forgotPassword(email: string): Observable<any>
    {
        this._gfs.showLog('AuthService', 'forgotPassword', 'email:', email);
        return this._httpClient.post('api/auth/forgot-password', email);
    }

    /**
     * Reset password
     *
     * @param password
     */
    resetPassword(password: string): Observable<any>
    {
        this._gfs.showLog('AuthService', 'resetPassword', 'password:', password);
        return this._httpClient.post('api/auth/reset-password', password);
    }

    /**
     * Sign in
     *
     * @param credentials
     */
    signIn(credentials: { email: string; password: string }): Observable<any>
    {
        this._gfs.showLog('AuthService', 'signIn', '', null);
        this._gfs.showLog('AuthService', 'signIn', 'this._authenticated:', this._authenticated);
        this._gfs.showLog('AuthService', 'signIn', 'credentials:', credentials);
        this._gfs.showLog('AuthService', 'signIn', 'urlAddress:', this.baseURLAddress);
        
        var daURL = this.baseURLAddress +  "/api/login/login";
        this._gfs.showLog('AuthService', 'signIn', 'daUrl:', daURL);

        // Throw error, if the user is already logged in
        if ( this._authenticated )
        {
            return throwError('User is already logged in.');
        }

        return this._httpClient.post(daURL, { userName: credentials.email, password: credentials.password }, httpOptions).pipe(
            switchMap((response: any) =>
            {
                this._gfs.showLog('AuthService', 'signIn', 'response:', response);
                
                // Store the access token in the local storage
                //this.accessToken = response.accessToken;

                // Set the authenticated flag to true
                //this._authenticated = true;

                // Store the user on the user service
                //this._userService.user = response.user;

                // Return a new observable with the response
                return of(response);
            }),
        );
    }

    validate(userName: string, code: string): Observable<any>
    {
        this._gfs.showLog('AuthService', 'validate', 'userName:', userName);
        this._gfs.showLog('AuthService', 'validate', 'code:', code);
        
        var daURL = this.baseURLAddress +  "/api/login/twostep";
        this._gfs.showLog('AuthService', 'validate', 'daUrl:', daURL);
        
        return this._httpClient.post(daURL, { userName: userName, token: code }, httpOptions).pipe(
            switchMap((response: any) =>
            {
                this._gfs.showLog('AuthService', 'validate', 'response:', response);
                
                // Store the access token in the local storage
                this.accessToken = response.data.token;

                // Set the authenticated flag to true
                this._authenticated = true;

                // Store the user on the user service
                this._userService.user = response.data.userInfo;
                              

                // Return a new observable with the response
                return of(response);
            }),
        );
        
    }

    /**
     * Sign in using the access token
     */
    signInUsingToken(): Observable<any>
    {
        this._gfs.showLog('AuthService', 'signInUsingToken', '', null);

        // Sign in using the token
        return this._httpClient.post('api/auth/sign-in-with-token', {
            accessToken: this.accessToken,
        }).pipe(
            catchError(() =>

                // Return false
                of(false),
            ),
            switchMap((response: any) =>
            {
                // Replace the access token with the new one if it's available on
                // the response object.
                //
                // This is an added optional step for better security. Once you sign
                // in using the token, you should generate a new one on the server
                // side and attach it to the response object. Then the following
                // piece of code can replace the token with the refreshed one.
                if ( response.accessToken )
                {
                    this.accessToken = response.accessToken;
                }

                // Set the authenticated flag to true
                this._authenticated = true;

                // Store the user on the user service
                this._userService.user = response.user;

                // Return true
                return of(true);
            }),
        );
    }

    /**
     * Sign out
     */
    signOut(): Observable<any>
    {
        this._gfs.showLog('AuthService', 'signOut', '', null);
        // Remove the access token from the local storage
        this._ts.signOut();
        localStorage.removeItem('accessToken');

        // Set the authenticated flag to false
        this._authenticated = false;

        // Return the observable
        return of(true);
    }

    /**
     * Sign up
     *
     * @param user
     */
    signUp(user: { name: string; email: string; password: string; company: string }): Observable<any>
    {
        this._gfs.showLog('AuthService', 'signUp', 'user:', user);
        return this._httpClient.post('api/auth/sign-up', user);
    }

    /**
     * Unlock session
     *
     * @param credentials
     */
    unlockSession(credentials: { email: string; password: string }): Observable<any>
    {
        this._gfs.showLog('AuthService', 'unlockSession', 'credentials:', credentials);
        return this._httpClient.post('api/auth/unlock-session', credentials);
    }

    /**
     * Check the authentication status
     */
    check(): Observable<boolean>
    {
        this._gfs.showLog('AuthService', 'check', '', null);
        
        //console.log('[auth.service - check - this._authenticated] ' + this._authenticated);
        // Check if the user is logged in
        if ( this._authenticated )
        {
            return of(true);
        }

        //console.log('[auth.service - check - this.accessToken] ' + this.accessToken);
        // Check the access token availability
        if ( !this.accessToken )
        {
            return of(false);
        }

        //console.log('[auth.service - check - isTokenExpired] ' + AuthUtils.isTokenExpired(this.accessToken));
        // Check the access token expire date
        if ( AuthUtils.isTokenExpired(this.accessToken) )
        {
            return of(false);
        }

        //console.log('[auth.service - check - signInUsingToken] ' + this.signInUsingToken());
        // If the access token exists, and it didn't expire, sign in using it
        return this.signInUsingToken();
    }
}
