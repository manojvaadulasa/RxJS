/**
 *  This section is about the interval() RxJs operator. I have delibretly ommited the timer() operator as I 
 *  personally found it useless. Nevertheless, if it ever becomes useful go through the documentation.  
**/

import { Observable, Subscription, interval } from "rxjs";

//  This is the first method of using the interval. But through the use of Observables()
const interval$:Observable<number>=new Observable<number>(subscriber=>{
  let counter:number=0;
  setInterval(()=>{
    subscriber.next(counter++)
  },500)
  // This will keep on repeating itself like a for loop automatically.
});
const subscription1:Subscription=interval$.subscribe((value:number)=>{
  console.log("One");
  console.log(value);
});

//  This is the second method using the interval() RxJs observable.
const subscription2:Subscription=interval(500).subscribe((value:number)=>{
  console.log("Second");
  console.log(value);
});

setTimeout(()=>{
  subscription1.unsubscribe();
},5000);
setTimeout(()=>{
  subscription2.unsubscribe();
},10000);