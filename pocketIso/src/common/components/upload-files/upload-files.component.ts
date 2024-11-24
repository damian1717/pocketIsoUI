import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DocumentService } from '../../../common/services/document.service';
import { DocumentInfo } from '../../../common/models/documnet.model';
import { SaveAsService } from '../../../common/services/save-as.service';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-upload-files',
  templateUrl: './upload-files.component.html',
  styleUrls: ['./upload-files.component.css']
})
export class UploadFilesComponent implements OnInit {

  uploadedFiles: any = {};
  url = `https://localhost:7087/api/document/upload/COM_${this.data}`;
  documentCode = '';
  documents: DocumentInfo[] = [];

  constructor(
    public dialogRef: MatDialogRef<UploadFilesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private documentService: DocumentService,
    private saveAsService: SaveAsService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.documentCode = `COM_${this.data}`;
    this.getDocuments();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onUpload(event: any) {
    this.getDocuments();
  }

  private getDocuments() {
    this.documentService.getDocumentsByCode(this.documentCode).subscribe(x => {
      this.documents = x;
    });
  }

  downloadDocumnet(id: string, name: string) {
    this.documentService.downloadFileById(id)
      .subscribe(
        resp => this.saveAsService.save(resp.body, name),
      );
  }

  deleteDocument(id: string) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, { data: { text: 'Czy napewno chce usunąć dokumnet?' } });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.documentService.delete(id).subscribe(x => {
          this.getDocuments();
          this.displayMessage('Dokument usuniety.');
        });
      }
    });
  }

  displayMessage(message: string) {
    this.snackBar.open(message, '', { duration: 1500 });
  }

}
