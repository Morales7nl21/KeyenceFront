import { Component } from '@angular/core';
import { IndexLogicService } from 'src/app/services/index-logic.service';
import { UpCsvService } from 'src/app/services/web_services/up-csv.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-upfile',
  templateUrl: './upfile.component.html',
  styleUrls: ['./upfile.component.css'],
})
export class UpfileComponent {
  isSelectedFile = false;
  isAcceptedFile: boolean;
  name: string = '';
  fileTmp: any;
  files: File[] = [];

  constructor(
    private indexLogicService: IndexLogicService,
    private upCsvService: UpCsvService
  ) {
    this.isAcceptedFile = this.indexLogicService.getIsAccepted();
  }

  onSelect2(event: { addedFiles: any }) {
    console.log(event);
    this.files.push(...event.addedFiles);
    this.fileTmp = {
      fileRaw: this.files[0],
    };
    this.name = this.files[0].name;

    swal
      .fire({
        title: 'Confirmación de datos',
        text: `Se ha seleccionado el archivo: ${this.files[0].name}`,
        showDenyButton: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          this.acceptFile();
        } else if (result.isDenied) {
          this.onRemove();
        }
      });
  }

  acceptFile() {
    var body = new FormData();
    body.append('tec', this.fileTmp.fileRaw);
    body.append('username', sessionStorage.getItem('username')!);
    this.upCsvService.sendFile(body).subscribe({
      next: (value: any) => {
        if (Object.keys(value).includes('id')) {
          this.indexLogicService.id = value['id'] as number;
          this.indexLogicService.setIsAccepted(true);
        }
      },
    });
  }

  onRemove() {
    this.files.pop();
    this.isSelectedFile = !this.isSelectedFile;
  }
}
