import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ContactService } from '../../services/contact.service';

@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.component.html',
  styleUrls: ['./add-contact.component.scss'],
})
export class AddContactComponent implements OnInit {
  constructor(private contactService: ContactService) {}

  @ViewChild('contactForm') contactForm: NgForm;
  // firstname: string;
  // lastname: string;
  // email: string;
  // phone: number;

  ngOnInit(): void {}

  randomId() {
    return '_' + Math.random().toString(36).substr(2, 9);
  }

  onSubmit() {
    // this.firstname = this.contactForm.value.contactGroup.firstname;
    // this.lastname = this.contactForm.value.contactGroup.lastname;
    // this.email = this.contactForm.value.email;
    // this.phone = Number(this.contactForm.value.contactGroup.phone);
    if (this.contactForm.valid) {
      this.contactService.addContact({
        firstname: this.contactForm.value.firstname,
        lastname: this.contactForm.value.lastname,
        email: this.contactForm.value.email,
        phone: Number(this.contactForm.value.phone),
        id: this.randomId(),
      });
      this.contactForm.reset();
    }
  }
}
