import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ContactService } from '../../services/contact.service';
import { GroupService } from '../../services/group.service';
import { Contact } from '../../contact';

@Component({
  selector: 'app-add-group',
  templateUrl: './add-group.component.html',
  styleUrls: ['./add-group.component.scss'],
})
export class AddGroupComponent implements OnInit {
  contactList: Contact[];
  checkArray: string[] = [];
  checkSelected: boolean = false;
  @ViewChild('groupForm') groupForm: NgForm;

  constructor(
    private groupService: GroupService,
    private contactService: ContactService
  ) {}

  randomId() {
    return '_' + Math.random().toString(36).substr(2, 9);
  }

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    let data = this.contactService.getContactList().map((item) => {
      item.select = false;
      return item;
    });
    this.contactList = data;
  }

  checkChange(event: any) {
    let checkId = event.target.value;
    let checkStatus = event.target.checked;
    this.checkSelected = true;
    if (checkStatus) {
      this.checkArray.push(checkId);
    } else {
      this.checkArray.splice(this.checkArray.indexOf(checkId), 1);
    }
  }

  onSubmit() {
    console.log(this.groupForm);
    if (this.groupForm.valid) {
      this.groupService.addGroup({
        id: this.randomId(),
        name: this.groupForm.value.groupname,
        members: this.checkArray,
      });
    }
    this.groupForm.reset();
    this.getData();
    this.checkArray = [];
    this.checkSelected = false;
  }
}
