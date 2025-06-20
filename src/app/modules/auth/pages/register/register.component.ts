import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputComponent } from '../../../../common/components/ui/form/input/input.component';
import { AuthRepository } from '../../repositories/auth.repository';
import { AdvancedButtonComponent } from '../../../../common/components/ui/advanced-button/advanced-button.component';
import { finalize } from 'rxjs';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, InputComponent, AdvancedButtonComponent, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class RegisterComponent {
  private authService = inject(AuthRepository);

  public registrando = signal<boolean>(false);
  public formularioRegister = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    confirmarContrasena: new FormControl('', Validators.required),
    terminoCondicion: new FormControl(false, Validators.required),
  });

  register() {
    this.registrando.set(true);
    this.authService
      .register({
        username: this.formularioRegister.get('username')?.value,
        password: this.formularioRegister.get('password')?.value,
        confirmarContrasena: this.formularioRegister.get('confirmarContrasena')?.value,
        terminoCondicion: this.formularioRegister.get('terminoCondicion')?.value,
      })
      .pipe(finalize(() => this.registrando.set(false)))
      .subscribe(res => {
        console.log(res);
      });
  }
  // private _router = inject(Router);
  // public registrando$ = new BehaviorSubject<boolean>(false);
  // turnstileToken: string = '';
  // turnstileSiteKey: string = environment.turnstileSiteKey;
  // isProduction: boolean = environment.production;
  // public isLoading$ = new BehaviorSubject<boolean>(false);
  // formulario = new FormGroup({
  //   turnstileToken: new FormControl(''),
  //   username: new FormControl('', Validators.required),
  //   password: new FormControl(
  //     '',
  //     Validators.compose([
  //       Validators.required,
  //       Validators.minLength(8),
  //       Validators.maxLength(20),
  //     ])
  //   ),
  //   confirmarContrasena: new FormControl('', [
  //     Validators.required,
  //     this.validarContrasena(),
  //   ]),
  //   terminoCondicion: new FormControl(
  //     '',
  //     Validators.compose([Validators.requiredTrue])
  //   ),
  // });
  // ngOnInit(): void {
  //   if (this.isProduction) {
  //     this.formulario
  //       .get('cf_turnstile_response')
  //       ?.addValidators([Validators.required]);
  //   }
  // }
  // validarContrasena(): ValidatorFn {
  //   return (control: AbstractControl): ValidationErrors | null => {
  //     const clave = control.root.get('password')?.value;
  //     const confirmarClave = control.value;
  //     return clave === confirmarClave ? null : { clavesDiferentes: true };
  //   };
  // }
  // onTurnstileSuccess(token: string): void {
  //   this.turnstileToken = token;
  //   this.formulario.get('turnstileToken')?.setValue(token);
  //   this.changeDetectorRef.detectChanges();
  // }
  // enviar() {
  //   this.registrando$.next(true);
  //   this.authService
  //     .registro(this.formulario.value)
  //     .pipe(finalize(() => this.registrando$.next(false)))
  //     .subscribe((resultado: RespuestaRegistro) => {
  //       if (resultado.usuario.id) {
  //         this.alerta.mensajaExitoso('Se ha creado el usuario exitosamente.');
  //         this._router.navigate(['auth/login']);
  //       }
  //     });
  // }
}
