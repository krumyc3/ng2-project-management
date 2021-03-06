import { Component, OnInit, Input } from '@angular/core';
import { Project } from '../../../models/project';
import { Task } from '../../../models/task';
import { InitialAppState } from '../../../store/initialState';
import { NgRedux } from '@angular-redux/store';
import { ModalsActions, ModalTypes } from '../../../store/actions/modals.actions';
import { EditingActions } from '../../../store/actions/editing.actions';
import { ProjectService } from '../../../services/project.service';
import { NotificationsService } from 'angular2-notifications';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {
  @Input() project: Project;
  @Input() tasks: Task[];
  @Input() onlyDescription: Boolean = true;
  isDeleteProjectModalActive: Boolean = false;
  constructor(
    private projectService: ProjectService,
    private store: NgRedux<InitialAppState>,
    private modalActions: ModalsActions,
    private editingActions: EditingActions,
  private notification: NotificationsService) { }

  ngOnInit() {
  }


  editProject() {
    this.store.dispatch(
      this.modalActions.openModal(ModalTypes.EDIT_PROJECT)
    );
    this.store.dispatch(
      this.editingActions.editProject(JSON.parse(JSON.stringify(this.project)))
    );
  }

  deleteProject() {
    this.projectService.deleteProject(this.project.id);
    this.closeDeleteProjectModal();
    this.notification.success('Deleted', `Project ${this.project.name} deleted successfully.`);
  }

  showDeleteProjectModal(): void {
    this.isDeleteProjectModalActive = true;
  }

  closeDeleteProjectModal(): void {
    this.isDeleteProjectModalActive = false;
  }
}
