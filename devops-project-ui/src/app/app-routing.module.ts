import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserComponent } from './views/user/user.component';
import { LoginComponent } from './views/login/login.component';
import { RegisterComponent } from './views/register/register.component';
import { CommentComponent } from './views/comment/comment.component';
import { TaskComponent } from './views/task/task.component';
import { ProjectComponent } from './views/project/project.component';
import { HistoryComponent } from './views/history/history.component';


const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
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
