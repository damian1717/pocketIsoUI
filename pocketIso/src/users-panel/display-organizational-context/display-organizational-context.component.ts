import { Component, OnInit } from '@angular/core';
import { RaportCode } from '../../common/enums/raport-codes';
import { DocumentInfo } from '../../common/models/documnet.model';
import { DocumentService } from '../../common/services/document.service';
import { SaveAsService } from '../../common/services/save-as.service';

@Component({
  selector: 'app-display-organizational-context',
  templateUrl: './display-organizational-context.component.html',
  styleUrls: ['./display-organizational-context.component.css']
})
export class DisplayOrganizationalContextComponent implements OnInit {

  document: DocumentInfo | undefined;
  constructor(private documentService: DocumentService, private saveAsService: SaveAsService) { }

  ngOnInit() {
    this.getDocuments();
  }

  private getDocuments() {
    this.documentService.getDocumentsByCode(RaportCode.OrganizationContext).subscribe(x => {
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
