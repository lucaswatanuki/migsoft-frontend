import { map, shareReplay } from 'rxjs/operators';
import { Component, Input } from '@angular/core';
import { TokenStorageService } from './auth/token-storage.service';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  private roles: string[];
  public authority: string;
  title = 'migsoft';

  constructor(private tokenStorage: TokenStorageService, private breakpointObserver: BreakpointObserver) { }


  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  ngOnInit() {
    if (this.tokenStorage.getToken()) {
      this.roles = this.tokenStorage.getAuthorities();
      this.roles.every(role => {
        if (role === 'ROLE_ADMIN') {
          this.authority = 'admin';
          return false;
        } else {
        this.authority = 'user';
        return true;
      }
      });
      img: new Image
    }
  }
}
