import {Component} from '@angular/core';

@Component({
  selector: 'app-footer',
  template: `
    <div class="container">
      <div class="content">
        <a [href]="linkToGitHubProject" target="_blank">
          <img class="github-icon" src="assets/img/GitHub-Mark-120px-plus.png" />
        </a>
        <span>Project on GitHub: <a [href]="linkToGitHubProject" target="_blank">{{linkToGitHubProject}}</a></span>
      </div>
    </div>
  `,
  styleUrls: ['footer.scss']
})
export class FooterComponent {
  linkToGitHubProject = 'https://github.com/yonih/reversi-angular2';
}
