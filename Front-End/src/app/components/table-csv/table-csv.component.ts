import { Component, OnInit } from '@angular/core';
import { ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, Sort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { UpCsvService } from 'src/app/services/web_services/up-csv.service';
import swal from 'sweetalert2';
import { IndexLogicService } from 'src/app/services/index-logic.service';
import { new_user } from 'src/app/models/send_user.model';

@Component({
  selector: 'app-table-csv',
  templateUrl: './table-csv.component.html',
  styleUrls: ['./table-csv.component.css'],
})
export class TableCSVComponent implements OnInit {
  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  dataSource: any;
  headerColumnas: string[] = ['user_id', 'username', 'date', 'punchin', 'punchout', 'delete', 'update'];
  isLoading: boolean = true;

  displayStyle = "none";
  displayStyle2 = "none";
  user:new_user = new new_user();
  updateuser:new_user =new new_user();
  idupdateuser:number=-1;
  constructor(private upCsvService: UpCsvService,private indexLogicService:IndexLogicService) {
    this.isLoading=true;

  }
  updateConfirm(){
    this.upCsvService.updateData(this.updateuser,this.idupdateuser).subscribe({
      next:(value:any)=>{
        if(Object.keys(value).includes("msg")){
          swal.fire({
            icon: 'success',
            text: `Se ha actualizado el registro de forma correcta`,
            heightAuto: false,
          });
          this.closePopup2();
        }
        else{
          swal.fire({
            icon: 'error',
            text: `Uno o más datos no son correctos`,
            heightAuto: false,
          });
        }
      }
    })
  }
  updateData(user:new_user, id:number){
    this.updateuser=user;
    this.idupdateuser=id;
    console.log("Updating",user);
    this.openPopup2();
  }
  agregarRegistro() {
    this.user =new new_user();
    this.openPopup();
  }
  acceptNewUser(){
    this.user.idfile=this.indexLogicService.id;
    this.upCsvService.addData(this.user).subscribe({
      next:(value:any)=>{
        if(Object.keys(value).includes('msg')){
          swal.fire({
            icon: 'success',
            text: `Se ha agregado el registro de forma correcta`,
            heightAuto: false,
          });
          const newRow = {
            user_id:this.user.user_id,
            username:this.user.username,
            date:this.user.date,
            punchin:this.user.punchin,
            punchout:this.user.punchout,
            idfile:this.user.idfile,
            idexceldata:value.id
          }

          this.dataSource.data = [newRow, ...this.dataSource.data];
          this.closePopup();
        }

      }
    })
  }

  openPopup() {
    this.displayStyle = "block";
  }
  closePopup() {
    this.displayStyle = "none";
  }
  openPopup2() {
    this.displayStyle2 = "block";
  }
  closePopup2() {
    this.displayStyle2 = "none";
  }

   ngOnInit(){
          this.upCsvService.getDataFile(this.indexLogicService.id).subscribe({
            next:(value:any)=>{
              console.log(value)
              if(Object.keys(value).includes('excelData')){
                console.log("Keys",Object.values(value))
                this.dataSource = new MatTableDataSource(value['excelData']);
                this.dataSource.sort = this.sort;
                this.paginator._intl.itemsPerPageLabel = 'Página';
                this.dataSource.paginator = this.paginator;
                this.isLoading=false;
              }
            }
          });
  }

  filtrar(event: Event) {
    const filtro = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filtro;
  }

  sortData(sort: Sort) {
    const orderData = this.dataSource.slice();
    if (!sort.active || sort.direction === '') {
      this.sortData = orderData;
    }
  }
  deleteData(id:number){
    swal.fire({
      icon: 'info',
      text: `¿Esta seguro de eliminar el registro?`,
      heightAuto: false,
      showDenyButton:true
    }).then((value:any)=>{
      if(value.isConfirmed===true){
        this.upCsvService.deleteData(id).subscribe({
          next:(value:any)=>{
            if(Object.keys(value).includes("msg")){
              this.dataSource.data = this.dataSource.data.filter((u:any) => u.idexceldata !== id);
            }
          },
          error: (response: any) => {
            swal.fire({
              icon: 'error',
              text: `Error en el servidor`,
              heightAuto: false,
            })
          },
        })
      }
    });


  }
}
