import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';
import { ProjectService } from '../../../services/project.service';
import { NgRedux } from '@angular-redux/store/lib/src/components/ng-redux';
import { InitialAppState } from '../../../store/initialState';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';
import { Subscribable, Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-comments-list',
  templateUrl: './comments-list.component.html',
  styleUrls: ['./comments-list.component.css']
})
export class CommentsListComponent implements OnInit {
  @Input() taskId: String;
  @Input() comments: any[];
  constructor(
  ) {
  }
  ngOnInit() {
  }
}
