import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { QualityPolicyService } from '../../../../administration-panel/services/quality-policy.service';
import { QualityPolicy } from '../../../../administration-panel/models/quality-policy.model';

@Component({
  selector: 'app-add-quality-policy',
  templateUrl: './add-quality-policy.component.html',
  styleUrls: ['./add-quality-policy.component.scss']
})
export class AddQualityPolicyComponent implements OnInit {

  qualityPolicyForm = new FormGroup({
    id: new FormControl(''),
    name: new FormControl('', Validators.required),
    isExternal: new FormControl(false),
    isInternal: new FormControl(false)
  });

  nameValue = this.qualityPolicyForm.get('name');
  id: string | null = '';
  constructor(private qualityPolicyService: QualityPolicyService, private route: ActivatedRoute, private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) {
      this.getQualityPolicy(this.id);
    }
  }

  getQualityPolicy(id: string) {
    this.qualityPolicyService.getQualityPolicy(id).subscribe(x => {
      this.qualityPolicyForm.patchValue({
        id: x.id,
        name: x.name,
        isExternal: x.isExternal,
        isInternal: x.isInternal
      });
    })
  }
  onSubmit() {
    if (this.qualityPolicyForm.valid) {
      if (this.id) {
        this.qualityPolicyService.updateQualityPolicy(this.qualityPolicyForm.value as QualityPolicy).subscribe(x => {
          this.displayMessage('Polityka jakości zaktualizowana.');
        });
      } else {
        this.qualityPolicyService.addQualityPolicy(this.qualityPolicyForm.value as QualityPolicy).subscribe(x => {
          this.displayMessage('Polityka jakości dodana.');
          this.resetQualityPolicyForm();
        });
      }
    }
  }

  displayMessage(message: string) {
    this.snackBar.open(message, '', { duration: 1500 });
  }

  resetQualityPolicyForm() {
    this.qualityPolicyForm.patchValue(
      {
        id: '',
        name: '',
        isInternal: false,
        isExternal: false
      }
    );

    this.nameValue?.setErrors(null);
  }

}
