import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/core/user/user.service';
import { User } from 'src/app/core/user/user.types';
import { ImageService } from 'src/app/shared/services/image.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  user: User | null = null;

  projects: any[] = [
    {
      name: 'Project One',
      description: 'One',
    },
    {
      name: 'Project Two',
      description: 'Two',
    },
  ];

  constructor(
    private readonly _userService: UserService,
    private readonly _imageService: ImageService
  ) {}
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

  displayDefaultAvatar() {
    return this.user?.username
      ? this._imageService.getDefaultAvatar(this.user?.username)
      : this._imageService.getDefaultAvatar(this.user!.email!);
  }

  hasAvatar() {
    return !!this.user?.avatar;
  }
}
