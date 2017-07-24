import {
  Component,
  OnInit,
  Input,
  ViewChild
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { IFormControlData } from 'app/shared/interfaces/formcontroldata.interface';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'aj-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['../auth.component.css'],
  providers: [AuthService]
})

export class SignInComponent implements OnInit {

  @Input() formData: {};
  inputListData: IFormControlData[];
  formGroup: FormGroup;
  @ViewChild('form') form;
  passwordType: string;
  inProcess: boolean;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.inputListData = this.formData['controls']
      .filter(control => {
        return control.type === 'input';
      })
      .map(control => {
        return control.data;
      });
    this.passwordType = 'password';
    this.formGroup = new FormGroup({});
  }

  isValid(): boolean {
    return this.formGroup.valid && !this.inProcess;
  }

  onBindControl(controlData: {}): void {
    this.formGroup.addControl(controlData['name'], controlData['control']);
  }

  onPasswordTypeChange(): void {
    this.passwordType = this.passwordType === 'password' ? 'text' : 'password';
  }

  onSignIn(event): void {
    event.preventDefault();
    console.log(this.formGroup);
    this.inProcess = true;
    this.authService.signin(this.formGroup.value);
    this.inProcess = false;
  }

  reset(): void {
    this.form.resetForm();
  }
}
