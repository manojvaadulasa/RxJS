import { BehaviorSubject, Subject, fromEvent, withLatestFrom } from "rxjs";

/**
 * This is an example of using the BehaviourSubject.
 */
const loggedInSpan: HTMLElement = document.querySelector('span#logged-in');
const loginButton: HTMLElement = document.querySelector('button#login');
const logoutButton: HTMLElement = document.querySelector('button#logout');
const printStateButton: HTMLElement = document.querySelector('button#print-state');

const isLoggedIn : BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
fromEvent(loginButton,'click').subscribe(()=>{isLoggedIn.next(true);});
fromEvent(logoutButton,'click').subscribe(()=>{isLoggedIn.next(false);});

// Navigation button
isLoggedIn.subscribe((loggingValue)=>{
    loggedInSpan.innerText = loggingValue.toString();
});

// Buttons
isLoggedIn.subscribe((loggingValue)=>{
    logoutButton.style.display = loggingValue ? 'block' : 'none';
    loginButton.style.display = !loggingValue ? 'block' : 'none';
});

fromEvent(printStateButton,'click').pipe(
    withLatestFrom(isLoggedIn)
).subscribe(()=>{
    console.log('User logged in :',isLoggedIn.value)
});