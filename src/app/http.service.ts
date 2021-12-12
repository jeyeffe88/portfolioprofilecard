import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgxSpinnerService } from "ngx-spinner";
import { finalize } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})


export class HttpService {
  
  constructor(
    private httpClient: HttpClient,
    public spinner: NgxSpinnerService
  ) { }

  //method to get data
  sendGetRequest(apiUrl:any) {
    this.spinner.show();
    return this.httpClient.get(apiUrl).pipe(finalize(() => this.spinner.hide()));
  }
}