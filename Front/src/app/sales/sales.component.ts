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
  select: number = 0;

  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };
  multi: Object[];
  gridResults: Object[];
  lineResults: Object[];
  lineResults2: Object[];
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
    let statsObj = {};
    let distObj = {};
    let sale_date;
    let month;
    let productStats = [];
    let productStats2 = [];
    let monthsArray;
    let monthsArray2;
    let historicalStats = [];
    let historicalStats2 = [];
    let distSeries = [];
    let distSeries2 = [];
    let distStats = [];
    let distStats2 = [];
    for(let sale of this.sales){
      sale_date = new Date(sale.sale_date);
      sale_date.setHours(sale_date.getHours() + 12);
      month = sale_date.getMonth();

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
      if(sale.product in statsObj){
        statsObj[sale.product].total_cash += sale.total_cash;
        statsObj[sale.product].total_count += sale.amount;
        if(month in statsObj[sale.product].dates){
          statsObj[sale.product].dates[month].cash += sale.total_cash;
          statsObj[sale.product].dates[month].count += sale.amount;
        } else{
          statsObj[sale.product].dates[month] = {
            cash: sale.total_cash,
            count: sale.amount
          };
        }
      } else {
        statsObj[sale.product] = {
          total_cash: sale.total_cash,
          total_count: sale.amount,
          dates: []
        }
        statsObj[sale.product].dates[month] = {
          cash: sale.total_cash,
          count: sale.amount
        };
      }
    }
    for(let key in statsObj){
      monthsArray = [];
      monthsArray2 = [];
      for(let m in statsObj[key].dates){
        monthsArray.push({
          name: this.getMonth(parseInt(m)),
          value: statsObj[key].dates[m].cash / 1000000
        });
        monthsArray2.push({
          name: this.getMonth(parseInt(m)),
          value: statsObj[key].dates[m].count
        });
      }
      // Historical data
      historicalStats.push({
        name: key,
        series: monthsArray
      });

      historicalStats2.push({
        name: key,
        series: monthsArray2
      });

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
    this.lineResults = historicalStats;
    this.lineResults2 = historicalStats2;
    this.multi = productStats;
    this.gridResults = productStats2;
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

  getMonth(month: number): string{
    if(month == 0){
      return "Enero";
    }
    else if(month == 1){
      return "Febrero";
    }
    else if(month == 2){
      return "Marzo";
    }
    else if(month == 3){
      return "Abril";
    }
    else if(month == 4){
      return "Mayo";
    }
    else if(month == 5){
      return "Junio";
    }
    else if(month == 6){
      return "Julio";
    }
    else if(month == 7){
      return "Agosto";
    }
    else if(month == 8){
      return "Septiembre";
    }
    else if(month == 9){
      return "Octubre";
    }
    else if(month == 10){
      return "Noviembre";
    }
    else if(month == 11){
      return "Diciembre";
    }
  }

  formatCurrency(val){
    return "$" + val.toLocaleString();
  }

}
