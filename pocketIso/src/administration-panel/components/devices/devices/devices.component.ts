import { Component, OnInit } from '@angular/core';
import { Device } from '../../../../administration-panel/models/device.model';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { DeviceService } from '../../../../administration-panel/services/device.service';
import { AuthService } from '../../../../common/auth/auth.service';
import { Role } from '../../../../common/enums/user-role-codes';
import { MatTableDataSource } from '@angular/material/table';
import { ConfirmationDialogComponent } from '../../../../common/components/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-devices',
  templateUrl: './devices.component.html',
  styleUrls: ['./devices.component.css']
})
export class DevicesComponent implements OnInit {

  devices1: Device[] = [];
  devices2: Device[] = [];
  displayedColumns: string[] = ['name', 'number', 'firstOverviewDate', 'nextOverviewDate', 'edit', 'delete'];
  role: string = '';
  constructor(private router: Router, private snackBar: MatSnackBar, public dialog: MatDialog,
    private deviceService: DeviceService, private authService: AuthService) { }

  ngOnInit() {

    this.getDevices();

    this.role = this.authService.getRole();

    if (this.role === Role.SuperAdmin || this.role === Role.Admin) {
      this.displayedColumns = ['name', 'number', 'firstOverviewDate', 'nextOverviewDate', 'edit', 'delete'];
    } else {
      this.displayedColumns = ['name', 'number', 'firstOverviewDate', 'nextOverviewDate'];
    }
  }


  dataSource1 = new MatTableDataSource(this.devices1);
  dataSource2 = new MatTableDataSource(this.devices2);

  getDevices() {
    this.deviceService.getDevices().subscribe(x => {
      if (x && x.length > 0) {
        this.devices1 = x.filter(x => x.deviceType === 1);
        this.devices2 = x.filter(x => x.deviceType === 2);
        console.log(this.devices1);
        this.dataSource1.data = this.devices1;
        this.dataSource2.data = this.devices2;
      }
    });
  }

  applyFilter1(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource1.filter = filterValue.trim().toLowerCase();
  }

  applyFilter2(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource2.filter = filterValue.trim().toLowerCase();
  }

  addDevice() {
    this.router.navigateByUrl(`add-device`);
  }

  editDevice(id: string) {
    this.router.navigateByUrl(`add-device/${id}`);
  }

  delete(element: Device) {
    if (element) {
      const dialogRef = this.dialog.open(ConfirmationDialogComponent, { data: { text: 'Czy napewno chcesz usunąć?' } });

      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.deviceService.deleteDevice(element.id)
            .subscribe(x => {
              this.displayMessage('Usunięto urządzenie.');
              this.getDevices();
            })
        }
      })
    }
  }

  displayMessage(message: string) {
    this.snackBar.open(message, '', { duration: 2500 });
  }
}
