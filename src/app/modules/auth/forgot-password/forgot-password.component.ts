import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingService } from 'src/app/core/services/loading.service';
import { AuthService } from '../auth.service';
import { Location } from '@angular/common';
import { mustMatch } from 'src/app/core/utils/validators/must-match.validator';
import { ForgotPasswordDto } from './dto/forgot-pwd.dto';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent implements OnInit {
  email: string | null = null;

  forgotPwdForms: FormGroup = new FormGroup({
    code: new FormControl(),
    password: new FormControl(),
    confirmpassword: new FormControl(),
  });

  verifyCodeForms: FormGroup = new FormGroup({
    email: new FormControl(),
  });

  hideData: boolean = false;

  constructor(
    private readonly _authService: AuthService,
    private readonly _formBuilder: FormBuilder,

    private readonly _loadingService: LoadingService,
    private readonly _router: Router,
    private location: Location
  ) {}
  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    const state = this.location.getState() as {
      email: string;
    };

    if (state.email) {
      this.email = state.email;
      this.hideData = !!this.email;
    }
    this.verifyCodeForms = this._formBuilder.group({
      email: [this.email ?? '', Validators.required],
    });
    this.forgotPwdForms = this._formBuilder.group(
      {
        // userName: ['', Validators.required],
        password: ['', Validators.required],
        confirmpassword: ['', Validators.required],
        code: [''],
      },
      {
        validator: mustMatch('password', 'confirmpassword'),
      }
    );
  }

  Save() {
    if (this.forgotPwdForms.invalid) {
      return;
    }
    const data: ForgotPasswordDto = {
      email: this.verifyCodeForms.get('email')!.value,
      password: this.forgotPwdForms.get('password')!.value,
      code: this.forgotPwdForms.get('code')!.value,
    };

    this._authService.resetPassword(data).subscribe({
      next: () => this.GoToSignIn(),
      error: (err) => console.error('Échec de la connexion :', err),
    });
  }

  VerifyEmail() {
    const email = this.verifyCodeForms.get('email')!.value;
    if (!!email)
      this._authService
        .sendVerificationCode(email)
        .subscribe((response) => (this.hideData = !this.hideData));
  }

  GoToSignIn() {
    this.forgotPwdForms.reset();
    this._router.navigateByUrl('auth/sign-in');
  }
}
