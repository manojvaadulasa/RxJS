import { Observable } from "rxjs";

const observable$=new Observable<string>(sub=>{
  // console.log('Started');
  sub.next('Alice');
  sub.next('Ben');
  setTimeout(()=>{sub.next('Charlie')},2000);
  setTimeout(()=>{sub.error(new Error('Testing error'))},4000);
  setTimeout(()=>{sub.complete()},5000);
  return ()=>{
    console.log('This is called Teardown. In the Observable lifecyle this is emmitted only if and after the complete/error cycyle is emmited');
    console.log('If you comment the complete/error this wont run');
  }
});
observable$.subscribe({
  next : x=>console.log(x),
  error: err=> console.log(err),
  complete: ()=>console.log('Done')
});