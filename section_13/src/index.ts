/**
 * This is an example of using the map operator.
 */
import { Observable, Subscriber, map } from "rxjs";

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
    map(item=>item.content+'_Added_from_map_Jai') // This operator is highly useful for mathematical data tranformation
).subscribe(
    item=>console.log(item)
);

interface WorkFlowTest {
    first : string,
    second : string,
    third : number
}
interface GetOnlyImpData{
    first : string,
    second : string
}
const test$ : Observable<WorkFlowTest> = new Observable<WorkFlowTest>((subscirber:Subscriber<WorkFlowTest>)=>{
    setTimeout(()=>{
        subscirber.next({first: "some1",second:"thing1",third:0});
    },1000);
    setTimeout(()=>{
        subscirber.next({first: "some2",second:"thing2",third:1});
    },2000);
    setTimeout(()=>{
        subscirber.next({first: "some3",second:"thing3",third:2});
    },3000);
    setTimeout(()=>{
        subscirber.next({first: "some4",second:"thing4",third:3});
    },4000);
});

test$.pipe(
    map((res:WorkFlowTest)=>{
        const data : GetOnlyImpData = {
            first : res.first,
            second : res.second
        }
        return data;
    })
).subscribe(res=>console.log(res));