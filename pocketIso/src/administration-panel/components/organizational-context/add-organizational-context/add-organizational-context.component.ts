import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { OrganizationalContext } from '../../../../administration-panel/models/organizational-context.model';
import { OrganizationalContextService } from '../../../../administration-panel/services/organizational-context.service';
import { SaveAsService } from '../../../../common/services/save-as.service';
import { RaportService } from '../../../../common/services/raport.service';
import { DocumentService } from '../../../../common/services/document.service';
import { RaportCode } from 'src/common/enums/raport-codes';
import { DocumentInfo } from 'src/common/models/documnet.model';

@Component({
  selector: 'app-add-organizational-context',
  templateUrl: './add-organizational-context.component.html',
  styleUrls: ['./add-organizational-context.component.css']
})
export class AddOrganizationalContextComponent implements OnInit {

  organizationalContextForm = new FormGroup({
    id: new FormControl(''),
    industry: new FormControl(''),
    factorsTechnologicalEnvironment: new FormControl(''),
    factorsRelatedToValuesCulture: new FormControl(''),
    externalAndInternalEntities: new FormControl(''),
    strengths: new FormControl(''),
    weaknesses: new FormControl(''),
    chances: new FormControl(''),
    threats: new FormControl(''),
    norm: new FormControl(0),
    numberNorm: new FormControl(''),
    normJustification: new FormControl('')
  });

  id: string | null = '';
  public norms: any[] = [{
    id: 1, name: 'W zakresie funkcjonującego systemu zarządzania jakością organizacja potwierdza, że wszystkie punkty normy ISO są jej znane i stosowane'
  },
  {
    id: 2, name: 'W zakresie funkcjonującego systemu zarządzania jakością organizacja stwierdza, że punkt normy'
  }];

  documents: DocumentInfo[] = [];

  public showAdditionalNormFields = false;
  constructor(private snackBar: MatSnackBar, private organizationalContextService: OrganizationalContextService,
    private saveAsService: SaveAsService, private raport: RaportService, private documentService: DocumentService) { }

  ngOnInit() {
    this.getOrganizationalContext();
    this.getDocuments();
  }

  getOrganizationalContext() {
    this.organizationalContextService.getOrganizationalContextByUserId().subscribe(x => {
      console.log(x);
      if (x) {
        this.organizationalContextForm.patchValue({
          id: x.id,
          industry: x.industry,
          factorsTechnologicalEnvironment: x.factorsTechnologicalEnvironment,
          factorsRelatedToValuesCulture: x.factorsRelatedToValuesCulture,
          externalAndInternalEntities: x.externalAndInternalEntities,
          strengths: x.strengths,
          weaknesses: x.weaknesses,
          chances: x.chances,
          threats: x.threats,
          norm: x.norm,
          numberNorm: x.numberNorm,
          normJustification: x.normJustification
        });

        if (x.norm === 2) {
          this.showAdditionalNormFields = true;
        } else {
          this.showAdditionalNormFields = false;
        }
      }
    })
  }

  onSubmit() {
    if (this.organizationalContextForm.valid) {
      if (this.organizationalContextForm.value?.id) {
        this.organizationalContextService.updateOrganizationalContext(this.organizationalContextForm.value as OrganizationalContext).subscribe(x => {
          this.displayMessage('Kontekst organizacji zaktualizowany.');
          this.getOrganizationalContext();
        });
      } else {
        this.organizationalContextService.addOrganizationalContext(this.organizationalContextForm.value as OrganizationalContext).subscribe(res => {
          this.displayMessage('Kontekst organizacji dodany.');
          this.getOrganizationalContext();
        },
          err => this.displayMessage(err?.message),
          () => { });
      }
    }
  }

  displayMessage(message: string) {
    this.snackBar.open(message, '', { duration: 1500 });
  }

  handleRadiButtonChange(event: any) {
    if (this.organizationalContextForm?.value?.norm === 2) {
      this.showAdditionalNormFields = true;
    } else {
      this.showAdditionalNormFields = false;
      if (this.organizationalContextForm.value) {
        this.organizationalContextForm.value.normJustification = '';
        this.organizationalContextForm.value.numberNorm = '';
      }
    }
  }

  generateReport() {

    let model = this.organizationalContextForm.value as OrganizationalContext;

    if (model) {
      if (!model.industry || !model.factorsTechnologicalEnvironment || !model.factorsRelatedToValuesCulture
        || !model.externalAndInternalEntities || !model.strengths || !model.weaknesses
        || !model.chances || !model.threats || !model.norm) {
        this.displayMessage('Nie można generować dokumnentu.');
      } else {
        if (model.norm === 2) {
          if (!model.normJustification || !model.numberNorm) {
            this.displayMessage('Nie można generować dokumnentu.');
          } else {
            this.generateOrganizationalContextRaport(model);
          }
        } else {
          this.generateOrganizationalContextRaport(model);
        }
      }
    }
  }

  generateOrganizationalContextRaport(organizationalContext: OrganizationalContext) {

    this.raport.generateOrganizationalContextRaportPdf(organizationalContext)
      .subscribe(resp => {
        this.saveAsService.save(resp.body, resp.filename);
        this.displayMessage('Raport utworzony');
        this.getDocuments();
      });
  }

  private getDocuments() {
    this.documentService.getAllDocumentsByCodeAndUserId(RaportCode.OrganizationContext).subscribe(x => {
      this.documents = x;
    });
  }

  downloadDocumnet(id: string) {
    this.documentService.downloadFileById(id)
      .subscribe(
        resp => this.saveAsService.save(resp.body, resp.filename),
      );
  }
}
