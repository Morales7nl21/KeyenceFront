import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { user } from 'src/app/models/request_user.model';
import { enviroment } from 'src/enviroment/enviroment';

@Injectable({
  providedIn: 'root'
})
export class LoginRegisterServiceTsService {
  private domain: string = enviroment.endpoint;
  resultApi:Observable<any> | undefined;
  constructor(private http: HttpClient) {}
  login(body:user):void{

    let uri = "/api/excel_data/login";
    this.resultApi =  this.http.post(this.domain+uri,body);
  }
  register(body:user):Observable<any>{

    let uri = "/api/excel_data/register";
    return this.http.post(this.domain+uri,body);
  }
}
