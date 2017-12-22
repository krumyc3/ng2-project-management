import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';
import { Comment } from '../../../models/comment';
import { TasksService } from '../../../services/tasks.service';
import { CommentsService } from '../../../comments.service';

@Component({

  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {
  @Input() comment: Comment;
  constructor(private commentService: CommentsService) { }

  ngOnInit() {
  }

  likeComment() {
    this.commentService.likeComment(this.comment.id, this.comment.likes);
  }

}
