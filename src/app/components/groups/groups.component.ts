import { Component, OnInit } from '@angular/core';
import { Group } from 'src/app/contact';
import { GroupService } from 'src/app/services/group.service';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.scss'],
})
export class GroupsComponent implements OnInit {
  groupList: Group[] = [];
  constructor(private groupService: GroupService) {}

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    let data = this.groupService.getGrouptList();
    if (data) {
      this.groupList = data;
    } else {
      this.groupList = [];
    }
  }
}
