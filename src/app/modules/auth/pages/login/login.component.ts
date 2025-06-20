import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputComponent } from '@app/common/components/ui/form/input/input.component';
import { LabelComponent } from '@app/common/components/ui/form/label/label.component';
import { Store } from '@ngrx/store';
import { loginRequest } from '../../store/actions/login.action';
import { RouterLink } from '@angular/router';
import { AdvancedButtonComponent } from '@app/common/components/ui/advanced-button/advanced-button.component';
import { selectIsLoading } from '../../store/selectors/auth.selector';
import { AsyncPipe } from '@angular/common';

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
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class LoginComponent {
  private store = inject(Store);
  public isLoading$ = this.store.select(selectIsLoading);

  public formularioLogin = new FormGroup({
    username: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  login() {
    this.store.dispatch(
      loginRequest({
        credentials: {
          username: this.formularioLogin.value.username,
          password: this.formularioLogin.value.password,
        },
      })
    );
  }
}
