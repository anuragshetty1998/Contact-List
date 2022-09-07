import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Group } from 'src/app/contact';
import { ContactService } from 'src/app/services/contact.service';
import { GroupService } from 'src/app/services/group.service';
import { Contact } from '../../contact';

@Component({
  selector: 'app-group-details',
  templateUrl: './group-details.component.html',
  styleUrls: ['./group-details.component.scss'],
})
export class GroupDetailsComponent implements OnInit {
  groupId: string = '';
  group: Group;
  membertList: Contact[] = [];
  contactList: Contact[] = [];
  editEnable: boolean = false;
  idArray: string[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private route: Router,
    private groupService: GroupService,
    private contactService: ContactService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((param) => {
      this.groupId = param.get('id');
      this.getGroup();
    });
  }

  getGroup() {
    this.group = this.groupService
      .getGrouptList()
      .find((x) => x.id === this.groupId);
    this.membertList = [];
    this.getContacts();
  }

  getContacts() {
    this.contactService.getContactList().map((item: Contact) => {
      if (this.group.members.includes(item.id)) {
        this.membertList.push(item);
        item.select = true;
        this.contactList.push(item);
      } else {
        item.select = false;
        this.contactList.push(item);
      }
    });
  }

  onDelete(id: string) {
    this.groupService.deleteGroup(id);
    this.route.navigate(['']);
  }

  removeSelected(id: string) {
    this.groupService.removeContact(this.groupId, id);
    this.membertList = [];
    this.getGroup();
  }

  // onAddButton() {
  //   this.editEnable = !this.editEnable;
  //   if (!this.editEnable) {
  //     this.contactList.map((item: Contact) => {
  //       if (item.select) {
  //         this.idArray.push(item.id);
  //       }
  //     });
  //     this.groupService.editGroup(this.groupId, this.idArray);
  //   }
  //   this.contactList = [];
  //   this.membertList = [];
  //   this.idArray = [];
  //   this.getGroup();
  // }

  // toggleSelected(id: string, valueSelect: boolean) {
  //   this.contactList = this.contactList.map((item: Contact) => {
  //     if (item.id === id) {
  //       item.select = valueSelect;
  //       return item;
  //     }
  //     return item;
  //   });
  // }
}
