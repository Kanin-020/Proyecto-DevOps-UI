import { Component, OnInit } from '@angular/core';
import { SessionGuard } from 'src/app/guards/session.guard';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css'],
  providers: [SessionGuard]
})
export class ProjectComponent implements OnInit {

  constructor(private sessionGuard: SessionGuard) { }

  ngOnInit() {
  }

}
