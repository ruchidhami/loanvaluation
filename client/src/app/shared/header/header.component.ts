import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private router: Router) {
  }

  ngOnInit() {
  }

  @Output() openNav = new EventEmitter();

  openSideNav(e: any) {
    this.openNav.emit(e);
  }

  logout() {
    this.router.navigate(['login']);
  }

}
