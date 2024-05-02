import {Component, OnDestroy, OnInit} from '@angular/core';
import {MatCardModule} from "@angular/material/card";
import {MatFormFieldModule} from "@angular/material/form-field";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {LoginConstants} from "../shared/constants/login.constants";
import {LoginRequest} from "./models/login-request.model";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatIconModule} from "@angular/material/icon";
import {CommonModule} from "@angular/common";
import {MatButtonModule} from "@angular/material/button";
import {Router} from "@angular/router";
import {Observable, Subscription} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [
        MatFormFieldModule,
        MatCardModule,
        MatInputModule,
        MatButtonModule,
        MatCheckboxModule,
        MatIconModule,
        ReactiveFormsModule,
        CommonModule
    ],
    templateUrl: './login.component.html',
    styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit, OnDestroy {
    loginForm!: FormGroup;
    loginConstants = LoginConstants;
    hidePassword: boolean = true;
    private suscripcion: Subscription;

    private apiUrl = "http://127.0.0.1:8000/api/v1/validate-credentials/";

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private http: HttpClient) {
        this.suscripcion = new Subscription();
    }

    onSubmit(): void {
        if (this.loginForm.valid) {
            this.suscripcion = this.authenticate(this.loginForm.value).subscribe(
                response => {
                    sessionStorage.setItem("usuario", JSON.stringify(response))
                    if(response.rol === 'administrador') {
                        this.router.navigate(["/admin/diagnostico"]);
                    } else if (response.rol === 'servicio') {
                        this.router.navigate(["/admin/users"]);
                    } else {
                        this.router.navigate(["/admin/historial"]);
                    }
                },
                error => {
                    console.log(error)
                    alert('Error de login: ' + error.error.mensaje);
                })
        }
    }

    ngOnInit(): void {
        this.loginForm = this.formBuilder.group({
            email: ['', [Validators.required, Validators.minLength(4)]],
            password: ['', [Validators.required, Validators.minLength(4)]]
        })
    }

    authenticate(value: any): Observable<any> {
        const body = new URLSearchParams();
        body.set('email', value.email);
        body.set('password', value.password);

        const headers = new HttpHeaders({
            'Content-Type': 'application/x-www-form-urlencoded'
        });

        return this.http.post<any>(this.apiUrl, body.toString(), {headers});
    }

    ngOnDestroy(): void {
        this.suscripcion.unsubscribe();
    }
}
