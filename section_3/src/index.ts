import { Observable, Subscription } from "rxjs";

const observable$=new Observable<number>(subscriber=>{
  let i:number=1;
  const intervalID=setInterval(()=>{
    console.log('Emitting (this will not stop even if we unsubscribe. that is the reason we have a teardown logic)');
    subscriber.next(i++);
  },2000);
  return ()=>{
    clearInterval(intervalID);
  }
});
const subscription:Subscription =observable$.subscribe({
  next: (value:number)=>{console.log(value);}
});
setTimeout(()=>{
  console.log('Unsubscribed');
  subscription.unsubscribe();
},9000);