import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Sale } from './sale';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SalesService {

  constructor(private http: HttpClient) { }

  getSales(): Observable<Sale[]>{
    return this.http.get<Sale[]>('/sales')
  }
}
