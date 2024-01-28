import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import * as _ from 'lodash';

@Component({
  selector: 'app-define-process-dialog',
  templateUrl: './define-process-dialog.component.html',
  styleUrls: ['./define-process-dialog.component.scss']
})
export class DefineProcessDialogComponent implements OnInit {

  definitionProcessForm = new FormGroup({
    id: new FormControl(''),
    name: new FormControl('', Validators.required),
    isBase: new FormControl(false),
    processId: new FormControl(''),
    code: new FormControl('')
  });

  nameValue = this.definitionProcessForm.get('name');
  id: string | null = '';

  constructor(
    public dialogRef: MatDialogRef<DefineProcessDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {
    this.definitionProcessForm.setValue(this.data);
  }


  public onSubmit() {
    if (this.definitionProcessForm.valid) {
      this.dialogRef.close(this.definitionProcessForm.value);
    }
  }
}
