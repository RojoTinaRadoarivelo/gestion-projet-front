import { Component, OnInit } from '@angular/core';
import { SignInDto } from './dto/sign-in.dto';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingService } from 'src/app/core/services/loading.service';
import { AuthService } from '../auth.service';

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

  handleLoading(event: boolean) {
    if (event) {
      this._loadingService.show();
    } else {
      this._loadingService.hide();
    }
  }
}
