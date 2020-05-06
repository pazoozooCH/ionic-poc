import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-form-demo',
  templateUrl: './form-demo.component.html',
  styleUrls: ['./form-demo.component.scss'],
})
export class FormDemoComponent implements OnInit {
  demoForm = this.fb.group({
    company: [{ value: "InfTec", disabled: true }],
    firstName: ["", Validators.required],
    lastName: [""],
    address: this.fb.group({
      street1: [""],
      street2: [""],
      city: ["", Validators.pattern(/Bern/)],
      state: [""],
      zip: ["94043", Validators.maxLength(5)]
    })
  });

  constructor(private fb: FormBuilder,) { }

  ngOnInit() {}

}
