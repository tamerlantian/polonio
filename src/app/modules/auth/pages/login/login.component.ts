import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputComponent } from '@app/common/components/ui/form/input/input.component';
import { LabelComponent } from '@app/common/components/ui/form/label/label.component';
import { Store } from '@ngrx/store';
import { loginRequest } from '../../store/actions/login.action';
import { RouterLink } from '@angular/router';
import { AdvancedButtonComponent } from '@app/common/components/ui/advanced-button/advanced-button.component';
import { selectIsLoading } from '../../store/selectors/auth.selector';
import { AsyncPipe } from '@angular/common';
import { environment } from '@environments/environment';
import { NgxTurnstileModule } from 'ngx-turnstile';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    RouterLink,
    ReactiveFormsModule,
    InputComponent,
    LabelComponent,
    AdvancedButtonComponent,
    AsyncPipe,
    NgxTurnstileModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class LoginComponent implements OnInit {
  private store = inject(Store);

  public turnstileSiteKey: string = environment.turnstileSiteKey;
  public isProduction = environment.production;
  public isLoading$ = this.store.select(selectIsLoading);
  public turnstileToken = '';

  public formularioLogin = new FormGroup({
    username: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', [Validators.required]),
    cf_turnstile_response: new FormControl(''),
    proyecto: new FormControl('TRANSPORTE'),
  });

  ngOnInit(): void {
    if (this.isProduction) {
      this.formularioLogin.get('cf_turnstile_response')?.addValidators([Validators.required]);
    }
  }

  login() {
    this.store.dispatch(
      loginRequest({
        credentials: {
          username: this.formularioLogin.value.username,
          password: this.formularioLogin.value.password,
          cfTurnstileResponse: this.formularioLogin.value.cf_turnstile_response,
          proyecto: this.formularioLogin.value.proyecto,
        },
      })
    );
  }

  onTurnstileSuccess(token: string): void {
    this.turnstileToken = token;
    this.formularioLogin.get('cf_turnstile_response')?.setValue(token);
  }
}
