import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { routePaths } from 'src/app/routes';
import { LoginImageService } from 'src/app/services/common/login-image.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent implements OnInit {
  routes = routePaths;
  background_img = '';

  constructor(
    public router: Router,
    private backgroundImageService: LoginImageService
  ) {}

  ngOnInit(): void {}

  getBackgroundImage() {
    return this.backgroundImageService.get();
  }
}
