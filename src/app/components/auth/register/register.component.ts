
import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from './../../../services/auth.service';
import { User } from "src/app/models/User";



@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  
  registerForm = new FormGroup({

    email: new FormControl('', [Validators.required, Validators.email, Validators.pattern(/^(.+)@(tut4life\.ac\.za|tut\.ac\.za)$/i)]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
  });
  

  constructor(private authService: AuthService, private router: Router) {}



  ngOnInit(): void {
   
  }

  async onSubmit() {
    try {

      const email = this.registerForm.get('email')?.value;
      const password = this.registerForm.get('password')?.value

      console.log(email)
      console.log(password)
    
      const response = await this.authService.register(email, password);
      // Handle successful registration response
      if (response && response.success) {
        // Registration was successful
       // this.registrationSuccessMessage = 'Registration was successful. You can now log in.';
        // You can also clear the registration form or reset form fields.
        alert('Registration was successful. You can now log in.')
        // Optionally, you can navigate to another page.
        this.router.navigate(['/login']); 
        // Make sure to import and inject the Router service.
      } 
      else {
        // Handle a registration response with errors or other conditions.
        alert('Please provide both email and password.');
      }
    } 
    catch (err: any) {
      // Handle registration error
      
      alert(err.message);
    }
  }
}
