import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class NotificationsService {
  TIMEOUT_DURATION: number = environment.TIMEOUT_DURATION;
}
