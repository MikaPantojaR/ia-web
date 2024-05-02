import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatButton, MatIconButton } from "@angular/material/button";
import { MatError, MatFormField, MatFormFieldModule, MatLabel, MatSuffix } from "@angular/material/form-field";
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatIcon } from "@angular/material/icon";
import { MatInput, MatInputModule } from "@angular/material/input";
import { MatDatepickerModule } from '@angular/material/datepicker';
import { NgIf } from "@angular/common";
import {
    FormBuilder,
    FormGroup,
    ReactiveFormsModule,
    Validators,
    ɵFormGroupValue,
    ɵTypedOrUntyped
} from "@angular/forms";
import { RegistryConstants } from "../../shared/constants/registry.constants";
import { MatRadioButton, MatRadioGroup } from "@angular/material/radio";
import { Router } from "@angular/router";
import { MatCheckbox } from "@angular/material/checkbox";
import { HttpClient } from "@angular/common/http";
import { Observable, Subscription } from "rxjs";

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
        MatCheckbox,
        MatFormFieldModule,
        MatInputModule,
        MatDatepickerModule
    ],
    providers: [provideNativeDateAdapter()],
    templateUrl: './registry.component.html',
    styleUrl: './registry.component.scss'
})
export class RegistryComponent implements OnInit, OnDestroy {

    registryForm!: FormGroup;
    registryConstants = RegistryConstants;
    hidePassword: boolean = true;

    private suscripcion: Subscription;

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private http: HttpClient) {
        this.suscripcion = new Subscription();
    }

    onSubmit(): void {
        console.log(this.registryForm.value);
        console.log(this.registryForm);
        if (this.registryForm.valid) {
            this.suscripcion = this.registrar(this.registryForm.value).subscribe(
                response => {
                    alert("Usuario creado exitosamente");
                    this.registryForm.reset();
                    this.registryForm.markAsUntouched();
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
            diabetes: [false],
            fecha_nacimiento: ['', [Validators.required]]
        })
    }

    registrar(value: any): Observable<any> {
        return this.http.post<any>('http://127.0.0.1:8000/api/v1/users/', value);
    }

    ngOnDestroy(): void {
        this.suscripcion.unsubscribe();
    }
}
