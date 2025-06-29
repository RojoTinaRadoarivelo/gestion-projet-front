import { Component, OnInit, inject } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingService } from './../../../core/services/loading.service';
import { AuthService } from '../auth.service';
import { SignUpDto } from './dto/sign-up.dto';
import { Location } from '@angular/common';
import { mustMatch } from './../../../core/utils/validators/must-match.validator';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
  userInfo: { email: string; password: string } | null = null;

  signUpForms: FormGroup = new FormGroup({
    userName: new FormControl(),
    code: new FormControl(),
    password: new FormControl(),
    confirmpassword: new FormControl(),
  });
  verifyCodeForms: FormGroup = new FormGroup({
    email: new FormControl(),
  });
  hideData = false;

  private readonly _authService = inject(AuthService);
  private readonly _router = inject(Router);
  private readonly _formBuilder = inject(FormBuilder);
  private readonly _loadingService = inject(LoadingService);

  private readonly _location = inject(Location);

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    const state = this._location.getState() as {
      userInfo?: { email: string; password: string };
    };

    if (state.userInfo) {
      this.userInfo = state.userInfo;
      this.hideData = !!this.userInfo.email;
    }
    this.verifyCodeForms = this._formBuilder.group({
      email: [this.userInfo?.email ?? '', Validators.required],
    });
    this.signUpForms = this._formBuilder.group(
      {
        // userName: ['', Validators.required],
        password: [this.userInfo?.password ?? '', Validators.required],
        confirmpassword: ['', Validators.required],
        code: [''],
      },
      {
        validator: mustMatch('password', 'confirmpassword'),
      },
    );
  }

  Save() {
    if (this.signUpForms.invalid) {
      return;
    }
    const data: SignUpDto = {
      email: this.verifyCodeForms.get('email')!.value,
      password: this.signUpForms.get('password')!.value,
      // userName: this.signUpForms.get('userName')!.value,
      code: this.signUpForms.get('code')!.value,
    };

    this._authService.signUp(data).subscribe({
      next: () => this._router.navigateByUrl('home'),
      error: (err) => console.error('Échec de la connexion :', err),
    });
  }

  VerifyEmail() {
    const email = this.verifyCodeForms.get('email')!.value;
    if (email)
      this._authService
        .sendVerificationCode(email)
        .subscribe(() => (this.hideData = !this.hideData));
  }

  GoToSignIn() {
    this.signUpForms.reset();
    this._router.navigateByUrl('auth/sign-in');
  }
}
