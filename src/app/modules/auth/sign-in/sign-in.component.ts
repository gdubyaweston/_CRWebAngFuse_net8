import { NgIf } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormsModule, NgForm, ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { FuseAlertComponent, FuseAlertType } from '@fuse/components/alert';
import { AuthService } from 'app/core/auth/auth.service';
import { GlobalFunctionsService } from 'app/modules/_services/gfinfo.service';
import { TokenStorageService } from 'app/modules/_services/tsinfo.service';


@Component({
    selector     : 'auth-sign-in',
    templateUrl  : './sign-in.component.html',
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations,
    standalone   : true,
    imports      : [RouterLink, FuseAlertComponent, NgIf, FormsModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule, MatCheckboxModule, MatProgressSpinnerModule],
})
export class AuthSignInComponent implements OnInit
{
    _gfs: GlobalFunctionsService = new GlobalFunctionsService();

    @ViewChild('signInNgForm') signInNgForm: NgForm;

    alert: { type: FuseAlertType; message: string } = {
        type   : 'success',
        message: '',
    };
    signInForm: UntypedFormGroup;
    signInForm2: UntypedFormGroup;
    showAlert: boolean = false;

    showUserName: boolean = true;
    showValidation: boolean = false;

    /**
     * Constructor
     */
    constructor(
        private _activatedRoute: ActivatedRoute,
        private _authService: AuthService,
        private _formBuilder: UntypedFormBuilder,
        private _rtr: Router,
        private _ts: TokenStorageService,
        
    )
    {
        this._gfs.showLog('AuthSignInComponent', 'constructor', '', null);
        this._gfs.allowCall = false;
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {
        // Create the form
        this.signInForm = this._formBuilder.group({
            email     : ['hughes.brian@company.com', [Validators.required, Validators.email]],
            password  : ['admin', Validators.required],
            rememberMe: [''],
        });
        this.signInForm2 = this._formBuilder.group({
            code     : ['', Validators.required],
        });
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Sign in
     */
    signIn(): void
    {
        this._gfs.showLog('AuthSignInComponent', 'signIn', 'signInForm:', this.signInForm.value);
        //console.log('[sign in - signIn] singInForm: ');
        //console.log(this.signInForm.value);
        
        // Return if the form is invalid
        if ( this.signInForm.invalid )
        {
            return;
        }

        // Disable the form
        this.signInForm.disable();

        // Hide the alert
        this.showAlert = false;

        // Sign in
        this._authService.signIn(this.signInForm.value).subscribe({
            next: (response: any) =>{
                this._gfs.showLog('AuthSignInComponent', 'signIn', 'Response:', response);
                                
                if(response.success){
                    console.log('[sign in - signIn] response success:');
                    console.log('SignIn Success');
                    this.showUserName = false;
                    this.showValidation = true;
                }
                else{
                    console.log('[sign in - signIn] response fail:');
                    console.log('SignIn Fail');

                    this.alert = {
                        type   : 'error',
                        message: response.message,
                    };
                    this.showAlert = true;
                }
                this.signInForm.enable();
            },
            error: (err: HttpErrorResponse) => {
                this._gfs.showLog('AuthSignInComponent', 'signIn', 'Error:', err);
                console.log('[sign in - signIn] err:');
                console.log(err);
                if(err.status == 401){
                    this._ts.signOut();
                    this._rtr.navigate(['/sign-in']);
                }                
            }
        });
        
    }

    validate(): void {
        console.log('[sign in - validate] validate: ');
        //console.log('[sign in - validate] email: ' + this.signInForm.value.email);
        //console.log('[sign in - validate] code: ' + this.signInForm2.value.code);

        // Sign in
        this._authService.validate(this.signInForm.value.email, this.signInForm2.value.code).subscribe({
            next: (response: any) =>{
                
                if(response.success){
                    console.log('[sign in - validate] response success:');
                    console.log('Validate Success / Set Sign In');
                    console.log(response);

                    this._ts.signIn(response.data.token, response.data.userInfo, null);
                    //console.log(this._authService.accessToken);

                    // Set the redirect url.
                    // The '/signed-in-redirect' is a dummy url to catch the request and redirect the user
                    // to the correct page after a successful sign in. This way, that url can be set via
                    // routing file and we don't have to touch here.
                    const redirectURL = this._activatedRoute.snapshot.queryParamMap.get('redirectURL') || '/signed-in-redirect';

                    // Navigate to the redirect url
                    this._rtr.navigateByUrl(redirectURL);
                }
                else{
                    console.log('[sign in - validate] response fail:');
                    console.log('Validate Fail');

                    this.alert = {
                        type   : 'error',
                        message: response.message,
                    };
                    this.showAlert = true;
                }
                
            },
            error: (err: HttpErrorResponse) => {
                console.log('[sign in - validate] err:');
                console.log(err);
                if(err.status == 401){
                    this._ts.signOut();
                    this._rtr.navigate(['/sign-in']);
                }
                
            }
        });
        
    }
}
