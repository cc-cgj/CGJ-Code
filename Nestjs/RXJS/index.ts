import { Observable, interval, take, of, retry, fromEvent } from "rxjs";
import { map, filter } from "rxjs/operators";

/**
 * 1.@Observable
 */
// const observable = new Observable((subscriber) => {
//   subscriber.next(1);
//   subscriber.next(2);
//   subscriber.next(3);
//   setTimeout(() => {
//     subscriber.next(4);
//     subscriber.complete();
//   }, 1000);
// });

// observable.subscribe({
//   next: (num) => {
//     console.log(num);
//   },
// });

/**
 * 2.@interval
 */

// interval(500)
//   .pipe(take(5))
//   .subscribe((e) => {
//     console.log(e);
//   });

const subs =
  // interval(500)
  of(1, 2, 3, 4, 5, 6)
    .pipe(
      retry(3), //如果出错, 重新尝试调用三次
      map((v) => ({ num: v })),
      filter((v) => v.num % 2 == 0)
    )
    .subscribe((e) => {
      console.log(e);
      if (e.num === 10) {
        subs.unsubscribe();
      }
    });

/**
 * 3.@fromEvent
 */
const $click = fromEvent(document, "click").pipe(map((v) => v.target));

$click.subscribe((e) => {
  console.log(e);
});
