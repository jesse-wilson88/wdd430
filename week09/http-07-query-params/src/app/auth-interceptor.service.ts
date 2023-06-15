import {
  // HttpEventType,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
// import { tap } from 'rxjs/operators';

export class AuthInterceptorService implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    // Restrict a URL request is done here
    // console.log('Request is on its way');
    // console.log(req.url);

    // Used to override
    // const modifiedRequest = req.clone({ url: 'some-new-url' });
    const modifiedRequest = req.clone({
      headers: req.headers.append('Auth', 'xyx'),
    });
    // return next.handle(req);
    // return next.handle(modifiedRequest);

    // return next.handle(modifiedRequest).pipe(
    //   tap((event) => {
    //     console.log(event);
    //     if (event.type === HttpEventType.Response) {
    //       console.log('Response arrived, body data:');
    //       console.log(event.body);
    //     }
    //   })
    // );

    return next.handle(modifiedRequest);
  }
}
