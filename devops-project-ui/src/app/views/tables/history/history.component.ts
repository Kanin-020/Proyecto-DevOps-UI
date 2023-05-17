import { Component, OnInit } from '@angular/core';
import { SessionGuard } from 'src/app/guards/session.guard';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css'],
  providers: [SessionGuard]
})
export class HistoryComponent implements OnInit {

  constructor(private sessionGuard: SessionGuard) { }

  ngOnInit() {
  }

}
