/**
 * This is an example of "forkJoin" in RxJs operators. 
**/
import { Observable, Subscriber, combineLatest, forkJoin, zip } from "rxjs";
import { ajax } from "rxjs/ajax";
const randomName$ = ajax("https://random-data-api.com/api/v2/banks");
const bloodTypes$ = ajax("https://random-data-api.com/api/v2/blood_types");

//  Subscribing to the above 2 observables will give the output in a random order. 
//  If we want it in a correct order we should use forkJoin.
/**
    randomName$.subscribe({
      next: (value:any) => console.log(value.response.bank_name)
    });
    bloodTypes$.subscribe({
      next: (value:any) => console.log(value.response.group)
    });
**/
forkJoin([randomName$,bloodTypes$]).subscribe(([bankName,customerBloodgroup]:any)=>{
  console.log(`The bank: ${bankName.response.bank_name} has a customer with blood group ${customerBloodgroup.response.group}`);
});

const rollNumber$ : Observable<number> = new Observable<number>((subscriber:Subscriber<number>)=>{
  subscriber.next(1);
  subscriber.next(2);
  subscriber.next(3);
  subscriber.complete();
});

const names$ : Observable<string> = new Observable<string>((subscriber:Subscriber<string>)=>{
  subscriber.next("Abhishek");
  subscriber.next("Ajin");
  subscriber.next("Amrutha");
  subscriber.complete();
});

/** 
 *  This forkJoin gives the result of "3" and "Amrutha" only. All the previous values are ommited.
**/
forkJoin([rollNumber$,names$]).subscribe({
  next: ([rollNumber,names]:[number,string])=>{console.log(`Teacher: Roll number ${rollNumber}, ${names}
  Student: Present ma'am`);},
  complete: ()=>{console.log("Teacher: Let's start the class now!")}
});

/** 
 *  This combineLatest gives the result of "3" and the rest of the 3 names. However, "1" and "2" are omitted.
**/
combineLatest([rollNumber$,names$]).subscribe({
  next: ([rollNumber,names]:[number,string])=>{console.log(`Teacher: Roll number ${rollNumber}, ${names}
  Student: Present ma'am`);},
  complete: ()=>{console.log("Teacher: Let's start the class now!")}
});

const rollNumberCorrect$ : Observable<number> = new Observable<number>((subscriber:Subscriber<number>)=>{
  let counter:number=1;
  setInterval(()=>{
    subscriber.next(counter++);
  },2000);
});

const namesCorrect$ : Observable<string> = new Observable<string>((subscriber:Subscriber<string>)=>{
  let names:string[]=["Abhishek","Ajin","Amrutha"];
  let counter:number=0;
  setInterval(()=>{
    subscriber.next(names[counter++]);
  },2000);
  setTimeout(()=>{
    subscriber.complete();
  },6000);
});

/**
 * The output for this is:-
 * Teacher: Roll number 3, Amrutha
   Student: Present ma'am
   Teacher: Let's start the class now!
 */
forkJoin([rollNumberCorrect$,namesCorrect$]).subscribe({
  next: ([rollNumber,names]:[number,string])=>{console.log(`Teacher: Roll number ${rollNumber}, ${names}
  Student: Present ma'am`);},
  complete: ()=>{console.log("Teacher: Let's start the class now!")}
});

/**
 * The output for this will be:-
 * Teacher: Roll number 1, Abhishek
   Student: Present ma'am
   Teacher: Roll number 2, Abhishek
   Student: Present ma'am
   Teacher: Roll number 2, Ajin
   Student: Present ma'am
   Teacher: Roll number 3, Amrutha
   Student: Present ma'am
   Teacher: Let's start the class now!
   Teacher: Roll number 3, Ajin
   Student: Present ma'am
   Teacher: Roll number 3, Amrutha
   Student: Present ma'am
   Teacher: Let's start the class now!
 */
combineLatest([rollNumberCorrect$,namesCorrect$]).subscribe({
  next: ([rollNumber,names]:[number,string])=>{console.log(`Teacher: Roll number ${rollNumber}, ${names}
  Student: Present ma'am`);},
  complete: ()=>{console.log("Teacher: Let's start the class now!")}
});

/**
 * The output for this will be:-
 * Teacher: Roll number 1, Abhishek
   Student: Present ma'am
   Teacher: Roll number 2, Ajin
   Student: Present ma'am
   Teacher: Roll number 3, Amrutha
   Student: Present ma'am
   Teacher: Let's start the class now!
 */
zip([rollNumberCorrect$,namesCorrect$]).subscribe({
  next: ([rollNumber,names]:[number,string])=>{console.log(`Teacher: Roll number ${rollNumber}, ${names}
  Student: Present ma'am`);},
  complete: ()=>{console.log("Teacher: Let's start the class now!")}
});