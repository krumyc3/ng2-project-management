import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgRedux, select } from '@angular-redux/store';
import { InitialAppState } from '../../../store/initialState';
import { ProjectService } from '../../../services/project.service';
import { Project } from '../../../models/project';
import { Subscription } from 'rxjs/Subscription';
import { Observable, Subscribable } from 'rxjs/Observable';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';
import { Task } from '../../../models/task';

@Component({
  selector: 'app-single-project-view',
  templateUrl: './single-project-view.component.html',
  styleUrls: ['./single-project-view.component.css']
})
export class SingleProjectViewComponent implements OnInit, OnDestroy {
  private currentProjectId: string;
  private subscription: any;
  private projectsSubscription: any;
  private tasksSubscription: any;
  @Input() tasks: Task[];
  @Input() project: Project;
  constructor(private route: ActivatedRoute, private store: NgRedux<InitialAppState>, private projectService: ProjectService) { }

  ngOnInit() {
    this.subscription = this.route.params.subscribe(params => {
      this.currentProjectId = params.id;
      this.getProjectDetails(params.id);
    });
    this.projectsSubscription = this.store.select('projectsList').subscribe((projectList: Project[]) => {
     const foundProject = projectList.find(project => project.id === this.currentProjectId);
     this.project = foundProject;
   });

    this.tasksSubscription = this.store.select('tasksList').subscribe((tasksList: any) => {
      const projectTasks = tasksList.find(singleTask => singleTask.projectId === this.currentProjectId);
      if (projectTasks) {
        this.tasks = projectTasks.projectTasks;
      }
    });
  }
  getProjectDetails(projectId: String) {
    // this.projectService.listenForTaskChanges(projectId);
  }

  ngOnDestroy() {
    // this.projectService.deactiveTaskListener(this.currentProjectId);
    this.subscription.unsubscribe();
    this.projectsSubscription.unsubscribe();
  }

}
