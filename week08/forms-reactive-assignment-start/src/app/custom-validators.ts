import { FormControl } from "@angular/forms";
import { Observable } from "rxjs";

export class CustomValisators {
  static invalidProjectName(control: FormControl): { [s: string]: boolean } {
    if (control.value === 'Test') {
      return { 'invalidProjectname': true };
    }
    return null;
  }

  static asynInvalidProjectname(control: FormControl): Promise<any> | Observable<any> {
    const promise = new Promise((resolve, reject) => {
      setTimeout(() => {
        if (control.value === 'Testproject') {
          resolve({ 'invalidProjectname': true });
        } else {
          resolve(null)
        }
      }, 2000);
    })
    return promise;
  }
}