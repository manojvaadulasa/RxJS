/**
 *  "fromEvent" is an RxJS observable that converts hardware events like mouse clicks into an observable
 *  in a very convinient method.  
**/
import { Observable, fromEvent } from "rxjs";

const triggerButton = document.querySelector('button#trigger');

//  The first method demonstrates the tradional method 
const triggerClick$ = new Observable<MouseEvent>(subscriber=>{
  triggerButton.addEventListener('click',(event:MouseEvent)=>{
    subscriber.next(event)
  })
});
const suscription1$=triggerClick$.subscribe(
  (event:MouseEvent)=>{
    console.log("---------------Normal way---------------");
    console.log(event.type,event.x,event.y);
    console.log("---------------Normal way---------------");
  }
);

//  The method using the "fromEvent" RxJS observable
const subscription2$=fromEvent<MouseEvent>(triggerButton,'click').subscribe(
  event=>{
    console.log("---------------fromEvent Observable---------------");
    console.log(event.type,event.x,event.y);
    console.log("---------------fromEvent Observable---------------");
  }
);

setTimeout(()=>{
  console.log("Unsubscribed");
  suscription1$.unsubscribe();
  subscription2$.unsubscribe();
},10000);