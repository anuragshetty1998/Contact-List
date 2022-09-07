import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ContactService } from '../../services/contact.service';

@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.component.html',
  styleUrls: ['./add-contact.component.scss'],
})
export class AddContactComponent implements OnInit {
  constructor(private contactService: ContactService, private route: Router) {}
  imgUrl = '../../../assets/profile-icon.jpeg';

  @ViewChild('contactForm') contactForm: NgForm;

  ngOnInit(): void {}

  randomId() {
    return '_' + Math.random().toString(36).substr(2, 9);
  }

  onSelectFile(event: any) {
    if (event.target.files) {
      let reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (load: any) => {
        this.imgUrl = load.target.result;
      };
    }
  }

  onSubmit() {
    if (this.contactForm.valid) {
      this.contactService.addContact({
        firstname: this.contactForm.value.firstname,
        lastname: this.contactForm.value.lastname,
        email: this.contactForm.value.email,
        phone: Number(this.contactForm.value.phone),
        id: this.randomId(),
        name:
          this.contactForm.value.firstname +
          ' ' +
          this.contactForm.value.lastname,
        image: this.imgUrl,
        date: Date.now(),
      });
      this.contactForm.reset();
      this.imgUrl = '../../../assets/profile-icon.jpeg';
      this.route.navigate(['']);
    }
  }
}
