import { Component, OnInit } from '@angular/core';
import { Comment } from '../../../../models/comment';
import { ActivatedRoute } from '@angular/router';
import { Input } from '@angular/core';
import { TasksService } from '../../../../services/tasks.service';
import { CommentsService } from '../../../../comments.service';
import { ViewChild } from '@angular/core';

@Component({
  selector: 'app-comment-form',
  templateUrl: './comment-form.component.html',
  styleUrls: ['./comment-form.component.css']
})
export class CommentFormComponent implements OnInit {
  @Input() taskId: string;
  private comment: Comment = new Comment('', null, '', '', 0, new Date());
  constructor(private route: ActivatedRoute, private commentsService: CommentsService) { }
  ngOnInit() {
  }

  addComment(commentForm: any) {
    this.comment.taskId = this.taskId;
    this.commentsService.addCommentToTask(this.comment);
    commentForm.reset();
  }
}
