import { Component, OnInit, AfterViewInit, ViewChild, Inject } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';

import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

import { DialogEditSpecAtProductComponent } from '../add-product/add-product.component';


export interface ProductData { 
  id:String,
  model: String,
  brand: String,
  type: String,
  price: Number,
  stock: Number,
  date: Date
}




@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.css']
})

export class StockComponent implements OnInit ,AfterViewInit {
  Model = "Model";
  Allproduct : any;
  panelOpenState = false;
  many = 0;

  fromDialog = '';

  displayedColumns: string[] = ['model', 'brand', 'type','stock','price','date','edit'];
  dataSource !: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator !: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;

  constructor(
    private ProductService:ProductService,
    public dialog: MatDialog
    ) { }

  ngOnInit(): void {
    this.getAllProduct();
  }

  getAllProduct(){
    this.ProductService.getAllProduct().subscribe(
      data =>{
        console.log(data);
        
        let arr : ProductData[] = [];
        // let arr2 : ProductData[] = [];
  
      
        for (let index = 0; index < data.data.length; index++) {
          const element = data.data[index];
          // tod.id = element.id;
          // tod.model = element.spec[0].value;
          // tod.brand = element.spec[1].value;
          // tod.price = element.price;
          // tod.stock = element.number;
          
          // console.log("index = "+index+" element = "+element.spec[0].value);
          // arr2.push(tod);
        
            const d = new Date()
            
          
          
          arr[index]= {
          id: element.id,
          model: element.spec[0].value,
          brand: element.spec[1].value,
          type: element.type.name,
          price: element.price,
          stock: element.number,
          date: element.date
          };
          
          // console.log("arr2 after push   at index = "+index);
          // console.log(arr2);
        }
        console.log(arr);
        
        // ที่ต้องสร้าง arr เพราะว่า data ที่ได้มาจาก backend ไม่สามารถ sort หรือ filter กับ Angular MAt อาจเพราะมีชื่อ feild ซ้ำหรือโครงสร้างซ้อนเกินไปรึปล่าว
        this.dataSource = new MatTableDataSource(arr);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      err => {
        alert(err.error.error.message);
      }
    )
  }

  ngAfterViewInit(){
    // this.dataSource.paginator = this.paginator;
    // this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    console.log("work applyFilter");
    
    const filterValue = (event.target as HTMLInputElement).value;
    
    for (let index = 0; index < this.dataSource.data.length; index++) {
      console.log(index+': ');
      console.log(typeof(this.dataSource.data[index].date));
      console.log(this.dataSource.data[index].date.toString());
    }

    this.dataSource.filter = filterValue.trim().toLowerCase();
    // console.log(this.dataSource.data);
    
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  //open Dialog for edit stock
  openDialogStock(row:ProductData): void {  
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '500px',
      data: row,
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.getAllProduct();
      this.fromDialog = result;
    });
  }

   //open Dialog for edit Product Detail
   openDialogEditProductDetail(row:any): void {  
    const dialogRef = this.dialog.open(DialogSettingProduct, {
      width: '80%',
      height: '90%',
      data: row,
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.getAllProduct();
      this.fromDialog = result;
    });
  }

  //open Dialog for add new Product to DB
  openDialogAddNewProduct(): void {  
    const dialogRef = this.dialog.open(DialogNewProduct, {
      width: '80%',
      height: '90%',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.getAllProduct();
      this.fromDialog = result;
    });
  }
}

@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'dialog-overview-example-dialog.html',
})
export class DialogOverviewExampleDialog {



  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data:ProductData ,
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}

@Component({
  selector: 'dialog-edit-detail-product',
  templateUrl: 'dialog-edit-detail-product.html',
})
export class DialogSettingProduct {



  constructor(
    public dialogRef: MatDialogRef<DialogSettingProduct>,
    @Inject(MAT_DIALOG_DATA) public data:ProductData ,
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}

@Component({
  selector: 'dialog-new-product',
  templateUrl: 'dialog-new-product.html',
})
export class DialogNewProduct {

  constructor(
    public dialogRef: MatDialogRef<DialogNewProduct>,
    public DialogEditSpec: MatDialogRef<DialogEditSpecAtProductComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any ,
  ) {
    this.DialogEditSpec.afterClosed().subscribe(()=>{
      console.log("DialogEditSpec close");
      
    })
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  


}



