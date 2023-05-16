import { Component, OnInit } from '@angular/core';
import { SessionGuard } from 'src/app/guards/session.guard';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css'],
  providers: [SessionGuard]
})
export class TaskComponent implements OnInit {

  constructor(private sessionGuard: SessionGuard) { }

  ngOnInit() {
  }

}
