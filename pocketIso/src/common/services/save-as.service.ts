import { Injectable } from '@angular/core';
import { FileSaverOptions, saveAs } from 'file-saver';

@Injectable({
  providedIn: 'root'
})
export class SaveAsService {
  public save(data: Blob | string, fileName?: string, options?: FileSaverOptions) {
    saveAs(data, fileName, options);
  }
}
