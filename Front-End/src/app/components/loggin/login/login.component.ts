import { Component } from '@angular/core';
import { IndexLogicService } from 'src/app/services/index-logic.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  hide : boolean = false;
  constructor(private indexLogicService:IndexLogicService) {
    
  }
}
