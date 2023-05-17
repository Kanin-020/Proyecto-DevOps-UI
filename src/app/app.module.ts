import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { UserComponent } from './views/tables/user/user.component';
import { HistoryComponent } from './views/tables/history/history.component';
import { ProjectComponent } from './views/tables/project/project.component';
import { TaskComponent } from './views/tables/task/task.component';
import { CommentComponent } from './views/tables/comment/comment.component';
import { MenuComponent } from './views/menu/menu.component';
import { LoginComponent } from './views/login/login.component';
import { RegisterComponent } from './views/register/register.component';
import { SessionGuard } from './guards/session.guard';


@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    HistoryComponent,
    ProjectComponent,
    TaskComponent,
    CommentComponent,
    MenuComponent,
    LoginComponent,
    RegisterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [SessionGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
