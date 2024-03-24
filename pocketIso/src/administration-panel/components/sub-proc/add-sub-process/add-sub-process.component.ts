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
  buttonText: string = '';
  constructor(private subProcessService: SubProcessService, private route: ActivatedRoute, private router: Router, private snackBar: MatSnackBar) {
    this.model = {} as SubProcess;
  }
  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.subProcessType = this.route.snapshot.paramMap.get('type');

    if (Number(this.subProcessType) === 1) {
      this.buttonText = ' Procedury';
    } else {
      this.buttonText = 'Instrukcje';
    }

    if (this.id) {
      this.subProcessService.getSubProcess(this.id).subscribe(x => {
        if (x) {
          this.htmlContent = x.htmlContent;
          this.model = x;
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
      this.subProcessService.updateSubProcess(this.model).subscribe(x => {
        this.displayMessage('Procedura zaktualizowana.');
      });
    } else {
      this.model = { id: '', name: '', htmlContent: this.htmlContent, subProcessType: Number(this.subProcessType) } as SubProcess;
      this.subProcessService.addSubProcess(this.model).subscribe(x => {
        this.displayMessage('Procedura dodana.');
      });
    }
  }

  displayMessage(message: string) {
    this.snackBar.open(message, '', { duration: 1500 });
  }
}
