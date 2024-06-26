import {Routes} from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {RegistryComponent} from "./admin/registry/registry.component";
import {AdminComponent} from "./admin/admin.component";
import {UsersComponent} from "./admin/users/users.component";
import {HistoryComponent} from "./admin/history/history.component";
import {DiagnosticComponent} from "./admin/diagnostic/diagnostic.component";
import { UserGuideComponent } from './admin/user-guide/user-guide.component';
import { ManualEditorComponent } from './admin/manual-editor/manual-editor.component';

export const routes: Routes = [
    {path: '', redirectTo: '/login', pathMatch: 'full'},
    {path: 'login', component: LoginComponent},
    {path: 'registro', component: RegistryComponent},
    {
        path: 'admin', component: AdminComponent, children: [
            { path: '', redirectTo: 'users', pathMatch: 'full' },
            { path: 'users', component: UsersComponent },
            { path: 'diagnostico', component: DiagnosticComponent },
            { path: 'historial', component: HistoryComponent },
            { path: 'registro', component: RegistryComponent },
            { path: 'manual', component: UserGuideComponent },
            { path: 'editor', component: ManualEditorComponent }
        ]
    },
];
