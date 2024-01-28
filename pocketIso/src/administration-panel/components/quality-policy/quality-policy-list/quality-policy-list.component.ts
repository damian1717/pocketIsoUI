import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { QualityPolicyService } from '../../../../administration-panel/services/quality-policy.service';
import { QualityPolicy } from '../../../../administration-panel/models/quality-policy.model';

@Component({
  selector: 'app-quality-policy-list',
  templateUrl: './quality-policy-list.component.html',
  styleUrls: ['./quality-policy-list.component.scss']
})
export class QualityPolicyListComponent implements OnInit {

  qualityPolicies: QualityPolicy[] = [];
  constructor(private qualityPolicyService: QualityPolicyService, private router: Router) { }

  ngOnInit() {
    this.getQualityPolicies();
  }

  displayedColumns: string[] =
    ['name', 'isInternal', 'isExternal', 'edit'];
  dataSource = new MatTableDataSource(this.qualityPolicies);

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getQualityPolicies() {
    this.qualityPolicyService.getQualityPolicies().subscribe(x => {
      this.qualityPolicies = x;
      this.dataSource.data = x;
    })
  }

  redirectToEditQualityPolicy(id: string): void {
    this.router.navigateByUrl(`add-quality-policy/${id}`);
  }
}
