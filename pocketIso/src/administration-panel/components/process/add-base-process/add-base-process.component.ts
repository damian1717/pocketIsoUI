import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { ProcessService } from '../../../services/process.service';
import { Process } from '../../../../administration-panel/models/process.model';

@Component({
  selector: 'app-add-base-process',
  templateUrl: './add-base-process.component.html',
  styleUrls: ['./add-base-process.component.scss']
})
export class AddBaseProcessComponent implements OnInit {

  processForm = new FormGroup({
    id: new FormControl(''),
    name: new FormControl('', Validators.required),
    isBaseProcess: new FormControl(true)
  });

  constructor(private processService: ProcessService, private route: ActivatedRoute, private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) {
      this.getProcess(this.id);
    }
  }



  nameValue = this.processForm.get('name');
  id: string | null = '';

  getProcess(id: string) {
    this.processService.getProcess(id).subscribe(x => {
      this.processForm.patchValue({
        id: x.id,
        name: x.name,
        isBaseProcess: x.isBaseProcess
      });
    })
  }
  onSubmit() {
    if (this.processForm.valid) {
      if (this.id) {
        this.processService.updateProcess(this.processForm.value as Process).subscribe(x => {
          this.displayMessage('Process zaktualizowany.');
        });
      } else {
        this.processService.addProcess(this.processForm.value as Process).subscribe(x => {
          this.displayMessage('Process dodany.');
          this.resetProcessForm();
        });
      }
    }
  }

  displayMessage(message: string) {
    this.snackBar.open(message, '', { duration: 1500 });
  }

  resetProcessForm() {
    this.processForm.patchValue(
      {
        id: '',
        name: '',
        isBaseProcess: true
      }
    );

    this.nameValue?.setErrors(null);
  }
}
