import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-risk-criteria-dialog',
  templateUrl: './risk-criteria-dialog.component.html',
  styleUrls: ['./risk-criteria-dialog.component.css']
})
export class RiskCriteriaDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<RiskCriteriaDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit() {
  }

}
