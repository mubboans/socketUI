import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import * as io from 'socket.io-client';
import { Socket } from 'socket.io-client';
import { LocalstorageService } from './localstorage.service';
@Injectable({
  providedIn: 'root'
})
export class CommonService {
  socket: Socket;
  constructor(public http:HttpClient,public local:LocalstorageService) { }

fnConvertText2Speech(type,periodType):Observable<any> {
  const body ={
    type:type,
    periodType:periodType
  }
  const headers = new HttpHeaders({
    'Content-Type': 'application/json'
  });
  const options = {
    headers: headers,
    responseType: 'arraybuffer' as 'json'
  };
  console.log(body);
  // const headers = new HttpHeaders().set('Content-Type', 'application/json');
  return this.http.post<any>(`${environment.serUrl}text-speech`,body,options).pipe(map((response: ArrayBuffer) =>{return response}),catchError(this.handleError))
}

  connecttoSocket(id){
    this.socket = io.connect('http://localhost:3001/',{query:{id}});
  }

  sendMessage(obj){
    this.socket.emit('send-message',obj)
  }
  recieveMessage(){
    this.socket.on('receive-message',(data)=>{
      this.local.addMessageRecords(data)
      console.log(data);
    }
    )
  }
  // public recieveMessage(event: string): Observable<any> {
  //   return new Observable<any>(observer => {
  //     this.socket.on(event, (data) => {
  //       // console.log(data,'revieve message');
        
  //       observer.next(data);
  //     });
  //   });
  // }

  closeSocket(){
    this.socket.close();
  }

  handleError(err:HttpErrorResponse){
    return throwError(err || err.message)
  }
}
