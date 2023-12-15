/**
 * This is an example of using the filter operator.
 */
import { Observable, Subscriber, filter } from "rxjs";

interface NewsItem {
    category: "business" | "sports";
    content: string;
};
const newsFeed$:Observable<NewsItem> = new Observable<NewsItem>((subscriber: Subscriber<NewsItem>)=>{
    setTimeout(()=>{
        subscriber.next({category:'business',content:'A'});
    },1000);
    setTimeout(()=>{
        subscriber.next({category:'sports',content:'B'});
    },2000);
    setTimeout(()=>{
        subscriber.next({category:'business',content:'C'});
    },3000);
    setTimeout(()=>{
        subscriber.next({category:'sports',content:'D'});
    },4000);
    setTimeout(()=>{
        subscriber.next({category:'business',content:'E'});
    },5000);
    setTimeout(()=>{
        subscriber.complete();
    },6000);
});

newsFeed$.pipe(
    filter(item=>item.category==='business')
).subscribe(
    item=>console.log(item)
);