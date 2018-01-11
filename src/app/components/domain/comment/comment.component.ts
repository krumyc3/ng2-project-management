import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';
import { Comment } from '../../../models/comment';
import { TasksService } from '../../../services/tasks.service';
import { CommentsService } from '../../../comments.service';
import { NotificationsService } from 'angular2-notifications';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {
  @Input() comment: Comment;
  isReplyActive: boolean;
  replyText: string;
  isDeleteCommentModalActive: boolean;
  constructor(
    private notifications: NotificationsService,
    private commentService: CommentsService) { }

  ngOnInit() {
    this.isReplyActive = false;
    this.isDeleteCommentModalActive = false;
  }
  toggleReplyForm() {
    this.isReplyActive = !this.isReplyActive;
  }

  submitReply() {
    this.notifications.bare('Reply', this.replyText);
    this.isReplyActive = false;
  }
  likeComment() {
    this.commentService.likeComment(this.comment.id, this.comment.likes);
  }

  deleteComment() {
    this.commentService.deleteComment(this.comment.id);
  }
}
