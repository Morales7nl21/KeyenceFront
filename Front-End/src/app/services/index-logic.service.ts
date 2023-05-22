import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class IndexLogicService {
  private isAccepted:boolean=false;
  private isLogged:boolean=false;
  public id:number=0;
  constructor() { }
  public getIsAccepted():boolean{
    return this.isAccepted;
  }
  public setIsAccepted(isAccepted:boolean):void{
     this.isAccepted=isAccepted;
  }
  public setIsLogged(isLogin:boolean):void{
    this.isLogged=isLogin;
  }
  public getIsLogged():boolean{
    return this.isLogged;
  }
}
