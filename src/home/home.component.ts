import {Component, ViewChild} from '@angular/core';
import {NgbDropdown} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  @ViewChild('adminDropdown') adminDropdownRef!: NgbDropdown;
  @ViewChild('userDropdown') userDropdownRef!: NgbDropdown;

  toggleAdminDropdown(event: KeyboardEvent) {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      this.adminDropdownRef.toggle();
    }
  }

  toggleUserDropdown(event: KeyboardEvent) {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      this.userDropdownRef.toggle();
    }
  }
}
