import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { CSRFInterceptor } from './csrf-interceptor';
import { HTTPResponseHeaderInterceptor } from './http-response-header.interceptor';
import { HTTPInfoInterceptor } from './http-info-interceptor';
import { ErrorInterceptor } from './error-interceptor';
import { HTTPRequestHeaderInterceptor } from './http-request-header.interceptor';
import { LoaderInterceptor } from './loader-interceptor';

export const HttpInterceptorProviders = [
    { provide: HTTP_INTERCEPTORS, useClass: HTTPRequestHeaderInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: CSRFInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: HTTPResponseHeaderInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: HTTPInfoInterceptor, multi: true }
];
