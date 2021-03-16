import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Project } from '../Models/project-model';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EnrichServiceService {
  baseAddress:string;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  constructor(private _httpClient: HttpClient) { 
    this.baseAddress = environment.baseAddress;
  }
  // Error Handler
  errorHandler(error: HttpErrorResponse): Observable<string> {
    return throwError(error.error instanceof Object ? error.error.Message ? error.error.Message : error.error : error.error || error.message || 'Server Error');
  }
  
  CreateProject(project:Project):Observable<any>{
    return this._httpClient.post(`${this.baseAddress}api/Enrich/CreateProject`,project,this.httpOptions)
    .pipe(catchError(this.errorHandler));
  }

  UpdateProject(project:Project):Observable<any>{
    return this._httpClient.post(`${this.baseAddress}api/Enrich/UpdateProject`,project,this.httpOptions)
    .pipe(catchError(this.errorHandler));
  }
  GetAllProjects():Observable<any>{
    return this._httpClient.get(`${this.baseAddress}api/Enrich/GetAllProjects`)
    .pipe(catchError(this.errorHandler));
  }
  UploadAttachment(ProjectName: string, selectedFiles: File[],perviousFileName=null): Observable<any> {
    const formData: FormData = new FormData();
    if (selectedFiles && selectedFiles.length) {
        selectedFiles.forEach(x => {
            formData.append(x.name, x, x.name);
        });
    }
    formData.append('ProjectName', ProjectName);
    formData.append('PerviousFileName', perviousFileName);
    return this._httpClient.post<any>(`${this.baseAddress}api/Enrich/UploadAttachment`,
      formData,
    ).pipe(catchError(this.errorHandler));
  }
  DowloandAttachment(ProjectName: string,DocumentName:string): Observable<Blob | string> {
    return this._httpClient.get(`${this.baseAddress}api/Enrich/DowloandAttachment?ProjectName=${ProjectName}&DocumentName=${DocumentName}`, {
      responseType: 'blob',
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    })
      .pipe(catchError(this.errorHandler));
  }
}
