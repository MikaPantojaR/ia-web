import {Component, OnInit} from '@angular/core';
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatError, MatFormField, MatLabel, MatSuffix} from "@angular/material/form-field";
import {MatIcon} from "@angular/material/icon";
import {MatInput} from "@angular/material/input";
import {NgIf} from "@angular/common";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {RegistryConstants} from "../shared/constants/registry.constants";
import {MatRadioButton, MatRadioGroup} from "@angular/material/radio";

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
        MatRadioGroup
    ],
  templateUrl: './registry.component.html',
  styleUrl: './registry.component.scss'
})
export class RegistryComponent implements OnInit {

    registryForm!: FormGroup;
    registryConstants = RegistryConstants;
    hidePassword: boolean = true;

    constructor(private formBuilder: FormBuilder) {
    }

    onSubmit(): void {
        if (this.registryForm.valid) {
            console.log(this.registryForm);
        }
    }

    ngOnInit(): void {
        this.registryForm = this.formBuilder.group({
            name: ['', [Validators.required, Validators.minLength(5)]],
            username: ['', [Validators.required, Validators.minLength(4)]],
            password: ['', [Validators.required, Validators.minLength(4)]],
            rol: ['', [Validators.required]],
        })
    }
}
