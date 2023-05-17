import { Component, OnInit } from '@angular/core';
import { SessionGuard } from 'src/app/guards/session.guard';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css'],
  providers: [SessionGuard]
})
export class CommentComponent implements OnInit {

  constructor(private sessionGuard: SessionGuard) { }

  ngOnInit() {
  }

}
