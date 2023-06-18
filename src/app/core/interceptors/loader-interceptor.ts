import { Injectable, Injector } from '@angular/core';
import {
    HttpEvent,
    HttpRequest,
    HttpHandler,
    HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { LoaderService } from '@app/core/services/loader.service';

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {
    private totalRequests = 0;

    constructor(private injector: Injector) { }

    intercept(
        req: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        const loaderService = this.injector.get(LoaderService);
        this.totalRequests++;
        loaderService.show();
        return next.handle(req).pipe(
            finalize(() => {
                this.totalRequests--;
                if (this.totalRequests === 0) {
                    loaderService.hide()
                }
            })
        );
    }
}