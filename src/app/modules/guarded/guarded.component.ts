import { Component, inject } from '@angular/core';
import { LoadingService } from 'src/app/core/services/loading.service';

@Component({
  selector: 'app-guarded',
  templateUrl: './guarded.component.html',
  styleUrls: ['./guarded.component.scss'],
})
export class GuardedComponent {
  private readonly _loadingService = inject(LoadingService);

  handleLoading(event: boolean) {
    if (event) {
      this._loadingService.show();
    } else {
      this._loadingService.hide();
    }
  }
}
