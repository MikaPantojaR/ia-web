import {Component, OnDestroy, OnInit} from '@angular/core';
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatError, MatFormField, MatLabel, MatSuffix} from "@angular/material/form-field";
import {MatIcon} from "@angular/material/icon";
import {MatInput} from "@angular/material/input";
import {NgIf} from "@angular/common";
import {
    FormBuilder,
    FormGroup,
    ReactiveFormsModule,
    Validators,
    ɵFormGroupValue,
    ɵTypedOrUntyped
} from "@angular/forms";
import {RegistryConstants} from "../shared/constants/registry.constants";
import {MatRadioButton, MatRadioGroup} from "@angular/material/radio";
import {Router} from "@angular/router";
import {MatCheckbox} from "@angular/material/checkbox";
import {HttpClient} from "@angular/common/http";
import {Observable, Subscription} from "rxjs";

@Component({
  selector: 'app-registry',
  standalone: true,
    imports: [
        MatButton,
        MatError,
        MatFormField,
        MatIcon,
        MatIconButton,
        MatInput,
        MatLabel,
        MatSuffix,
        NgIf,
        ReactiveFormsModule,
        MatRadioButton,
        MatRadioGroup,
        MatCheckbox
    ],
  templateUrl: './registry.component.html',
  styleUrl: './registry.component.scss'
})
export class RegistryComponent implements OnInit, OnDestroy {

    registryForm!: FormGroup;
    registryConstants = RegistryConstants;
    hidePassword: boolean = true;

    private apiUrl = 'http://127.0.0.1:8000/api/v1/users/';
    private suscripcion: Subscription;

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private http: HttpClient) {
        this.suscripcion = new Subscription();
    }

    onSubmit(): void {
        if (this.registryForm.valid) {
            this.suscripcion = this.authenticate(this.registryForm.value).subscribe(
            response => {
                alert("Usuario creado exitosamente");
                sessionStorage.setItem("usuario", JSON.stringify(this.registryForm.value))
                if(this.registryForm.value.rol === 'administrador') {
                    this.router.navigate(["/admin"]);
                } else {
                    this.router.navigate(["/admin/historial"])
                }
            },
            error => {
                alert('Error de creacion: ' + error);
            })
        }
    }

    ngOnInit(): void {
        this.registryForm = this.formBuilder.group({
            nombre: ['', [Validators.required, Validators.minLength(5)]],
            email: ['', [Validators.required, Validators.minLength(4)]],
            password: ['', [Validators.required, Validators.minLength(4)]],
            rol: ['', [Validators.required]],
            diabetes: [false, [Validators.required]]
        })
    }

    goToLogin() {
        this.router.navigate(["/login"]);
    }

    authenticate(value: any): Observable<any> {
        return this.http.post<any>(this.apiUrl, value);
    }

    ngOnDestroy(): void {
        this.suscripcion.unsubscribe();
    }
}
