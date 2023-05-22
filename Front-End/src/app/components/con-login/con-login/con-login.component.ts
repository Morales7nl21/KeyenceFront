import { Component } from '@angular/core';
import { user } from 'src/app/models/request_user.model';
import { LoginRegisterServiceTsService } from 'src/app/services/credential/login-register.service.ts.service';
import { IndexLogicService } from 'src/app/services/index-logic.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-con-login',
  templateUrl: './con-login.component.html',
  styleUrls: ['./con-login.component.css']
})
export class ConLoginComponent {
  contrasena:string="";
  usuario:string="";
  is_loading:boolean=false;
  hide:boolean=true;
  constructor(private loginRegisterServiceTsService:LoginRegisterServiceTsService, private indexLogicService:IndexLogicService) {

  }
  logearse(){
    this.loginRegisterServiceTsService.login(new user(this.usuario,this.contrasena));
    this.loginRegisterServiceTsService.resultApi?.subscribe({
      next:(value:any)=>{
        if(Object.keys(value).includes("username") && Object.keys(value).includes("token")){
          sessionStorage.setItem("username",value.username);
          sessionStorage.setItem("token",value.token);
          this.indexLogicService.setIsLogged(true);
        }
        else{
          Swal.fire({
            icon: 'error',
            title: 'Credenciales incorrectas',
            text: '¡El usuario y contraseña ingresado es incorrecto!'
          })
        }
      }
    })
  }
}
