import { Component, OnInit } from '@angular/core';
import { QualityPolicy } from '../../administration-panel/models/quality-policy.model';
import { SavedQualityPolicyService } from '../../administration-panel/services/saved-quality-policies.service';
import { RaportCode } from '../../common/enums/raport-codes';
import { DocumentInfo } from '../../common/models/documnet.model';
import { DocumentService } from '../../common/services/document.service';
import { SaveAsService } from '../../common/services/save-as.service';

@Component({
  selector: 'app-display-quality-policies',
  templateUrl: './display-quality-policies.component.html',
  styleUrls: ['./display-quality-policies.component.css']
})
export class DisplayQualityPoliciesComponent implements OnInit {

  document: DocumentInfo | undefined;
  internalQualityPolicies: QualityPolicy[] = [];
  externalQualityPolicies: QualityPolicy[] = [];
  constructor(private savedQualityPolicyService: SavedQualityPolicyService, private documentService: DocumentService, private saveAsService: SaveAsService) { }

  ngOnInit() {
    this.getSavedQualityPolicies();
    this.getDocuments();
  }

  getSavedQualityPolicies() {
    this.savedQualityPolicyService.getLastSavedQualityPolicies().subscribe(x => {
      if (x && x.length > 0) {
        this.internalQualityPolicies = x.filter(i => i.isInternal);
        this.externalQualityPolicies = x.filter(i => i.isExternal);
      }
    })
  }

  private getDocuments() {
    this.documentService.getDocumentsByCode(RaportCode.QualityPolicy).subscribe(x => {
      if (x && x.length > 0) {
        this.document = x[0];
      }
    });
  }

  downloadDocumnet(id: string) {
    this.documentService.downloadFileById(id)
      .subscribe(
        resp => this.saveAsService.save(resp.body, resp.filename),
      );
  }
}
