import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { DeviceService } from '../../../../administration-panel/services/device.service';
import { Device } from 'src/administration-panel/models/device.model';
import { Category } from 'src/administration-panel/models/category.model';

@Component({
  selector: 'app-add-device',
  templateUrl: './add-device.component.html',
  styleUrls: ['./add-device.component.css']
})
export class AddDeviceComponent implements OnInit {

  deviceForm = new FormGroup({
    id: new FormControl(''),
    name: new FormControl('', Validators.required),
    number: new FormControl('', Validators.required),
    deviceType: new FormControl(1, Validators.required),
    firstOverviewDate: new FormControl(new Date()),
    nextOverviewDate: new FormControl(new Date())
  });

  nameValue = this.deviceForm.get('name');
  numberValue = this.deviceForm.get('number');
  id: string | null = '';
  deviceTypes: Category[] | undefined;
  constructor(private deviceService: DeviceService, private route: ActivatedRoute, private snackBar: MatSnackBar,
    private router: Router) { }

  ngOnInit() {
    this.getDeviceTypes();
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) {
      this.getDevice(this.id);
    }
  }

  getDevice(id: string) {
    this.deviceService.getDevice(id).subscribe(x => {
      this.deviceForm.patchValue({
        id: x.id,
        name: x.name,
        number: x.number,
        deviceType: x.deviceType,
        firstOverviewDate: x.firstOverviewDate,
        nextOverviewDate: x.nextOverviewDate
      });
    })
  }

  onSubmit() {
    if (this.deviceForm.valid) {
      if (this.id) {
        this.deviceService.updateDevice(this.deviceForm.value as Device).subscribe(x => {
          this.displayMessage('Urządzenie zaktualizowany.');
        });
      } else {
        this.deviceService.addDevice(this.deviceForm.value as Device).subscribe(x => {
          this.displayMessage('Urządzenie dodane.');
          this.resetDeviceForm();
        });
      }
    }
  }

  displayMessage(message: string) {
    this.snackBar.open(message, '', { duration: 1500 });
  }

  resetDeviceForm() {
    this.deviceForm.patchValue(
      {
        id: '',
        name: '',
        number: '',
        deviceType: 1,
        firstOverviewDate: new Date(),
        nextOverviewDate: new Date()
      }
    );

    this.nameValue?.setErrors(null);
  }

  redirectToDevices(): void {
    this.router.navigateByUrl(`devices`);
  }

  getDeviceTypes() {
    this.deviceTypes =
    [
      { value: 1, name: 'Maszyna' } as Category,
      { value: 2, name: 'Urządzenie' } as Category
    ];
  }
}
