import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { SessionGuard } from 'src/app/guards/session.guard';
import { UserService } from 'src/app/services/user/user.service';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
  providers: [SessionGuard]
})
export class UserComponent implements OnInit {

  editingElement: any = { id: 1, username: 'default', email: 'default', password: 'default' };
  userData: any = {};
  userArray: any = [];
  formItem!: FormGroup;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.getUserList();
    this.formItem = new FormGroup({
      username: new FormControl(this.userData.username),
      email: new FormControl(this.userData.email),
      password: new FormControl(this.userData.password),
    });
  }

  async getUserList() {

    this.userService.getUserList().subscribe(
      (response: any) => {

        this.userArray = response;

        return response;
      },
    );
  }

  async editUser() {

    const id = this.editingElement.id;

    var { username, email, password } = this.userData;

    if (!username || !email || !password) {
      username = this.editingElement.username;
      email = this.editingElement.email;
      password = this.editingElement.password;
    }

    this.userService.updateUserInfo(id, username, email, password).subscribe(
      (response: any) => {
        console.log(response);
        return response;
      }
    );

    this.closePopup();
  }

  async deleteUser(id: string) {

    const userId: string = id;

    this.userService.deleteUser(userId).subscribe(
      (response: any) => {
        return response;
      }
    );

  }

  openPopup(editingElement: any) {

    const popup: HTMLElement | null = document.querySelector(".popup");

    if (popup) {
      popup.style.display = "block";
      this.editingElement = editingElement;
    }

  }

  closePopup() {
    const popup: HTMLElement | null = document.querySelector(".popup");

    if (popup) {
      popup.style.display = "none";
    }
  }

}
