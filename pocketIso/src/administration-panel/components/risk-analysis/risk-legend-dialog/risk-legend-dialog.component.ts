import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-risk-legend-dialog',
  templateUrl: './risk-legend-dialog.component.html',
  styleUrls: ['./risk-legend-dialog.component.css']
})
export class RiskLegendDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<RiskLegendDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit() {
  }

}

