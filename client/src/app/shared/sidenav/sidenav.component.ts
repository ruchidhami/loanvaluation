import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute) {
  }


  action: string;

  ngOnInit() {
    this.action = this.activatedRoute.snapshot.paramMap.get('action');
  }

  goToAddValaution() {
    if (this.action === 'edit') {
      location.reload();
      this.router.navigate(['valuations/create']);
    } else {
      this.router.navigate(['valuations/create']);
    }
  }
}
