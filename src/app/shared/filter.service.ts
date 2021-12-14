import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FilterService {

  today: any = new Date();
  currentMonth: any = new Date();
  lastTwo: any = new Date();
  lastThree: any = new Date();
  lastSix: any = new Date();
  lastNine: any = new Date();
  e =this.currentMonth.setMonth(this.today.getMonth() - 1);
  a = this.lastTwo.setMonth(this.today.getMonth() - 2);
  b: any = this.lastThree.setMonth(this.today.getMonth() - 3);
  c: any = this.lastSix.setMonth(this.today.getMonth() - 6);
  d: any = this.lastNine.setMonth(this.today.getMonth() - 9);

  cOptions: any = {
    items: 1,
    dots: true,
    nav: true,
    lazyLoad: true,
    autoplay: false,
    loop: true,
    autoHeight: false
  }

  menuOptions: any = {
    dots: false,
    nav: false,
    lazyLoad: true,
    autoplay: false,
    loop: false,
    autoHeight: false,
     responsive:{
        0:{
            items:3
        },
        600:{
            items:4
        },
        1000:{
            items:5
        }
    }
  }

  monthFilter: any = [this.currentMonth.getTime(), this.lastTwo.getTime(), this.lastThree.getTime(), this.lastSix.getTime(), this.lastNine.getTime()];

  constructor() { }


  weekCalculator(mCount: number, m: number) {
    const weeks=[];
    for(let i = mCount+1; i >= 0; i--) {
      let thisMon = new Date();

      let a = thisMon.setMonth(m - i);

      let month = thisMon.getMonth();
      let year = thisMon.getFullYear();


      const daysName = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

      const  lastDate = new Date(year, month + 1, 0);
      let start: number=0;
      let end: number;

      for (let i = 1; i < lastDate.getDate()+1; i++) {
        if (daysName[Number(new Date(year, month, i).getDay())] =="Sunday" || i == lastDate.getDate()) {
          end= i;
          weeks.push({
              start:new Date(year, month, start+1),
              end:new Date(year, month, end)
          });
            start = i;
        }
      }
    }
    return weeks;
  }

  getWeeksStartAndEndInMonth(month:any, year:any) {
    let weeks = [];
    month = (month *30)/7;
    for (let i=0; i< month; i++) {
       // Days you want to subtract
      let start;
      if (weeks.length === 0) {
         start = new Date();
      } else {
        start = new Date(weeks[weeks.length -1].end);
      }
      var end = new Date(start.getTime() - (7 * 24 * 60 * 60 * 1000));
      weeks.push({start: start, end: end});
    }
    return weeks;
  }

  getDaysStartAndEndInMonth(day:any, year:any) {
    let days = [];
    day = day * 7;
    for (let i=0; i< day; i++) {
       // Days you want to subtract
      let start;
      if (days.length === 0) {
         start = new Date();
      } else {
        start = new Date(days[days.length -1].end);
      }
      var end = new Date(start.getTime() - (1 * 24 * 60 * 60 * 1000));
      days.push({start: start, end: end});
    }
    return days;
  }

  cleanPrice(amount: any) {
    if (isNaN(amount)) {
        return parseInt(amount.replace(/[^a-zA-Z0-9]/g, '')) ;
    } else {
      return parseInt(amount);
    }
  }

  filterByDate(billData: any, startDate: any, endDate: any): void {
    let data: any = {list: [], price: 0};
    //this.billList = this.billData.filter((bill: any) => new Date(bill.date).getTime() >= this.lastTwo.getTime() && new Date(bill.date).getTime() <= this.today.getTime());
    data.list = billData.filter((bill: any) => new Date(bill.date).getTime() >= endDate && new Date(bill.date).getTime() <= startDate);
  //  console.log(data.list);
    if(data.list) {
      data.list.forEach(bill => {
        data.price += parseInt(bill.total.replace(/[^a-zA-Z0-9]/g, ''));
      });
      data.price = data.price / 100;
    }

    return data;
  }

  filterByDateCash(billData: any, startDate: any, endDate: any): void {
   // console.log(billData);
    let data: any = {list: [], price: 0};
    //console.log(startDate);
   // console.log(endDate);
    //this.billList = this.billData.filter((bill: any) => new Date(bill.date).getTime() >= this.lastTwo.getTime() && new Date(bill.date).getTime() <= this.today.getTime());

    data.list = billData.filter((bill: any) => new Date(bill.billDetails.date).getTime() >= endDate && new Date(bill.billDetails.date).getTime() <= startDate);
    //console.log(data.list);
    if(data.list) {
      data.list.forEach(bill => {
        data.price += parseInt(bill.billDetails.total.replace(/[^a-zA-Z0-9]/g, ''));
      });
      data.price = data.price;
    }

    return data;
  }

  filterByBillDate(billData: any, startDate: any, endDate: any): void {
    let data: any = {list: [], price: 0};
   // console.log(billData);
    //this.billList = this.billData.filter((bill: any) => new Date(bill.date).getTime() >= this.lastTwo.getTime() && new Date(bill.date).getTime() <= this.today.getTime());
    data.list = billData.filter((bill: any) => new Date(bill.billDetails.date).getTime() >= endDate && new Date(bill.billDetails.date).getTime() <= startDate);

    if(data.list) {
      data.list.forEach(bill => {
        console.log(bill.billDetails.total);
        data.price += parseInt(bill.billDetails.total.replace(/[^a-zA-Z0-9]/g, ''));
      });
      data.price = data.price;
    }

    return data;
  }



  filterByBillDatecash(billData: any, startDate: any, endDate: any): void {
    console.log(billData);
    let data: any = {list: [], price: 0};
    data.list = billData.filter((bill: any) => new Date(bill.billDetails.date).getTime() >= startDate && new Date(bill.billDetails.date).getTime() <= endDate);
    console.log(data.list);
    if(data.list) {

      data.list.forEach(bill => {
        data.price += parseInt(bill.billDetails.total.replace(/[^a-zA-Z0-9]/g, ''));

      });
      data.price = data.price;
    }
     // console.log(data);
    return data;
  }

}
