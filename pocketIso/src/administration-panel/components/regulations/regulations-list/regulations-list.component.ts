import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { RegulationService } from '../../../../administration-panel/services/regulation.service';
import { AuthService } from '../../../../common/auth/auth.service';
import { Regulation } from '../../../../administration-panel/models/regulation.model';
import { Role } from '../../../../common/enums/user-role-codes';

@Component({
  selector: 'app-regulations-list',
  templateUrl: './regulations-list.component.html',
  styleUrls: ['./regulations-list.component.scss']
})
export class RegulationsListComponent implements OnInit {

  regulation: Regulation[] = [];
  canEdit = true;
  constructor(private regulationService: RegulationService, private router: Router, private authService: AuthService) { }

  ngOnInit() {
    this.canEditRegulation();
    this.getQualityPolicies();

    if (!this.canEdit) {
      this.displayedColumns = ['name', 'link', 'description'];
    }
  }

  displayedColumns: string[] =
    ['name', 'link', 'description', 'edit'];
  dataSource = new MatTableDataSource(this.regulation);

  private canEditRegulation() {
    let role = this.authService.getRole();

    if (role === Role.User) {
      this.canEdit = false;
    } else {
      this.canEdit = true;
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getQualityPolicies() {
    this.regulationService.getRegulations().subscribe(x => {
      this.regulation = x;
      this.dataSource.data = x;
    })
  }

  redirectToEditRegulation(id: string): void {
    this.router.navigateByUrl(`add-regulation/${id}`);
  }

}
