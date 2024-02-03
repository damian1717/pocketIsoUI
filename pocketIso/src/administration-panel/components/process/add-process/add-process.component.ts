import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { ProcessService } from '../../../services/process.service';
import { Process } from '../../../../administration-panel/models/process.model';
import { ProcessType } from '../../../../administration-panel/models/process-type.model';

@Component({
  selector: 'app-add-process',
  templateUrl: './add-process.component.html',
  styleUrls: ['./add-process.component.scss']
})
export class AddProcessComponent implements OnInit {

  processForm = new FormGroup({
    id: new FormControl(''),
    name: new FormControl('', Validators.required),
    isBaseProcess: new FormControl(false),
    processType: new FormControl(0)
  });

  processTypes: ProcessType[] = [];
  constructor(private processService: ProcessService, private route: ActivatedRoute, private snackBar: MatSnackBar, private router: Router) { }

  ngOnInit() {
    this.getProcessTypes();

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
        isBaseProcess: x.isBaseProcess,
        processType: x.processType
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
        isBaseProcess: false,
        processType: 0
      }
    );

    this.nameValue?.setErrors(null);
  }

  getProcessTypes() {
    this.processTypes =
    [
      { value: 1, name: 'Procesy zarządcy' } as ProcessType,
      { value: 2, name: 'Procesy główny' } as ProcessType,
      { value: 3, name: 'Procesy wspierający' } as ProcessType
    ];
  }

  redirectToProcessess(): void {
    this.router.navigateByUrl(`processes`);
  }
}
