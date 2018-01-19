import { Component, OnInit } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { InitialAppState } from '../../../store/initialState';
import { Subscription } from 'rxjs/Subscription';
import { SpinnerService } from '../../../services/spinner.service';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.css']
})
export class SpinnerComponent implements OnInit, OnDestroy {
  isActive: boolean;
  spinnerSubscription: Subscription;
  constructor(
    private store: NgRedux<InitialAppState>,
    private spinnerService: SpinnerService
  ) {}

  ngOnInit() {
    this.spinnerSubscription = this.spinnerService.isActive().subscribe((isActive: boolean) => {
      this.isActive = isActive;
    });
  }

  ngOnDestroy() {
    this.spinnerSubscription.unsubscribe();
  }

}
