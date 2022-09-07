import { Component, OnInit } from '@angular/core';
import { Contact, Group } from 'src/app/contact';
import { ContactService } from 'src/app/services/contact.service';
import { GroupService } from 'src/app/services/group.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  constructor(
    private contactService: ContactService,
    private groupService: GroupService
  ) {}
  contactList: Contact[];
  groupList: Group[] = [];
  finalList = [];
  searchTerm: string = '';

  ngOnInit(): void {
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
    let data = this.groupService.getGrouptList();
    if (data) {
      this.groupList = data;
    } else {
      this.groupList = [];
    }
  }

  getFianlList() {
    this.finalList = [...this.contactList, ...this.groupList];
  }

  getSearchValue(data: string) {
    this.searchTerm = data;
  }
}
