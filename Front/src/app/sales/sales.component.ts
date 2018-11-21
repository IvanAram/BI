import { Component, OnInit } from '@angular/core';
import { SalesService } from '../sales.service';
import { Sale } from '../sale';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.scss']
})
export class SalesComponent implements OnInit {
  sales: Sale[];
  productStats: Object[] = [];

  view: any[] = [1500, 400];

  // options
  gradient = false;


  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };

  multi: Object[];

  constructor(private salesService: SalesService) { }

  ngOnInit() {
    this.getSales();
  }

  getSales(): void{
    this.salesService.getSales().subscribe(response => {
      this.sales = response;
      this.getStats();
    }, error => {
      console.log(error)
    });
  }

  getStats(): void{
    let statsObj = {};
    for(let sale of this.sales){
      if(sale.product in statsObj){
        statsObj[sale.product].total_cash += sale.total_cash;
      } else {
        statsObj[sale.product] = {
          total_cash: sale.total_cash
        }
      }
    }
    console.log(statsObj);
    for(let key of Object.keys(statsObj)){
      this.productStats.push({
        name: key,
        value: statsObj[key].total_cash
      });
    }
    this.multi = this.productStats;
  }

}
