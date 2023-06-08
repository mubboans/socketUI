import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { LocalstorageService } from '../service/localstorage.service';
import { CommonService } from '../service/common.service';
import { MessageService } from 'primeng-lts/api';

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
  selectedProduct2:any;

  constructor(public local: LocalstorageService, public change: ChangeDetectorRef,public com:CommonService,private messageService: MessageService) { }

  ngOnInit(): void {
    this.change.detectChanges();
    this.conversation = this.local.getConversationRecord();
    this.conversation = this.conversation.reverse();
    this.contactlist = this.local.getContactRecords();
    this.message = this.local.getMessageRecord();
    this.id = this.local.fngetLocalValueforId();
    if (this.conversation.length > 0) {
      this.selectedProductId = this.conversation[0].id;
    }

  }

  copyId(){
    navigator.clipboard.writeText(this.id).then(
      () => {
        this.messageService.add({severity:'info', summary:'Text Copied to Clipboard', detail: `${this.id} is copied`});
      }
    ).catch(e => console.log(e));
  }

  onRowSelect(event) {
    this.selectedProductId = event.data.id;
    this.messageService.add({severity:'info', summary:'Product Selected', detail:`${event.data.id} is now selected` });
}

onRowUnselect(event) {
    // this.messageService.add({severity:'info', summary:'Product Unselected',  detail: event.data.name});
}


editcon(product){

}
deletecon(product){
  this.messageService.add({severity:'Deleted', summary:'Conversation Deleted',  detail:"Successfull deleted"});
  this.conversation = this.conversation.filter((x)=>x.id !== product.id)
  this.local.fnClearconversationLocal();
  this.local.addConversationRecords(this.conversation );
  // localStorage.setItem('conservation', JSON.stringify(this.conversation));
  this.conversation = this.local.getConversationRecord();
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
    this.selectedProductId = productId;
    // console.log(this.selectedProductId,productId);  
    // You can perform any additional actions here based on the selected product
  }
  send() {
    let mes = {
      recieverId:this.selectedProductId,
      senderid: this.id,
      text: this.text,
      fromMe:true
    }
    let obj ={
      recipients:this.selectedProductId,
      text:this.text,
      senderid:this.id
    }
    this.com.sendMessage(obj);

    this.local.addMessageRecords(mes)
    // this.message = this.local.getMessageRecord();
    console.log(this.text);
    this.com.recieveMessage();
    this.change.detectChanges();
    this.message = this.local.getMessageRecord();
    console.log(this.message);
    this.change.detectChanges();
    // this.com.recieveMessage('receive-message').subscribe((data: any) => {
    //   console.log('Received message:', data);
    //   // this.local.addMessageRecords(data)
    //   this.change.detectChanges();
    // });
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
