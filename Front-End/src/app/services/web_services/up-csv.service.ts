import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { enviroment } from 'src/enviroment/enviroment';
import { new_user } from 'src/app/models/send_user.model';
@Injectable({
  providedIn: 'root'
})
export class UpCsvService {
  deleteData(id: number) {
    let headers = new HttpHeaders().set('Authorization', 'Bearer ' + sessionStorage.getItem('token'));
    let uri = "/api/excel_data/";
    return this.http.delete(this.domain+uri+id,{headers});
  }
  private domain: string = enviroment.endpoint;
  resultApi:Observable<any> | undefined;
  constructor(private http: HttpClient) {}
  sendFile(body:FormData):Observable<any>{
    let headers = new HttpHeaders().set('Authorization', 'Bearer ' + sessionStorage.getItem('token'));
    let uri = "/api/excel_data/up_file";
    return this.http.post(this.domain+uri,body,{headers});
  }
  getDataFile(id:number){
    let uri = "/api/excel_data/";
    let headers = new HttpHeaders().set('Authorization', 'Bearer ' + sessionStorage.getItem('token'));

    return this.http.get(this.domain+uri,{params:{id:id},headers})
  }
  addData(user:new_user){
    let uri = "/api/excel_data/";
    let headers = new HttpHeaders().set('Authorization', 'Bearer ' + sessionStorage.getItem('token'));
    let body = {
      user_id:user.user_id,
      username:user.username,
      date:user.date,
      punchin:user.punchin,
      punchout:user.punchout,
      idfile:user.idfile
    }
    return this.http.post(this.domain+uri,body,{headers});
  }
  updateData(user:new_user,id:number){
    let uri = "/api/excel_data/";
    let headers = new HttpHeaders().set('Authorization', 'Bearer ' + sessionStorage.getItem('token'));
    let body = {
      user_id:user.user_id,
      username:user.username,
      date:user.date,
      punchin:user.punchin,
      punchout:user.punchout,
      idfile:user.idfile
    }
    return this.http.put(this.domain+uri+'/'+id,body,{headers});
  }
}
