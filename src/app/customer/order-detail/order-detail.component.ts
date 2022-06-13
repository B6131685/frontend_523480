import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css']
})
export class OrderDetailComponent implements OnInit {

  @Input() order !: any;
  selectORder = ''
  constructor() { }
  
  ngOnInit(): void {
    this.selectORder = this.order._id; 
  }

  openPDF(order:any){
    console.log('open PDF'+order);
    let DATA: any = document.getElementById(order);
    html2canvas(DATA).then((canvas) => {
      let fileWidth = 208;
      let fileHeight = (canvas.height * fileWidth) / canvas.width;
      const FILEURI = canvas.toDataURL('image/png');
      let PDF = new jsPDF('p', 'mm', 'a4');
      let position = 1;
      PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight);
      PDF.save(order+'.pdf');
      
    });
  }

  async openPDF2(order:any){
    const doc = new jsPDF('p', 'pt', 'a4');
    let DATA: any = document.getElementById(order);
    // await doc.html(DATA);
    // doc.save('test.pdf'); // save / download
    // doc.output('dataurlnewwindow'); // just open it

    // var doc = new jsPDF();

    doc.html(DATA, {
    callback: function (doc) {
       doc.save();
    },
    });
  }

}
