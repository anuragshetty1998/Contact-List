import { Injectable } from '@angular/core';
import { Group, Contact } from '../contact';
import { ContactService } from './contact.service';
@Injectable({
  providedIn: 'root',
})
export class GroupService {
  constructor(private contactService: ContactService) {}

  addGroup(groupData: Group) {
    if (localStorage.getItem('groups')) {
      let data: Group[] = JSON.parse(localStorage.getItem('groups'));
      data.push(groupData);
      localStorage.setItem('groups', JSON.stringify(data));
    } else {
      localStorage.setItem('groups', JSON.stringify([groupData]));
    }
  }

  getGrouptList(): Group[] {
    let data: Group[] = JSON.parse(localStorage.getItem('groups'));
    if (data) {
      data.map((group: Group) => {
        let tempArray = [];
        this.contactService.getContactList().map((contact: Contact) => {
          if (group.members.includes(contact.id)) {
            tempArray.push(contact.id);
          }
        });
        group.members = tempArray;
      });
      return data;
    }
    return [];
  }

  deleteGroup(id: string) {
    let data: Group[] = JSON.parse(localStorage.getItem('groups'));
    let filterData: Group[] = data.filter((item) => item.id !== id);
    localStorage.setItem('groups', JSON.stringify(filterData));
  }

  removeContact(groupId: string, contactId: string) {
    let data: Group[] = JSON.parse(localStorage.getItem('groups'));
    data = data.map((group: Group) => {
      if (group.id === groupId) {
        group.members.splice(group.members.indexOf(contactId), 1);
        return group;
      }
      return group;
    });
    localStorage.setItem('groups', JSON.stringify(data));
  }

  editGroup(groupId: string, idArray: string[]) {
    let data: Group[] = JSON.parse(localStorage.getItem('groups'));
    data = data.map((group: Group) => {
      if (group.id === groupId) {
        group.members = idArray;
        return group;
      }
      return group;
    });
    localStorage.setItem('groups', JSON.stringify(data));
  }

  deleteContactGroup(dataArray: string[]) {
    dataArray.map((item: string) => {
      this.deleteGroup(item);
      this.contactService.deleteContact(item);
    });
  }
}
