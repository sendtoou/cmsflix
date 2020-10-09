import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { User } from '../../../_models/user';
import { AuthService } from '../../../_services/auth.service';
import { UserService } from '../../../_services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Output() toggleSideBarForMe: EventEmitter<any> = new EventEmitter();
  checked = true;
  loading = false;
  user: User;
  userId: '';
  constructor(private authService: AuthService, private userService: UserService) { }

  ngOnInit(): void {
    this.loading = true;
    this.userId = this.authService.getUserId();

    this.userService.getById(this.userId).subscribe(user => {
      this.user = user;
    });
  }

  toggleSideBar() {
    this.toggleSideBarForMe.emit();
  }

  logout(){
    this.authService.logout();
  }

}
