import { Component, OnInit } from '@angular/core';
import { SignInDto } from './dto/sign-in.dto';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingService } from './../../../core/services/loading.service';
import { AuthService } from '../auth.service';
import { UserService } from './../../../core/user/user.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent implements OnInit {
  signInForms: FormGroup = new FormGroup({
    email: new FormControl(),
    password: new FormControl(),
  });

  constructor(
    private readonly _authService: AuthService,
    private readonly _formBuilder: FormBuilder,
    private readonly _userService: UserService,
    private readonly _loadingService: LoadingService,
    private readonly _router: Router
  ) {}
  ngOnInit(): void {
    this.signInForms = this._formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  signIn() {
    if (this.signInForms.invalid) {
      return;
    }
    const data: SignInDto = {
      email: this.signInForms.get('email')!.value,
      password: this.signInForms.get('password')!.value,
    };

    this._authService.signIn(data).subscribe({
      next: () => this._router.navigateByUrl('home'),
      error: (err) => console.error('Échec de la connexion :', err),
    });
  }

  signUp() {
    const email = this.signInForms.get('email')!.value;
    if (!!email) this._authService.sendVerificationCode(email).subscribe();
    this._router.navigate(['/auth/sign-up'], {
      state: { userInfo: this.signInForms.value },
    });

    this.signInForms.reset();
  }

  forgotPassword() {
    const email = this.signInForms.get('email')!.value;
    if (!!email) {
      this._userService.searchUserByEmail(email).subscribe((response) => {
        this._authService.sendVerificationCode(email).subscribe();
        this._router.navigate(['/auth/forgot-password'], {
          state: { email },
        });

        this.signInForms.reset();
      });
    } else {
      this._router.navigate(['/auth/forgot-password']);
    }
  }

  handleLoading(event: boolean) {
    if (event) {
      this._loadingService.show();
    } else {
      this._loadingService.hide();
    }
  }
}
