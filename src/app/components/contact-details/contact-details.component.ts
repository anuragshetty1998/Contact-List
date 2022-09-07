import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ContactService } from 'src/app/services/contact.service';
import { Contact } from '../../contact';

@Component({
  selector: 'app-contact-details',
  templateUrl: './contact-details.component.html',
  styleUrls: ['./contact-details.component.scss'],
})
export class ContactDetailsComponent implements OnInit, OnDestroy {
  constructor(
    private activatedRoute: ActivatedRoute,
    private contactService: ContactService,
    private route: Router
  ) {}
  contact: Contact;
  contactId: string;
  routeParamObs: any;

  ngOnInit(): void {
    this.routeParamObs = this.activatedRoute.paramMap.subscribe((param) => {
      this.contactId = param.get('id');
      this.contact = this.contactService
        .getContactList()
        .find((x) => x.id === this.contactId);
    });
  }

  deleteSelected(id: string) {
    this.contactService.deleteContact(id);
    this.route.navigate(['']);
  }

  ngOnDestroy(): void {
    this.routeParamObs.unsubscribe();
  }
}
