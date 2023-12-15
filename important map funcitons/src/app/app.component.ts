import { Component, OnInit } from '@angular/core';
import { Observable, concatMap, delay, exhaustMap, map, mergeMap, of, switchMap, from } from 'rxjs';
interface forObservable {
  integer: number;
  word:string;
};
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  public theVariable: forObservable[] ;
  public theVariableOne$ : Observable<forObservable[]> = new Observable();
  public theVariableTwo$ : Observable<number> = new Observable();
  public theVariableThree$ : Observable<number> = new Observable();
  public theVariableFour$ : Observable<number> = new Observable();
  public theVariableFive$ : Observable<number> = new Observable();
  public theMapOperator$ : Observable<number[]> = new Observable();
  public theMergeMapOperator$ : Observable<number> = new Observable();
  public theConcatMapOperator$ : Observable<number> = new Observable();
  public theSwitchMapOperator$ : Observable<number> = new Observable();
  public theExhaustMapOperator$ : Observable<number> = new Observable();
  public theMapOperatorWithFilter$ : Observable<number[]> = new Observable();
  public theDoubleMap$ : Observable<number[]> = new Observable();
  constructor(){
    this.theVariable=[
      {
        integer:1,
        word:'first'
      },
      {
        integer:2,
        word:'second'
      },
      {
        integer:3,
        word:'third'
      }
    ];
  }
  public ngOnInit(): void {
    this.mapFunction();
    this.mergeMapFunction();
    setTimeout(()=>{
      this.concatMapFunction();
    },5000);
    setTimeout(()=>{
      this.switchMapFunction();
    },10000);
    setTimeout(()=>{
      this.exhaustMapFunction();
    },15000);
  }
  /**
   * map is the most important RxJS function.
   * Here we use map to take out only the values we need or in other words to map only the values we need
   * The filter function is actually misleading and does not function as we think. DON'T USE FILTER
   * A better way of filtering things is to use the map operator along with the filter funciton within the map operator.
  **/
  public mapFunction(){
    this.theVariableOne$ = of(this.theVariable);
    this.theMapOperator$= this.theVariableOne$.pipe(
      map((values:forObservable[])=>values.map((value:forObservable)=>value.integer))
    );
    this.theMapOperatorWithFilter$=this.theVariableOne$.pipe(
      map((values:forObservable[])=>values.map((value:forObservable)=>value.integer)),
      map((values:number[])=>values.filter((value:number)=>value>1))
    );
    this.theDoubleMap$ = this.theVariableOne$.pipe(
      map((values:forObservable[])=>values.map((value:forObservable)=>value.integer)),
      map((values:number[])=>values.map((value:number)=>value*10))
    );
  }
  /**
   * Merge map doesn't wait for the previous observable to complete and goes on executing its funciton.
   * The usage of MergeMap becomes clear with the usage of ConcatMap.
  **/
  public mergeMapFunction(){
    this.theVariableTwo$ = from([1,2,3,4]);
    this.theMergeMapOperator$ = this.theVariableTwo$.pipe(
      mergeMap((items:number)=>of(items).pipe(delay(1000)))
    );
    console.log("Merge map started");
    this.theMergeMapOperator$.subscribe({
      next : x=>console.log(x),
      error: ()=>{},
      complete: ()=> console.log('Merge map completed')
    });
  }
  public concatMapFunction(){
    this.theVariableThree$ = from([1,2,3,4]);
    this.theConcatMapOperator$ = this.theVariableTwo$.pipe(
      concatMap((items:number)=>of(items).pipe(delay(1000)))
    );
    console.log("Concat map started");
    this.theConcatMapOperator$.subscribe({
      next : x=>console.log(x),
      error: ()=>{},
      complete: ()=> console.log('Concat map completed')
    });
  }
  /**
   * Switch map only gives out the last value and the rest are ignored
  **/
  public switchMapFunction(){
    this.theVariableFour$ = from([1,2,3,4]);
    this.theSwitchMapOperator$ = this.theVariableTwo$.pipe(
      switchMap((items:number)=>of(items).pipe(delay(1000)))
    );
    console.log("Switch map started");
    this.theSwitchMapOperator$.subscribe({
      next : x=>console.log(x),
      error: ()=>{},
      complete: ()=> console.log('Switch map completed')
    });
  }
  /**
   * Exhaust map gives out only the first value and completes.
  **/
  public exhaustMapFunction(){
    this.theVariableFive$ = from([1,2,3,4]);
    this.theExhaustMapOperator$ = this.theVariableTwo$.pipe(
      exhaustMap((items:number)=>of(items).pipe(delay(1000)))
    );
    console.log("Exhaust map started");
    this.theExhaustMapOperator$.subscribe({
      next : x=>console.log(x),
      error: ()=>{},
      complete: ()=> console.log('Exhaust map completed')
    });
  }
}
