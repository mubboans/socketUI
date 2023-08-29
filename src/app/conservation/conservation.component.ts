import { ChangeDetectorRef, Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { LocalstorageService } from '../service/localstorage.service';
import { CommonService } from '../service/common.service';
import { MessageService } from 'primeng-lts/api';
import { Socket } from 'socket.io-client';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-conservation',
  templateUrl: './conservation.component.html',
  styleUrls: ['./conservation.component.scss']
})
export class ConservationComponent implements OnInit {
  id: any;
  modal: boolean = false;
  contactlist: any[];
  selectedList: any[];
  conversation: any[];
  text: string;
  message: any[];
  selectedProductId: string = ''; 
  selectedProductName: any;
  selectedProduct2:any;
  name:string;
  curDate=new Date();
  chatname = "Users";
  @ViewChild('chatContainer') chatContainer: ElementRef;
  
  @ViewChildren('messages') messages: QueryList<any>;
  @ViewChild('content') content: ElementRef;

  constructor(public local: LocalstorageService,
    public datePipe:DatePipe,
     public change: ChangeDetectorRef,public com:CommonService,
     private messageService: MessageService) { }
  ngAfterViewInit() {
    this.scrollToBottom();
    this.messages.changes.subscribe(this.scrollToBottom);
  }
  ngOnInit(): void {
    this.name=this.local.fngetLocalValueforName();
   
    this.conversation = this.local.getConversationRecord();
    this.conversation = this.conversation.reverse();
    this.contactlist = this.local.getContactRecords();

    
    this.id = this.local.fngetLocalValueforId();
    
    if (this.conversation.length > 0) {
      this.selectedProductName = this.conversation[0].name; 
      this.selectedProductId = this.conversation[0].name;
    }

    this.local.messageSubject.subscribe((x)=>{
      this.message  = x;
      this.change.detectChanges();
    })
    if(this.message == undefined || !this.message){
      this.message = this.local.getMessageRecord()

      this.scrollToBottom()
    }
  }
  scrollToBottom = () => {
    try {
      this.content.nativeElement.scrollTop = this.content.nativeElement.scrollHeight;
    } catch (err) {}
  }
  recieveMessage(){
    this.scrollToBottom();
    this.change.detectChanges();
  }
  copyId(){
    navigator.clipboard.writeText(this.name).then(
      () => {
        this.messageService.add({severity:'info', summary:'Text Copied to Clipboard', detail: `${this.name} is copied`});
      }
    ).catch(e => console.log(e));
  }

  onRowSelect(event) {
    console.log( event.data);
    this.selectedProductName =event.data.name; 
    this.selectedProductId = event.data.id;
    this.chatname=event.data.name[0];

    console.log(this.message,'message after selection');
    this.message = this.message.filter(x=>{
      console.log(x,'x');
      let aa = x.recievername.includes(this.chatname);
      if(aa){
        console.log(aa,'aa');
        return x;
      }
      console.log(x.recievername,this.chatname,aa);

      //  x.recievername.includes(this.chatname)
      });
    this.messageService.add({severity:'info', summary:`${event.data.name} Selected`, detail:`${event.data.name} will see your message` });
}

onRowUnselect(event) {
    // this.messageService.add({severity:'info', summary:'Product Unselected',  detail: event.data.name});
}


editcon(product){

}
deletecon(product){
  this.messageService.add({severity:'success', summary:'Conversation Deleted',  detail:"Successfull deleted"});
  console.log(this.conversation,'conversation array');
  const d = this.conversation.filter((x)=>x.id !== product.id)
  console.log(d,'conversation deleted');
  // this.local.fnClearconversationLocal();
  // this.local.addConversationRecords(this.conversation );
  // localStorage.setItem('conservation', JSON.stringify(this.conversation));
  // this.conversation = this.local.getConversationRecord();
  this.change.detectChanges();
}

createConversation() {
    console.log(this.selectedList);
    let cover = {
      id: this.selectedList.map((x) => x.id),
      name: this.selectedList.map((x) => x.name),
    }
    this.local.addConversationRecords(cover);
    this.selectedList = [];
    this.conversation = this.local.getConversationRecord();
    // this.conversation = this.conversation.reverse();
    this.change.detectChanges();
    this.modal = false;
  }


  onSelectProduct(productId) {
    this.selectedProductName =productId; 
    this.selectedProductId = productId;
  }
  convertDateToShortTime(date: Date): string {
    // const shortDate =  this.datePipe.transform(date, ''); 
    const shortTime = this.datePipe.transform(date, 'h:mm a dd/MM/yyyy');
    return shortTime;
  }

  send() {
     let mes = {
      sendername:this.name,
      recievername:this.selectedProductName,
      text: this.text.trim(),
      type:'outgoing',
      fromMe:true,
      time:new Date()
    }
    this.com.sendMessage(mes);
    if(this.name == mes.sendername){
      this.local.addMessageRecords(mes)
    }
    this.scrollToBottom();
    this.local.getMessageRecord();
    this.scrollToBottom();
    this.change.detectChanges();
    this.text = '';
  }
  getSenderName(id){
   this.contactlist.filter((x)=>{
    if(x.id == id){
      return x.name
    }
  });
  }
}
