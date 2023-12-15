/*
  Unlike the "of" operator here in the "from" operator we provide a single array as an argument
  Also, in the "from" opearator we can change a Promise into an Observable. 
*/
import { from } from "rxjs";

from(["Rama","Krishna","Madhava"]).subscribe((result:string)=>{
  console.log(result);
});

const somePromise = new Promise((resolve,reject)=>{
  // resolve('Promise to Observable 1');
  // resolve('Promise to Observable 2'); // This doesn't work. 
  reject("Error handling in promises");
});

const promiseToObservable$ = from(somePromise);
promiseToObservable$.subscribe({
  next: (value:string)=>{console.log(value);},
  error: (err:string)=>{console.log(err);},
  complete: ()=>{console.log("Completed promise to Observable");}
});