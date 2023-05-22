import { Component } from '@angular/core';
import { user } from 'src/app/models/request_user.model';
import { LoginRegisterServiceTsService } from 'src/app/services/credential/login-register.service.ts.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  contrasena:string="";
  usuario:string="";
  is_loading:boolean=false;
  hide:boolean=true;
  constructor(private loginRegisterServiceTsService:LoginRegisterServiceTsService) {

  }
  Registrarse(){

    this.loginRegisterServiceTsService.register(new user(this.usuario,this.contrasena)).subscribe({
      next:(value)=>{
        if(Object.keys(value).includes("msg")){
          Swal.fire({
            icon: 'success',
            text: `Se ha creado el usuario de forma correcta`,
            heightAuto: false,
          });
        }else{
          Swal.fire({
            icon: 'error',
            text: `No se ha creado el usuario`,
            heightAuto: false,
          });
        }
      }
    })
  }
}
