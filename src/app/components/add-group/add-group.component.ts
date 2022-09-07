import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ContactService } from '../../services/contact.service';
import { GroupService } from '../../services/group.service';
import { Contact, Group } from '../../contact';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-group',
  templateUrl: './add-group.component.html',
  styleUrls: ['./add-group.component.scss'],
})
export class AddGroupComponent implements OnInit {
  contactList: Contact[];
  contactId: boolean;
  groupList: Group[] = [];
  finalList = [];
  selectedArray: string[] = [];
  selectedMembers = [];
  @ViewChild('groupForm') groupForm: NgForm;
  grpImgUrl: string = '../../../assets/group-icon.png';

  constructor(
    private groupService: GroupService,
    private contactService: ContactService,
    private route: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  randomId() {
    return '_' + Math.random().toString(36).substr(2, 9);
  }

  ngOnInit(): void {
    this.contactId =
      this.activatedRoute.snapshot['_routerState'].url === '/delete';
    this.getData();
    this.getGroups();
    this.getFianlList();
  }

  getData() {
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

  getFianlList() {
    this.finalList = [...this.contactList, ...this.groupList];
  }

  onSelectFile(event: any) {
    if (event.target.files) {
      let reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (load: any) => {
        this.grpImgUrl = load.target.result;
      };
    }
  }

  getSelected(data: any) {
    this.selectedArray = data;
    this.selectedMembers = [];
    this.getSelectedMembers();
  }

  getSelectedMembers() {
    this.finalList.map((item) => {
      if (this.selectedArray.includes(item.id)) {
        this.selectedMembers.push(item);
      }
    });
  }

  onSubmit() {
    if (!this.contactId) {
      if (this.groupForm.valid) {
        this.groupService.addGroup({
          id: this.randomId(),
          name: this.groupForm.value.groupname,
          members: this.selectedArray,
          date: Date.now(),
          image: this.grpImgUrl,
        });
        this.grpImgUrl = '../../../assets/profile.png';
        this.route.navigate(['']);
      }
      this.groupForm.reset();
      this.getData();
    } else {
      this.groupService.deleteContactGroup(this.selectedArray);
      this.route.navigate(['']);
    }
  }
}
