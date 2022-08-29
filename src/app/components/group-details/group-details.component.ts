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
  contactList: Contact[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private route: Router,
    private groupService: GroupService,
    private contactService: ContactService
  ) {}

  ngOnInit(): void {
    this.groupId = this.activatedRoute.snapshot.paramMap.get('id');
    this.getGroup();
  }

  getGroup() {
    this.group = this.groupService
      .getGrouptList()
      .find((x) => x.id === this.groupId);
    this.getContacts();
  }

  getContacts() {
    this.contactService.getContactList().map((item: Contact) => {
      if (this.group.members.includes(item.id)) {
        this.contactList.push(item);
      }
    });
  }

  onDelete(id: string) {
    this.groupService.deleteGroup(id);
    this.route.navigate(['groups']);
  }

  removeSelected(id: string) {
    this.groupService.removeContact(this.groupId, id);
    this.contactList = [];
    this.getGroup();
  }
}
