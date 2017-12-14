import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';
import { Comment } from '../../../models/comment';
import { TasksService } from '../../../services/tasks.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {
  @Input() comment: Comment;
  constructor(private tasksService: TasksService) { }

  ngOnInit() {
  }

  likeComment() {
    this.tasksService.likeComment(this.comment.id, this.comment.likes);
  }

}
