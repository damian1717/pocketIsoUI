import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { QualityPolicy } from '../../../../administration-panel/models/quality-policy.model';
import { QualityPolicyService } from '../../../../administration-panel/services/quality-policy.service';
import { SavedQualityPolicyService } from '../../../../administration-panel/services/saved-quality-policies.service';
import { DocumentInfo } from '../../../../common/models/documnet.model';
import { DocumentService } from '../../../../common/services/document.service';
import { RaportService } from '../../../../common/services/raport.service';
import { SaveAsService } from '../../../../common/services/save-as.service';
import { RaportCode } from '../../../../common/enums/raport-codes';
import { QualityPolicyReport } from '../../../../common/models/quality-policy-report.model';
import { SavedQualityPolicy } from '../../../../administration-panel/models/saved-quality-policy.model';

@Component({
  selector: 'app-choose-quality-policy',
  templateUrl: './choose-quality-policy.component.html',
  styleUrls: ['./choose-quality-policy.component.scss']
})
export class ChooseQualityPolicyComponent implements OnInit {

  outside = this._formBuilder.group({
    clientSatisfaction: false,
    companyDevelopment: false,
    noComplaints: false,
  });

  inside = this._formBuilder.group({
    internalComplaints: false,
    levelScrap: false
  });

  documents: DocumentInfo[] = [];
  qualityPoliciesInternal: QualityPolicy[] = [];
  qualityPoliciesExternal: QualityPolicy[] = [];

  constructor(private _formBuilder: FormBuilder, private raport: RaportService, private saveAsService: SaveAsService,
    private documentService: DocumentService, private qualityPolicyService: QualityPolicyService, private savedQualityPolicyService: SavedQualityPolicyService) { }

  ngOnInit() {
    this.getDocuments();
    this.getQualityPolicies();
  }

  private getDocuments() {
    this.documentService.getDocumentsByCode(RaportCode.QualityPolicy).subscribe(x => {
      this.documents = x;
    });
  }

  generateRaportPdf() {
    this.saveQualityPolicy();

    const request = this.getReportRequest();

    this.raport.generateQualityPolicyRaportPdf(request)
      .subscribe(
        resp => {
          this.saveAsService.save(resp.body, resp.filename);
          this.getDocuments();
          this.qualityPoliciesExternal.forEach(x => x.selected = false);
          this.qualityPoliciesInternal.forEach(x => x.selected = false);
        }
      );
  }

  private getReportRequest() {
    let qualityPolicies = this.qualityPoliciesInternal.filter(x => x.selected).concat(this.qualityPoliciesExternal.filter(x => x.selected));
    return { qualityPolicies: qualityPolicies } as QualityPolicyReport;
  }

  downloadDocumnet(id: string) {
    this.documentService.downloadFileById(id)
      .subscribe(
        resp => this.saveAsService.save(resp.body, resp.filename),
      );
  }

  getQualityPolicies() {
    this.qualityPolicyService.getQualityPolicies().subscribe(x => {

      if (x && x.length > 0) {
        x.forEach(element => {

          if (element.isExternal) {
            this.qualityPoliciesExternal.push({ id: element.id, name: element.name, isExternal: element.isExternal, isInternal: element.isInternal, selected: false } as QualityPolicy)
          }
          if (element.isInternal) {
            this.qualityPoliciesInternal.push({ id: element.id, name: element.name, isExternal: element.isExternal, isInternal: element.isInternal, selected: false } as QualityPolicy)
          }
        });
      }
    })
  }

  saveQualityPolicy() {
    let qualityPolicies = this.qualityPoliciesInternal.filter(x => x.selected).concat(this.qualityPoliciesExternal.filter(x => x.selected));

    if (!qualityPolicies || qualityPolicies.length <= 0) return;

    let items: SavedQualityPolicy[] = [];
    qualityPolicies.forEach(x => {
      let item = { qualityPolicyId: x.id } as SavedQualityPolicy;
      items.push(item);
    })

    if (items.length > 0) {
      this.savedQualityPolicyService.addSavedQualityPolicy(items).subscribe();
    }
  }

}
