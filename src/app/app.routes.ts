import {Routes} from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {RegistryComponent} from "./registry/registry.component";
import {AdminComponent} from "./admin/admin.component";
import {UsersComponent} from "./admin/users/users.component";
import {EventsComponent} from "./admin/events/events.component";
import {EventTypesComponent} from "./admin/event-types/event-types.component";

export const routes: Routes = [
    {path: '', redirectTo: '/login', pathMatch: 'full'},
    {path: 'login', component: LoginComponent},
    {path: 'registro', component: RegistryComponent},
    {
        path: 'admin', component: AdminComponent, children: [
            { path: '', redirectTo: 'users', pathMatch: 'full' },
            { path: 'users', component: UsersComponent },
            { path: 'events', component: EventsComponent },
            { path: 'event-types', component: EventTypesComponent }
        ]
    },
];
