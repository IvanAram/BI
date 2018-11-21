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

  view: any[] = [700, 400];

  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Number';
  showYAxisLabel = true;
  yAxisLabel = 'Color Value';
  timeline = true;

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
    this.multi = [{
      name: 'Cyan',
      series: [{
        name: 5,
        value: 2650
      }, {
        name: 10,
        value: 2800
      }, {
        name: 15,
        value: 2000
      }]
    }, {
      name: 'Yellow',
      series: [{
        name: 5,
        value: 2500
      }, {
        name: 10,
        value: 3100
      }, {
        name: 15,
        value: 2350
      }]
    }];
  }

}
