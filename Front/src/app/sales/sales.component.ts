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

  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };
  multi: Object[];
  gridResults: Object[];
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
    let productStats = [];
    let productStats2 = [];
    for(let sale of this.sales){
      if(sale.product in statsObj){
        statsObj[sale.product].total_cash += sale.total_cash;
        statsObj[sale.product].total_count += sale.amount;
      } else {
        statsObj[sale.product] = {
          total_cash: sale.total_cash,
          total_count: sale.amount
        }
      }
    }
    for(let key in statsObj){
      // Products data
      productStats.push({
        name: key,
        value: statsObj[key].total_cash
      });

      productStats2.push({
        name: key,
        value: statsObj[key].total_count
      });
    }
    this.multi = productStats;
    this.gridResults = productStats2;
  }

  formatCurrency(val){
    return "$" + val.toLocaleString();
  }

}
