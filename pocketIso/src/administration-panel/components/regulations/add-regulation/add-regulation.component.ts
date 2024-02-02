import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from '../../../../administration-panel/models/category.model';
import { Regulation } from '../../../../administration-panel/models/regulation.model';
import { RegulationService } from '../../../../administration-panel/services/regulation.service';

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
    description: new FormControl(''),
    category: new FormControl(0)
  });

  nameValue = this.regulationForm.get('name');
  id: string | null = '';
  categories: Category[] = [];
  constructor(private regulationService: RegulationService, private route: ActivatedRoute, private snackBar: MatSnackBar,
    private router: Router) { }

  ngOnInit() {
    this.getCategories();

    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) {
      this.getQualityPolicy(this.id);
    }
  }

  getCategories() {
    this.categories =
    [
      { value: 1, name: 'Finanse' } as Category,
      { value: 2, name: 'Jakość' } as Category,
      { value: 3, name: 'Gospodarka wodnościekowa' } as Category,
      { value: 4, name: 'Emisja hałasu' } as Category,
      { value: 5, name: 'Wytwarzanie odpadów' } as Category,
      { value: 6, name: 'Gospodarka opakowaniami' } as Category,
      { value: 7, name: 'Emisja gazów i pyłów do powietrza' } as Category,
      { value: 8, name: 'Wymagania ogólne' } as Category,
      { value: 9, name: 'BHP' } as Category
    ];
  }

  getQualityPolicy(id: string) {
    this.regulationService.getRegulation(id).subscribe(x => {
      this.regulationForm.patchValue({
        id: x.id,
        name: x.name,
        link: x.link,
        description: x.description,
        category: x.category
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
        description: '',
        category: 1
      }
    );

    this.nameValue?.setErrors(null);
  }

  redirectToRegulations(): void {
    this.router.navigateByUrl(`regulations`);
  }
}
