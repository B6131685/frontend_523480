import { Component, OnInit, AfterViewInit, ViewChild, Inject } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';

import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

export interface ProductData { 
  id:String,
  model: String,
  brand: String,
  price: Number,
  stock: Number,
}




@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.css']
})

export class StockComponent implements OnInit ,AfterViewInit {
  Model = "Model";
  Allproduct : any;
  
  many = 0;

  fromDialog = '';

  displayedColumns: string[] = ['model', 'brand', 'price', 'stock', 'edit'];
  dataSource !: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator !: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;

  constructor(
    private ProductService:ProductService,
    public dialog: MatDialog
    ) { }

  ngOnInit(): void {
    this.ProductService.getAllProduct().subscribe(
      data =>{

        let arr : ProductData[] = [];
        // let arr2 : ProductData[] = [];
        let tod : ProductData = {id:"",
          model: "",
          brand: "",
          price: 0,
          stock: 0,};
        
        for (let index = 0; index < data.data.length; index++) {
          const element = data.data[index];
          tod.id = element.id;
          tod.model = element.spec[0].value;
          tod.brand = element.spec[1].value;
          tod.price = element.price;
          tod.stock = element.number;
          
          // console.log("index = "+index+" element = "+element.spec[0].value);
          // arr2.push(tod);          
          arr[index]= {
            id: element.id,
          model: element.spec[0].value,
          brand: element.spec[1].value,
          price: element.price,
          stock: element.number,
          };
          
          // console.log("arr2 after push   at index = "+index);
          // console.log(arr2);
        }
        
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
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '250px',
      data: {name: "kirito", animal: "animal"},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
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
    @Inject(MAT_DIALOG_DATA) public data: {name:String, animal:String},
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
