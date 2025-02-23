import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuditService } from '../../../../administration-panel/services/audit.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Audit } from '../../../../administration-panel/models/audit.model';

@Component({
  selector: 'app-add-audit',
  templateUrl: './add-audit.component.html',
  styleUrls: ['./add-audit.component.css']
})
export class AddAuditComponent implements OnInit {

  id: string | null = '';
  auditForm = new FormGroup({
    id: new FormControl(''),
    name: new FormControl('', Validators.required),
    type: new FormControl('', Validators.required),
    status: new FormControl('', Validators.required),
    auditor: new FormControl('', Validators.required),
    auditDate: new FormControl(new Date())
  });

  nameValue = this.auditForm.get('name');
  typeValue = this.auditForm.get('type');
  statusValue = this.auditForm.get('status');
  auditorValue = this.auditForm.get('auditor');

  constructor(
    private auditService: AuditService,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) {
      this.getAudit(this.id);
    }
  }

  redirectToAudits() {
    this.router.navigateByUrl(`audits`);
  }

  onSubmit() {
    if (this.auditForm.valid) {
      if (this.id) {
        this.auditService.updateAudit(this.auditForm.value as Audit).subscribe(x => {
          this.displayMessage('Audyt zaktualizowany.');
        });
      } else {
        this.auditService.addAudit(this.auditForm.value as Audit).subscribe(x => {
          this.displayMessage('Audyt dodany.');
          this.resetAuditForm();
        });
      }
    }
  }

  getAudit(id: string) {
    this.auditService.getAudit(id)
      .subscribe(x => {
        this.auditForm.patchValue({
          id: x.id,
          name: x.name,
          type: x.type,
          status: x.status,
          auditor: x.auditor,
          auditDate: x.auditDate
        });
      });
  }

  displayMessage(message: string) {
    this.snackBar.open(message, '', { duration: 1500 });
  }

  resetAuditForm() {
    this.auditForm.patchValue(
      {
        id: '',
        name: '',
        type: '',
        status: '',
        auditor: '',
        auditDate: new Date()
      }
    );

    this.nameValue?.setErrors(null);
    this.typeValue?.setErrors(null);
    this.statusValue?.setErrors(null);
    this.auditorValue?.setErrors(null);
  }
}
