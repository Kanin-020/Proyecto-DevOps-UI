import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SessionGuard } from 'src/app/guards/session.guard';
import { UserService } from 'src/app/services/user/user.service';
import { SharedDataService } from 'src/app/services/shared/sharedData.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [SessionGuard]
})
export class LoginComponent implements OnInit {

  userData: any = {};
  formItem!: FormGroup;

  constructor(private router: Router, private userService: UserService, private sessionGuard: SessionGuard, private sharedDataService: SharedDataService) { }

  ngOnInit() {
    this.formItem = new FormGroup({
      username: new FormControl(this.userData.username, Validators.required),
      password: new FormControl(this.userData.password, Validators.required),
    });
  }

  login() {
    const { username, password } = this.userData;
    this.userService.login(username, password).subscribe(
      (response: any) => {
        this.sharedDataService.setToken(response.token);
        localStorage.setItem('token', response.token);
        this.router.navigate(['/menu']);
      }
    );
  }


}
