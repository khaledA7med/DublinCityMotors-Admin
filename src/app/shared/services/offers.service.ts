import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class OffersService {
  private readonly env: string = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getAllOffers(): Observable<any> {
    return this.http.get(this.env + `offers/getActiveOffers`);
  }

  addOffers(data: any): Observable<any> {
    return this.http.post(this.env + `offers/addOffer`, data);
  }

  updateOffers(data: any): Observable<any> {
    return this.http.put(this.env + `offers/updateOffer`, data);
  }
}
