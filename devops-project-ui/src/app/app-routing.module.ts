import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './views/login/login.component';
import { RegisterComponent } from './views/register/register.component';
import { MenuComponent } from './views/menu/menu.component';
import { CommentComponent } from './views/tables/comment/comment.component';
import { UserComponent } from './views/tables/user/user.component';
import { TaskComponent } from './views/tables/task/task.component';
import { ProjectComponent } from './views/tables/project/project.component';
import { HistoryComponent } from './views/tables/history/history.component';


const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'menu', component: MenuComponent },
    { path: 'user', component: UserComponent },
    { path: 'comment', component: CommentComponent },
    { path: 'task', component: TaskComponent },
    { path: 'project', component: ProjectComponent },
    { path: 'history', component: HistoryComponent },
    { path: '**', redirectTo: '/login', pathMatch: 'full' }, // Ruta por defecto para manejar rutas no encontradas
];


@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
