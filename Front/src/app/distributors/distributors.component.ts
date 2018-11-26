import { Component, OnInit } from '@angular/core';
import { SalesService } from '../sales.service';
import { Sale } from '../sale';

@Component({
  selector: 'app-distributors',
  templateUrl: './distributors.component.html',
  styleUrls: ['./distributors.component.scss']
})
export class DistributorsComponent implements OnInit {
  sales: Sale[];
  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };

  distResults: Object[];
  distResults2: Object[];

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
    let distObj = {};
    let distSeries = [];
    let distSeries2 = [];
    let distStats = [];
    let distStats2 = [];
    for(let sale of this.sales){
      if(sale.distributor in distObj){
        if(sale.product in distObj[sale.distributor]){
          distObj[sale.distributor][sale.product].cash += sale.total_cash;
          distObj[sale.distributor][sale.product].count += sale.amount;
        } else{
          distObj[sale.distributor][sale.product] = {
            cash: sale.total_cash,
            count: sale.amount
          }
        }
      }else{
        distObj[sale.distributor] = {};
        distObj[sale.distributor][sale.product] = {
          cash: sale.total_cash,
          count: sale.amount
        };
      }
    }

    for(let d_key in distObj){
      distSeries = [];
      distSeries2 = [];
      for(let p_key in distObj[d_key]){
        distSeries.push({
          name: p_key,
          value: distObj[d_key][p_key].cash / 1000000
        });
        distSeries2.push({
          name: p_key,
          value: distObj[d_key][p_key].count
        });
      }
      distStats.push({
        name: d_key,
        series: distSeries
      });
      distStats2.push({
        name: d_key,
        series: distSeries2
      });
    }
    this.distResults = distStats;
    this.distResults2 = distStats2;
  }

}
