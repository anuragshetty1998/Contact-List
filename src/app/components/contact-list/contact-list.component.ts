import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Contact, Group } from 'src/app/contact';
import { ContactService } from 'src/app/services/contact.service';
import { GroupService } from 'src/app/services/group.service';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss'],
})
export class ContactListComponent implements OnInit {
  contactId: string;
  constructor(
    private activatedRoute: ActivatedRoute,
    private contactService: ContactService,
    private route: Router,
    private groupService: GroupService
  ) {}
  contactList: Contact[];
  selectedList: string[] = [];
  searchTerm: string = '';
  groupList: Group[] = [];
  finalList = [];

  ngOnInit(): void {
    this.contactId = this.activatedRoute.snapshot['_routerState'].url;
    this.getContacts();
    this.getGroups();
    this.getFianlList();
  }

  getContacts() {
    let data = this.contactService.getContactList().map((item) => {
      item.select = false;
      return item;
    });
    this.contactList = data;
  }

  getGroups() {
    let data = this.groupService.getGrouptList().map((item) => {
      item.select = false;
      return item;
    });
    if (data) {
      this.groupList = data;
    } else {
      this.groupList = [];
    }
  }
  getSearchValue(data: string) {
    this.searchTerm = data;
  }

  @Output() selectEvent: EventEmitter<any> = new EventEmitter<any>();

  contactClick(selectedId: string) {
    if (this.selectedList.includes(selectedId)) {
      this.finalList = this.finalList.map((item) => {
        if (item.id === selectedId) {
          item.select = !item.select;
          return item;
        }
        return item;
      });
      this.selectedList.splice(this.selectedList.indexOf(selectedId), 1);
    } else {
      this.finalList = this.finalList.map((item) => {
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

  getFianlList() {
    if (this.contactId === '/delete') {
      this.finalList = [...this.contactList, ...this.groupList];
    } else if (this.contactId === '/add-group') {
      this.finalList = [...this.contactList];
    }
  }
}
