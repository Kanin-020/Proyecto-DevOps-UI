import { Component, OnInit } from '@angular/core';
import { SessionGuard } from 'src/app/guards/session.guard';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
  providers: [SessionGuard]
})
export class MenuComponent implements OnInit {

  constructor(private sessionGuard: SessionGuard) { }

  ngOnInit() {
  }

}
