import {Routes} from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {RegistryComponent} from "./registry/registry.component";
import {AdminComponent} from "./admin/admin.component";
import {UsersComponent} from "./admin/users/users.component";
import {HistoryComponent} from "./admin/history/history.component";
import {DiagnosticComponent} from "./admin/diagnostic/diagnostic.component";

export const routes: Routes = [
    {path: '', redirectTo: '/login', pathMatch: 'full'},
    {path: 'login', component: LoginComponent},
    {path: 'registro', component: RegistryComponent},
    {
        path: 'admin', component: AdminComponent, children: [
            { path: '', redirectTo: 'users', pathMatch: 'full' },
            { path: 'users', component: UsersComponent },
            { path: 'diagnostico', component: DiagnosticComponent },
            { path: 'historial', component: HistoryComponent }
        ]
    },
];
