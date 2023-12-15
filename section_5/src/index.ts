import { Observable } from "rxjs";

/*
  This is an example of a HOT OBSERVABLE. 
  The logged values will be the same in all the subscriptions
*/
const queryButton= document.querySelector('button#hello');
const hotObservable$=new Observable<MouseEvent>(subscriber=>{
  queryButton.addEventListener('click',(event:MouseEvent)=>{
    subscriber.next(event);
  })
});
hotObservable$.subscribe((event:MouseEvent)=>{
  console.log('First subscription', event.type, event.x, event.y);
});
hotObservable$.subscribe((event:MouseEvent)=>{
  console.log('Second subscription', event.type, event.x, event.y);
});