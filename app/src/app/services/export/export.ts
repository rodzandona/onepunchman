import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from '../http/http';

export interface BoxRequest {
  boxCode: string;
  products: string[];
}

export interface ExportRequest {
  email: string;
  boxes: BoxRequest[];
}

@Injectable({
  providedIn: 'root'
})
export class ExportService {
  private endpoint = 'export';

  constructor(private http: HttpService) {}

  sendExcel(request: ExportRequest): Observable<any> {
    return this.http.post<any>(`${this.endpoint}/send-excel`, request);
  }
}
