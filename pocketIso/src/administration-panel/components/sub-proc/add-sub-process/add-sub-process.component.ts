import { Component, OnInit } from '@angular/core';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { SubProcessService } from '../../../../administration-panel/services/sub-process.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SubProcess } from '../../../../administration-panel/models/sub-process.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-sub-process',
  templateUrl: './add-sub-process.component.html',
  styleUrls: ['./add-sub-process.component.css']
})
export class AddSubProcessComponent implements OnInit {
  id: string | null = '';
  subProcessType: string | null = '';
  model: SubProcess;
  description: string = '';
  buttonText: string = '';
  messageText: string = '';
  constructor(private subProcessService: SubProcessService, private route: ActivatedRoute, private router: Router, private snackBar: MatSnackBar) {
    this.model = {} as SubProcess;
  }
  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.subProcessType = this.route.snapshot.paramMap.get('type');

    if (Number(this.subProcessType) === 1) {
      this.buttonText = ' Procedury';
      this.messageText = 'Procedura';
    } else {
      this.buttonText = 'Instrukcje';
      this.messageText = 'Instrukcja';
    }

    if (this.id) {
      this.subProcessService.getSubProcess(this.id).subscribe(x => {
        if (x) {
          this.htmlContent = x.htmlContent;
          this.model = x;
          this.description = x.description;
        }
      });
    }
  }

  htmlContent = '';

  config: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '40rem',
    minHeight: '20rem',
    placeholder: 'Wprowadź tekst tutaj...',
    translate: 'no',
    defaultParagraphSeparator: 'p',
    defaultFontName: 'Arial',
    toolbarHiddenButtons: [
      ['bold']
    ],
    customClasses: [
      {
        name: "quote",
        class: "quote",
      },
      {
        name: 'redText',
        class: 'redText'
      },
      {
        name: "titleText",
        class: "titleText",
        tag: "h1",
      },
    ]
  };

  redirectToSubProcessess() {
    this.router.navigateByUrl(`sub-processes/${this.subProcessType}`);
  }

  save() {
    if (this.id) {
      this.model.htmlContent = this.htmlContent;
      this.model.description = this.description;
      this.subProcessService.updateSubProcess(this.model).subscribe(x => {
        this.displayMessage(`${this.messageText} zaktualizowana.`);
      });
    } else {
      this.model = { id: '', name: '', description: this.description, htmlContent: this.htmlContent, subProcessType: Number(this.subProcessType) } as SubProcess;
      this.subProcessService.addSubProcess(this.model).subscribe(x => {
        this.displayMessage(`${this.messageText} dodana.`);
      });
    }
  }

  displayMessage(message: string) {
    this.snackBar.open(message, '', { duration: 1500 });
  }
}
