import { Component, OnInit } from '@angular/core';
import { Comment } from '../../../../models/comment';
import { ActivatedRoute } from '@angular/router';
import { Input, Output } from '@angular/core';
import { TasksService } from '../../../../services/tasks.service';
import { CommentsService } from '../../../../comments.service';
import { ViewChild } from '@angular/core';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-comment-form',
  templateUrl: './comment-form.component.html',
  styleUrls: ['./comment-form.component.css']
})
export class CommentFormComponent implements OnInit {
  @Input() taskId: string;
  @Output() onCloseCommentForm = new EventEmitter<boolean>(true);
  comment: Comment = new Comment('', null, '', '', 0, new Date());
  constructor(private route: ActivatedRoute, private commentsService: CommentsService) { }
  ngOnInit() {
  }

  closeCommentForm() {
    this.onCloseCommentForm.emit(true);
  }
  addComment(commentForm: any) {
    if (this.comment.content !== '') {
      this.comment.taskId = this.taskId;
      this.commentsService.addCommentToTask(this.comment);
      commentForm.reset();
    }
  }
}
