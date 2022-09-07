import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Contact } from 'src/app/contact';
import { ContactService } from 'src/app/services/contact.service';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss'],
})
export class ContactListComponent implements OnInit {
  constructor(private contactService: ContactService) {}
  contactList: Contact[];
  selectedList: string[] = [];
  searchTerm: string = '';

  ngOnInit(): void {
    this.getContacts();
  }

  getContacts() {
    let data = this.contactService.getContactList().map((item) => {
      item.select = false;
      return item;
    });
    this.contactList = data;
  }

  getSearchValue(data: string) {
    this.searchTerm = data;
  }

  @Output() selectEvent: EventEmitter<any> = new EventEmitter<any>();

  contactClick(selectedId: string) {
    if (this.selectedList.includes(selectedId)) {
      this.contactList = this.contactList.map((item) => {
        if (item.id === selectedId) {
          item.select = !item.select;
          return item;
        }
        return item;
      });
      this.selectedList.splice(this.selectedList.indexOf(selectedId), 1);
    } else {
      this.contactList = this.contactList.map((item) => {
        if (item.id === selectedId) {
          item.select = !item.select;
          return item;
        }
        return item;
      });
      this.selectedList.push(selectedId);
    }
    this.selectEvent.emit(this.selectedList);
  }
}
