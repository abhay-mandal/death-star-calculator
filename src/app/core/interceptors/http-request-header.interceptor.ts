import { Injectable, isDevMode } from "@angular/core";
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders,
  HttpParams
} from "@angular/common/http";
import { Observable } from "rxjs";
import { AppConstants } from "../../app.constants";

@Injectable()
export class HTTPRequestHeaderInterceptor implements HttpInterceptor {

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let headers = request.headers
      .set('Content-Type', AppConstants.HTTP_DATA.HEADERS.APP_JSON_CONTENT_TYPE)
    let updatedRequest;
    // if (!isDevMode() && request.url.includes(AppConstants.API_END_POINTS.DUMMY_CONNECT)) {
      // headers = new HttpHeaders().set('refID', this.getRefId());
    // }
    updatedRequest = request.clone({ headers, withCredentials: true });
    return next.handle(updatedRequest);
  }

  getRefId() {
    const url = window.location.href;
    if (url.includes('?')) {
      const httpParams = new HttpParams({ fromString: url.split('?')[1] });
      return httpParams.get("refID")!;
    }
    return "";
  }
}
