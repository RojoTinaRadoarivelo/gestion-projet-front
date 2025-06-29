import { Component, OnInit, inject } from '@angular/core';
import { UserService } from 'src/app/core/user/user.service';
import { User } from 'src/app/core/user/user.types';
import { ImageService } from 'src/app/shared/services/image.service';
import { environment } from 'src/environments/environment';
import { ProjectMenu } from '../project-menu.types';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  user: User | null = null;
  projectUrl: string = environment.FRONT_URL;

  projects: ProjectMenu[] = [
    {
      name: 'Project One',
      tag: 'One',
      link: `${this.projectUrl}/project-one`,
      members: 4,
    },
    {
      name: 'Project Two',
      tag: 'Two',
      link: `${this.projectUrl}/project-two`,
      members: 4,
    },
  ];

  private readonly _userService = inject(UserService);
  private readonly _imageService = inject(ImageService);

  async ngOnInit(): Promise<void> {
    this.user = await this.getUserInfo();
  }

  async getUserInfo(): Promise<User | null> {
    return new Promise<User | null>((resolve) => {
      this._userService.user$.subscribe((user) => resolve(user));
    });
  }

  displayAvatar(path: string) {
    return this._imageService.getImg(path);
  }

  displayDefaultAvatar(): string {
    return this.user!.userName
      ? this._imageService.getDefaultAvatar(this.user!.userName)
      : this._imageService.getDefaultAvatar(this.user!.email);
  }

  hasAvatar() {
    return !!this.user?.avatar;
  }
}
