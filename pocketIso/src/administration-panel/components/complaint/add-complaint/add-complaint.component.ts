import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from '../../../../administration-panel/models/category.model';
import { Complaint } from '../../../../administration-panel/models/complaint.model';
import { ComplaintService } from '../../../../administration-panel/services/complaint.service';

@Component({
  selector: 'app-add-complaint',
  templateUrl: './add-complaint.component.html',
  styleUrls: ['./add-complaint.component.css']
})
export class AddComplaintComponent implements OnInit {

  complaintFormGroup: FormGroup = this._formBuilder.group({
    id: [''],
    type: [1],
    status: [1],
    client: ['', Validators.required],
    product: ['', Validators.required],
    date: [new Date()],
    deadline: [new Date()],
    responsiblePerson: ['', Validators.required],
    actions: ['', Validators.required],
    whatHappened: ['', Validators.required],
    whyItIsProblem: ['', Validators.required],
    whenProblemIdentified: [new Date()],
    whereProblemDetected: ['', Validators.required],
    howProblemDetected: ['', Validators.required],
    whoProblemDetected: ['', Validators.required],
    piecesNok: [0],
    properProcess: ['', Validators.required],
    inconsistencyDetected: ['', Validators.required],
  });

  clientValue = this.complaintFormGroup.get('client');
  productValue = this.complaintFormGroup.get('product');
  responsiblePersonValue = this.complaintFormGroup.get('responsiblePerson');
  actionsValue = this.complaintFormGroup.get('actions');
  whatHappenedValue = this.complaintFormGroup.get('whatHappened');
  whyItIsProblemValue = this.complaintFormGroup.get('whyItIsProblem');
  whenProblemIdentifiedValue = this.complaintFormGroup.get('whenProblemIdentified');
  whereProblemDetectedValue = this.complaintFormGroup.get('whereProblemDetected');
  howProblemDetectedValue = this.complaintFormGroup.get('howProblemDetected');
  whoProblemDetectedValue = this.complaintFormGroup.get('whoProblemDetected');
  properProcessValue = this.complaintFormGroup.get('properProcess');
  inconsistencyDetectedValue = this.complaintFormGroup.get('inconsistencyDetected');

  id: string | null = '';
  types: Category[] = [];
  statuses: Category[] = [];

  constructor(
    private _formBuilder: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar,
    private complaintService: ComplaintService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) {
      this.getComplaint(this.id);
    }

    this.getComplaintsTypes();
    this.getComplaintsStatuses();
  }

  getComplaint(id: string) {
    this.complaintService.geComplaintById(id).subscribe(x => {
      this.complaintFormGroup.patchValue({
        id: x.id,
        type: x.type,
        status: x.status,
        client: x.client,
        product: x.product,
        date: x.date,
        deadline: x.deadline,
        responsiblePerson: x.responsiblePerson,
        actions: x.actions,
        whatHappened: x.whatHappened,
        whyItIsProblem: x.whyItIsProblem,
        whenProblemIdentified: x.whenProblemIdentified,
        whereProblemDetected: x.whereProblemDetected,
        howProblemDetected: x.howProblemDetected,
        whoProblemDetected: x.whoProblemDetected,
        piecesNok: x.piecesNok,
        properProcess: x.properProcess,
        inconsistencyDetected: x.inconsistencyDetected
      });
    })
  }

  redirectToComplaints(): void {
    this.router.navigateByUrl(`complaints`);
  }

  onSubmit() {
    if (this.complaintFormGroup.valid) {
      if (this.id) {
        this.complaintService.updateComplaint(this.complaintFormGroup.value as Complaint).subscribe(x => {
          this.displayMessage('Reklamacja zaktualizowana.');
        });
      } else {
        this.complaintService.addComplaint(this.complaintFormGroup.value as Complaint).subscribe(x => {
          this.displayMessage('Reklamacja dodana.');
          this.resetForm();
        });
      }
    }
  }

  displayMessage(message: string) {
    this.snackBar.open(message, '', { duration: 1500 });
  }

  resetForm() {
    this.complaintFormGroup.patchValue(
      {
        id: '',
        type: 1,
        status: 1,
        client: '',
        product: '',
        date: new Date(),
        deadline: new Date(),
        responsiblePerson: '',
        actions: '',
        whatHappened: '',
        whyItIsProblem: '',
        whenProblemIdentified: new Date(),
        whereProblemDetected: '',
        howProblemDetected: '',
        whoProblemDetected: '',
        piecesNok: 0,
        properProcess: '',
        inconsistencyDetected: ''
      }
    );

    this.clientValue?.setErrors(null);
    this.productValue?.setErrors(null);
    this.responsiblePersonValue?.setErrors(null);
    this.actionsValue?.setErrors(null);
    this.whatHappenedValue?.setErrors(null);
    this.whyItIsProblemValue?.setErrors(null);
    this.whenProblemIdentifiedValue?.setErrors(null);
    this.whereProblemDetectedValue?.setErrors(null);
    this.howProblemDetectedValue?.setErrors(null);
    this.whoProblemDetectedValue?.setErrors(null);
    this.properProcessValue?.setErrors(null);
    this.inconsistencyDetectedValue?.setErrors(null);
  }

  getComplaintsTypes() {
    this.types =
    [
      { value: 1, name: 'Reklamacja' } as Category
    ];
  }

  getComplaintsStatuses() {
    this.statuses =
    [
      { value: 1, name: 'Otwarty' } as Category,
      { value: 2, name: 'Zamknięty' } as Category,
      { value: 3, name: 'Odrzucony' } as Category
    ];
  }
}
