import { Component, OnInit } from '@angular/core';
import { Comment } from '../../../../models/comment';
import { ActivatedRoute } from '@angular/router';
import { Input } from '@angular/core';
import { TasksService } from '../../../../services/tasks.service';

@Component({
  selector: 'app-comment-form',
  templateUrl: './comment-form.component.html',
  styleUrls: ['./comment-form.component.css']
})
export class CommentFormComponent implements OnInit {
  @Input() taskId: string;
  private comment: Comment = new Comment(null, '', '', 0);
  constructor(private route: ActivatedRoute, private taskService: TasksService) { }
  ngOnInit() {
  }

  addComment() {
    this.comment.taskId = this.taskId;
    this.taskService.addCommentToTask(this.comment, this.comment.taskId);
  }
}
