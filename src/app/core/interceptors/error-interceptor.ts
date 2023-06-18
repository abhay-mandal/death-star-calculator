import { Injectable, Injector } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { environment } from '@env/environment';
import { AppConstants } from '@app/app.constants';
import { TranslateService } from '@ngx-translate/core';

@Injectable()

export class ErrorInterceptor implements HttpInterceptor {
  UNAUTHORIZED_ERROR = [401, 403];
  INTERNAL_SERVER_ERROR = [500];
  GET_ATTRIBUTE_OPTIONS = AppConstants.API_END_POINTS.GET_ATTRIBUTE_OPTIONS;
  SERVICE_UNAVAILABLE = [502, 503, 504];
  serviceUnavailableMsg = "";
  SESSION_TIMEOUT_MESSAGE = "SESSIONTIMEOUT";

  constructor(
    private translate: TranslateService) {
    this.translate.get("globalErrorMsg").subscribe((res) => {
      this.serviceUnavailableMsg = res.serviceUnavailableMsg;
    })
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request)
      .pipe(
        catchError((error: HttpErrorResponse) => {

          // if (!request.url.includes(this.GET_ATTRIBUTE_OPTIONS)) {
          if (this.UNAUTHORIZED_ERROR.includes(error.status)) {
            let message = `${this.SESSION_TIMEOUT_MESSAGE}::${error.message}`;
            window.parent.postMessage(message, environment.CORS_URL);
          } else {
            let errMsg = "";
            // if (this.INTERNAL_SERVER_ERROR.includes(error.status)) {
            if (error?.error?.error) {
              errMsg = error.error.error;
            }
            else if (this.SERVICE_UNAVAILABLE.includes(error.status)) {
              errMsg = this.serviceUnavailableMsg;
            }
            else if (error.error instanceof HttpErrorResponse) {
              errMsg = error.message;
            }
            else {
              errMsg = navigator.onLine ? `Error: ${error.message}` : "No Internet Connection";
            }
            Swal.fire({
              imageUrl: "./assets/images/error-cross-icon.png",
              text: errMsg
            })
          }
          // }
          return throwError(error);
        })
      )
  }
}
