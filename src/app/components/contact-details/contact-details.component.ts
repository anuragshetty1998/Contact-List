import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ContactService } from 'src/app/services/contact.service';
import { Contact } from '../../contact';

@Component({
  selector: 'app-contact-details',
  templateUrl: './contact-details.component.html',
  styleUrls: ['./contact-details.component.scss'],
})
export class ContactDetailsComponent implements OnInit {
  constructor(
    private activatedRoute: ActivatedRoute,
    private contactService: ContactService,
    private route: Router
  ) {}
  contact: Contact;
  contactId: string;

  ngOnInit(): void {
    this.contactId = this.activatedRoute.snapshot.paramMap.get('id');
    this.contact = this.contactService
      .getContactList()
      .find((x) => x.id === this.contactId);
  }

  deleteSelected(id: string) {
    this.contactService.deleteContact(id);
    this.route.navigate(['contacts']);
  }
}
