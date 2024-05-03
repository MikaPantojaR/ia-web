import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Subscription } from "rxjs";
import { MatTableModule } from "@angular/material/table";
import { UserElement } from "./user-element";
import { MatDialog } from '@angular/material/dialog';
import { UpdateUserComponent } from '../update-user/update-user.component';

@Component({
    selector: 'app-users',
    standalone: true,
    imports: [MatTableModule],
    templateUrl: './users.component.html',
    styleUrl: './users.component.scss'
})

export class UsersComponent implements OnInit, OnDestroy {
    displayedColumns: string[] = ['id', 'nombre', 'email', 'rol', 'diabetes', 'eliminar'];
    apiUrl = 'http://127.0.0.1:8000/api/v1/users';
    suscripcion: Subscription;
    suscripcionEliminar: Subscription;
    tableData: UserElement[] = [];

    constructor(private http: HttpClient, public dialog: MatDialog) {
        this.suscripcion = new Subscription();
        this.suscripcionEliminar = new Subscription();
    }

    ngOnInit(): void {
        this.suscripcion = this.getTableData().subscribe(response => {
            this.tableData = response;
        },
            error => {
                alert('Error' + error);
            })
    }

    getTableData() {
        return this.http.get<any>(this.apiUrl);
    }

    ngOnDestroy(): void {
        this.suscripcion.unsubscribe();
    }

    eliminar(id: any) {
        this.suscripcionEliminar = this.doEliminar(id).subscribe(response => {
            let newArray = this.tableData.filter(user => user.id !== id);
            this.tableData = newArray;
        },
            error => {
                alert('Error' + error);
            });
    }

    actualizar(user: any) {
        const dialogRef = this.dialog.open(UpdateUserComponent, {
            data: user,
        });
        dialogRef.afterClosed().subscribe(result => {
            this.suscripcion = this.getTableData().subscribe(response => {
                this.tableData = response;
            },
                error => {
                    alert('Error' + error);
                })
            console.log('The dialog was closed');
        });
    }

    doEliminar(id: any) {
        return this.http.delete<any>(this.apiUrl + '/' + id);
    }
}
