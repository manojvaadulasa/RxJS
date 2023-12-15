import { Observable, Subscription } from 'rxjs';

const someObservable$:Observable<string> = new Observable<string>(subscriber => {
  subscriber.next('Alice');
  setTimeout(()=>{subscriber.next('Ben')},2000);
  setTimeout(()=>{subscriber.next('Charlie 1')},4000);
  subscriber.next('Charlie 2');
  //subscriber.complete(); //If this was not commented we would get only Alice and Charlie 2.
});

// someObservable$.subscribe(value => console.log(value));
const observer1={
  next: (value: string)=> console.log('1:',value)
}
const observer2={
  next: (value: string)=> console.log('2:',value),
  complete: ()=>{console.log('Completed without unsubscribing. But complete method must be uncommented. Else this wont work');}
}
// observer1 and observer2 are of type Observer<string>
someObservable$.subscribe(observer1);
someObservable$.subscribe(observer2);
// const subscription:Subscription= someObservable$.subscribe(observer);
// setTimeout(()=>{
//   console.log('Unsubscibe initiated and completed')
//   subscription.unsubscribe()
// },3000);