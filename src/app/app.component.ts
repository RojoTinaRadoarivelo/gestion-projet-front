import { Component, OnDestroy, inject } from '@angular/core';
import { Subject } from 'rxjs';
import { LoadingService } from './core/services/loading.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnDestroy {
  private _unsubscribeAll: Subject<boolean | null> = new Subject<boolean | null>();
  private _loadingService = inject(LoadingService);
  // loading bar
  loading$ = this._loadingService.loading$;

  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }
}
