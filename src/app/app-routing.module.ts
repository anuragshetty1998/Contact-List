import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactsComponent } from './components/contacts/contacts.component';
import { AddContactComponent } from './components/add-contact/add-contact.component';
import { ContactDetailsComponent } from './components/contact-details/contact-details.component';
import { GroupsComponent } from './components/groups/groups.component';
import { AddGroupComponent } from './components/add-group/add-group.component';
import { GroupDetailsComponent } from './components/group-details/group-details.component';
import { DetailsComponent } from './components/details/details.component';

const routes: Routes = [
  { path: '', component: DetailsComponent },
  { path: 'add', component: AddContactComponent },
  { path: 'contact-details/:id', component: ContactDetailsComponent },
  { path: 'groups', component: GroupsComponent },
  { path: 'add-group', component: AddGroupComponent },
  { path: 'delete', component: AddGroupComponent },
  { path: 'group-details/:id', component: GroupDetailsComponent },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
