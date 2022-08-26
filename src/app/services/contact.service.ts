import { Injectable } from '@angular/core';
import { Contact } from '../contact';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  constructor() {}

  addContact(contactData: Contact) {
    if (localStorage.getItem('contacts')) {
      let data: Contact[] = JSON.parse(localStorage.getItem('contacts'));
      data.push(contactData);
      localStorage.setItem('contacts', JSON.stringify(data));
    } else {
      localStorage.setItem('contacts', JSON.stringify([contactData]));
    }
  }

  getContactList(): Contact[] {
    let data: Contact[] = JSON.parse(localStorage.getItem('contacts'));
    return data;
  }

  deleteContact(id: string) {
    let data: Contact[] = JSON.parse(localStorage.getItem('contacts'));
    let filterData: Contact[] = data.filter((item) => item.id !== id);
    localStorage.setItem('contacts', JSON.stringify(filterData));
  }

  deleteMultiple(arrayId: string[]) {
    let contactList = this.getContactList();
    contactList = contactList.filter((item: Contact) => {
      if (!arrayId.includes(item.id)) {
        return item;
      }
      return false;
    });
    localStorage.setItem('contacts', JSON.stringify(contactList));
  }
}
