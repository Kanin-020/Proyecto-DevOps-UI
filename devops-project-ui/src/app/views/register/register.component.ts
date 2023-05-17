import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  userData: any = {};
  formItem!: FormGroup;

  constructor(private router: Router, private userService: UserService) { }

  ngOnInit() {
    this.formItem = new FormGroup({
      username: new FormControl(this.userData.username, Validators.required),
      email: new FormControl(this.userData.email, Validators.required),
      password: new FormControl(this.userData.password, Validators.required),
      passwordConfirmation: new FormControl(this.userData.passwordConfirmation, Validators.required),
    });
  }

  userRegister() {
    const { username, email, password, passwordConfirmation } = this.userData;

    if (password == passwordConfirmation) {
      this.userService.registerUser(username, email, password).subscribe();
      this.router.navigate(['/login']);
    } else {
      alert("Las contraseñas no coinciden");
    }
  }

}
