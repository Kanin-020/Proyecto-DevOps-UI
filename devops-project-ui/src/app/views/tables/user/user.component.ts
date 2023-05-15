import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {


  constructor() {

  }

  ngOnInit() {

  }

  openPopup() {
    const popup: HTMLElement | null = document.querySelector(".popup");

    if (popup) {
      popup.style.display = "block"; 
    }
  }

  closePopup() {
    const popup: HTMLElement | null = document.querySelector(".popup");

    if (popup) {
      popup.style.display = "none";
    }
  }

}
