/*
  This is an example of the creation operator "of"
  The following has 3 examples and all 3 examples give the same output in the console.
  Here we provide multiple arguments. But in the "from" operator we provide an array as the argument. 
*/

import { Observable, Subscriber, of } from "rxjs";

// This is the first way of creating observables
console.log('First way:-');
new Observable<string>((subscriber:Subscriber<string>)=>{
  subscriber.next('Rama');
  subscriber.next('Lakshmana');
  subscriber.next('Sita');
  subscriber.complete();
}).subscribe({
  next: (value:string)=>{console.log(value);},
  complete: ()=>{console.log("Jai Siya Ram");}
}); 

// This is the second way of creating observables
console.log('Second way:-');
function secondWay(...args:string[]):Observable<string>{
  return new Observable<string>((subscriber:Subscriber<string>)=>{
    for(let i=0;i<args.length;i++){
      subscriber.next(args[i]);
    }
    subscriber.complete();
  });
}
secondWay('Rama','Lakshmana','Sita').subscribe({
  next: (value:string)=>{console.log(value);},
  complete: ()=> console.log('Jai Siya Ram')
});

// This is the third way and the easiest way using "of" creation function of RxJS
console.log('Third way:-');
of('Rama','Lakshmana','Sita').subscribe({
  next: (value:string)=> console.log(value),
  complete: ()=> console.log("Jai Siya Ram")
})