/*
  This is an example of a COLD OBSERVABLE.
  Cold observable is the one which could emit new values on each subscription.
  For example, a HTTP request is a cold observable as it can emit new values as the data within 
  the server may get updated constantly. Hence this is called as a cold observable.
*/
import { ajax } from 'rxjs/ajax';
const ajax$ = ajax<any>('https://random-data-api.com/api/v2/banks');
ajax$.subscribe({
  next: data=>console.log(data.response.bank_name)
});
ajax$.subscribe({
  next: data=>console.log(data.response.bank_name)
});
ajax$.subscribe({
  next: data=>console.log(data.response.bank_name)
});
/*
  When this is run, 3 different bank names are displayed in the console
*/