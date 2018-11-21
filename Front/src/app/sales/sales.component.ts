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
  totalCash: number = 0;
  highestSale: Sale;
  productStats: Object = {};
  objectkeys: Function = Object.keys;

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
    this.highestSale = this.sales[0];
    for(let sale of this.sales){
      this.totalCash += sale.total_cash;

      if(sale.total_cash > this.highestSale.total_cash){
        this.highestSale = sale;
      }

      if(sale.product in this.productStats){
        this.productStats[sale.product].count += 1;
        this.productStats[sale.product].total_cash += sale.total_cash;
        this.productStats[sale.product].amount += sale.amount;
      } else {
        this.productStats[sale.product] = {
          count: 1,
          total_cash: sale.total_cash,
          amount: sale.amount,
        }
      }
    }
    console.log(this.totalCash);
    console.log(this.highestSale);
    console.log(this.productStats);
  }

}
