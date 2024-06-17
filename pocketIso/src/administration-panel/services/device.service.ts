import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseApiService } from '../../common/services/base-api.service';
import { Device } from '../models/device.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DeviceService extends BaseApiService {

  constructor(
    protected override http: HttpClient) {
    super(http);
  }

  public getDevices(): Observable<Device[]> {
    return this.getAsync<Device[]>(`device/getdevices`);
  }

  public getDevice(id: string): Observable<Device> {
    return this.getAsync<Device>(`device/getdevice/${id}`);
  }

  public addDevice(device: Device): Observable<Device> {
    return this.postAsync<Device>(`device/adddevice`, device);
  }

  public updateDevice(device: Device): Observable<Device> {
    return this.postAsync<Device>(`device/updatedevice`, device);
  }

  public deleteDevice(id: string): Observable<Device> {
    return this.deleteAsync<Device>(`device/delete/${id}`);
  }

}
