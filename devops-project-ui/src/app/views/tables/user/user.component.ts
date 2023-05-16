import { Component, OnInit } from '@angular/core';
import { SessionGuard } from 'src/app/guards/session.guard';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
  providers: [SessionGuard]
})
export class UserComponent implements OnInit {


  constructor(private sessionGuard: SessionGuard) {

  }

  ngOnInit() {

  }

  addUser() {
    console.log("Hola");
  }

}
