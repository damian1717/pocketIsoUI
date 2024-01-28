import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Regulation } from 'src/administration-panel/models/regulation.model';
import { RegulationService } from 'src/administration-panel/services/regulation.service';

@Component({
  selector: 'app-add-regulation',
  templateUrl: './add-regulation.component.html',
  styleUrls: ['./add-regulation.component.scss']
})
export class AddRegulationComponent implements OnInit {

  regulationForm = new FormGroup({
    id: new FormControl(''),
    name: new FormControl('', Validators.required),
    link: new FormControl(''),
    description: new FormControl('')
  });

  nameValue = this.regulationForm.get('name');
  id: string | null = '';
  constructor(private regulationService: RegulationService, private route: ActivatedRoute, private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) {
      this.getQualityPolicy(this.id);
    }
  }

  getQualityPolicy(id: string) {
    this.regulationService.getRegulation(id).subscribe(x => {
      this.regulationForm.patchValue({
        id: x.id,
        name: x.name,
        link: x.link,
        description: x.description
      });
    })
  }
  onSubmit() {
    if (this.regulationForm.valid) {
      if (this.id) {
        this.regulationService.updateRegulation(this.regulationForm.value as Regulation).subscribe(x => {
          this.displayMessage('Przepis prawny zaktualizowany.');
        });
      } else {
        this.regulationService.addRegulation(this.regulationForm.value as Regulation).subscribe(x => {
          this.displayMessage('Przepis prawny dodany.');
          this.resetQualityPolicyForm();
        });
      }
    }
  }

  displayMessage(message: string) {
    this.snackBar.open(message, '', { duration: 1500 });
  }

  resetQualityPolicyForm() {
    this.regulationForm.patchValue(
      {
        id: '',
        name: '',
        link: '',
        description: ''
      }
    );

    this.nameValue?.setErrors(null);
  }
}
