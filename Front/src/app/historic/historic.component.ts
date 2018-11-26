import { Component, OnInit } from '@angular/core';
import { SalesService } from '../sales.service';
import { Sale } from '../sale';

@Component({
  selector: 'app-historic',
  templateUrl: './historic.component.html',
  styleUrls: ['./historic.component.scss']
})
export class HistoricComponent implements OnInit {
  sales: Sale[];
  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };
  lineResults: Object[];
  lineResults2: Object[];

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
    let sale_date;
    let month;
    let monthsArray;
    let monthsArray2;
    let historicalStats = [];
    let historicalStats2 = [];
    for(let sale of this.sales){
      sale_date = new Date(sale.sale_date);
      sale_date.setHours(sale_date.getHours() + 12);
      month = sale_date.getMonth();
      if(sale.product in statsObj){
        if(month in statsObj[sale.product]){
          statsObj[sale.product][month].cash += sale.total_cash;
          statsObj[sale.product][month].count += sale.amount;
        } else{
          statsObj[sale.product][month] = {
            cash: sale.total_cash,
            count: sale.amount
          };
        }
      } else {
        statsObj[sale.product] = [];
        statsObj[sale.product][month] = {
          cash: sale.total_cash,
          count: sale.amount
        };
      }
    }
    for(let key in statsObj){
      monthsArray = [];
      monthsArray2 = [];
      for(let m in statsObj[key]){
        monthsArray.push({
          name: this.getMonth(parseInt(m)),
          value: statsObj[key][m].cash / 1000000
        });
        monthsArray2.push({
          name: this.getMonth(parseInt(m)),
          value: statsObj[key][m].count
        });
      }
      historicalStats.push({
        name: key,
        series: monthsArray
      });

      historicalStats2.push({
        name: key,
        series: monthsArray2
      });
    }

    this.lineResults = historicalStats;
    this.lineResults2 = historicalStats2;
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
}
