import {
  Component,
  DoCheck,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { ContactService } from '../../services/contact.service';
import { Contact } from '../../contact';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss'],
})
export class ContactsComponent implements OnInit {
  constructor(private contactService: ContactService) {}

  contactList: Contact[];
  searchTerm: string = '';
  checkAllStatus: boolean = false;
  checkArray: string[] = [];

  getSearchValue(data: string) {
    this.searchTerm = data;
  }

  getData() {
    let data = this.contactService.getContactList().map((item) => {
      item.select = false;
      return item;
    });
    this.contactList = data;
  }

  ngOnInit(): void {
    this.getData();
  }

  checkChange(event: any) {
    let checkId = event.target.value;
    let checkStatus = event.target.checked;

    this.contactList.map((item: Contact) => {
      if (checkId === 'all' && this.checkAllStatus) {
        if (!this.checkArray.includes(item.id)) {
          this.checkArray.push(item.id);
        }
      } else if (checkId === 'all' && !this.checkAllStatus) {
        this.checkArray = [];
      } else if (item.id === checkId && this.checkArray.includes(checkId)) {
        this.checkArray.splice(this.checkArray.indexOf(checkId), 1);
      } else if (item.id === checkId && !this.checkArray.includes(checkId)) {
        this.checkArray.push(checkId);
      }

      if (item.id === checkId) {
        item.select = checkStatus;
        this.checkAllStatus = false;
        return item;
      }
      if (checkId === 'all') {
        item.select = this.checkAllStatus;
        return item;
      }
      return item;
    });
  }

  deleteSelect() {
    this.contactService.deleteMultiple(this.checkArray);
    this.checkArray = [];
    this.getData();
  }
}
