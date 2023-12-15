import { Subject, fromEvent, map } from "rxjs";

/**
 * This is an example of using "Subjects"
 */
const inputElement: HTMLInputElement = document.querySelector('#value-input');
const emitButton = document.querySelector('button#emit');
const subscribeButton = document.querySelector('button#subscribe');

const value$ = new Subject<string>();
fromEvent(emitButton,'click').pipe(
    map(()=>inputElement.value)
).subscribe(value$);
/**
 * The above is similar to
 * fromEvent(emitButton,'click').subscribe(value$.next(inputElement.value));
 * This will only emit a value but we have to subscribe to get the output in our console. 
 * First click on subscribe and then keep on emitting.
**/
fromEvent(subscribeButton,'click').subscribe(()=>{
    value$.subscribe(value=>console.log(value))
});