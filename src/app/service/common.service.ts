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
  socketUrl = "ws://localhost:3001/";
  // socketUrl = "ws://localhost:5001/testapp-ac339/us-central1/app/";
  socket: Socket;
  private interval: any;
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

  connecttoSocket(name){
    this.socket = io.connect(this.socketUrl,{query:{name}});
  }

  sendMessage(obj){
    this.socket.emit('sendMessage',obj)
  }
  recieveMessage(){
    this.socket.on('receiveMessage',(data)=>{
      // let name = this.local.fngetLocalValueforName();
      const name = this.local.fngetLocalValueforName();
      if(name === data.recievername){
        console.log('condtiontrue name match');
        
        this.local.addMessageRecords(data)
        this.local.getMessageRecord();
      }
      console.log(data);
    }
    )
  }

  startInterval() {
    // this.interval = setInterval(() => {
    //   console.log('Interval Started.');
    console.log('Message event hit');
      this.socket.on('receive-message', (obj) => {
        if(obj && obj.type){
          console.log('Message received!');
        }
      })
    // }, 1000);
  }


  closeSocket(){
    this.socket.close();
  }

  handleError(err:HttpErrorResponse){
    return throwError(err || err.message)
  }
}
