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
  // private tokenService = inject(TokenService)
  // private authService = inject(AuthService);
  // private _router = inject(Router);
  // turnstileToken: string = '';
  // turnstileSiteKey: string = environment.turnstileSiteKey;
  // public isLoading$ = new BehaviorSubject<boolean>(false);
  // isProduction: boolean = environment.production;
  // formularioLogin = new FormGroup({
  //   cf_turnstile_response: new FormControl(''),
  //   proyecto: new FormControl('RUTEO'),
  //   username: new FormControl('', [Validators.email, Validators.required]),
  //   password: new FormControl(
  //     '',
  //     Validators.compose([
  //       Validators.required,
  //       Validators.minLength(8),
  //       Validators.maxLength(20),
  //     ])
  //   ),
  // });
  // ngOnInit(): void {
  //   if (this.isProduction) {
  //     this.formularioLogin
  //       .get('cf_turnstile_response')
  //       ?.addValidators([Validators.required]);
  //   }
  // }
  // onTurnstileSuccess(token: string): void {
  //   this.turnstileToken = token;
  //   this.formularioLogin.get('cf_turnstile_response')?.setValue(token);
  //   this.changeDetectorRef.detectChanges();
  // }
  // enviar() {
  //   if (this.formularioLogin.invalid) {
  //     this.formularioLogin.markAllAsTouched();
  //     this.formularioLogin.markAsDirty();
  //     return;
  //   }
  //   this.isLoading$.next(true);
  //   this.authService
  //     .login(this.formularioLogin.value)
  //     .pipe(
  //       catchError(() => {
  //         return of(null);
  //       }),
  //       finalize(() => this.isLoading$.next(false))
  //     )
  //     .subscribe((resultado: RespuestaLogin) => {
  //       if (resultado.token) {
  //         let calcularTiempo = new Date(
  //           new Date().getTime() + environment.sessionLifeTime * 60 * 60 * 1000
  //         );
  //         this.store.dispatch(
  //           usuarioIniciar({
  //             usuario: resultado.user,
  //           })
  //         );
  //         this.tokenService.guardar(resultado.token, calcularTiempo);
  //         this._router.navigate(['contenedor']);
  //       }
  //     });
  // }
  // get username() {
  //   return this.formularioLogin.get('username');
  // }
  // get password() {
  //   return this.formularioLogin.get('password');
  // }
}
