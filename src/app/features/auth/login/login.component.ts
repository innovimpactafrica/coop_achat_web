import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  template: `
    <div class="min-h-screen relative overflow-hidden"
    style="background-image: url('/images/fond_ecran.png');">

      <div class="h-full w-full flex items-center justify-center">          
          <!-- Left Section - Form -->
          <div class="w-1/2 h-full p-8 p-12 flex flex-col justify-center">
            <!-- Logo -->
            <div class="mb-4">
              <img 
                src="/images/logo.png" 
                alt="Logo CoopAchat"
                class="h-12 w-auto animate-float"
              >
            </div>
            <!-- Title -->
            <div class="mb-4">
              <h1 class="text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
                Plateforme d'achat coopératif pour salariés
              </h1>
              <p class="text-gray-600 text-lg">
                Accédez à des milliers de produits à prix préférentiels grâce à notre programme d'achat groupé.
              </p>
            </div>
            <!-- Form -->
            <form [formGroup]="loginForm" (ngSubmit)="onSubmit()" class="space-y-6">
              <div>
                <label class="block text-gray-700 text-sm font-medium mb-2">
                  Nom d'utilisateur
                </label>
                <input 
                  type="text" 
                  formControlName="username"
                  placeholder="Email ou téléphone"
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all duration-200 text-gray-700"
                >
              </div>

              <div>
                <label class="block text-gray-700 text-sm font-medium mb-2">
                  Mot de passe
                </label>
                <div class="relative">
                  <input 
                    [type]="showPassword ? 'text' : 'password'"
                    formControlName="password"
                    placeholder="*******"
                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all duration-200 text-gray-700 pr-12"
                  >
                  <button 
                    type="button"
                    (click)="togglePassword()"
                    class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <svg *ngIf="!showPassword" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                    </svg>
                    <svg *ngIf="showPassword" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"></path>
                    </svg>
                  </button>
                </div>
              </div>
              <div class="flex items-center justify-between">
                <label class="flex items-center">
                  <input 
                    type="checkbox" 
                    formControlName="rememberMe"
                    class="w-4 h-4 text-orange-600 bg-gray-100 border-gray-300 rounded focus:ring-orange-500 focus:ring-2"
                  >
                  <span class="ml-2 text-sm text-gray-700">Se souvenir de moi</span>
                </label>
                <a href="" class="text-sm text-orange-600 hover:text-orange-500 font-medium">
                  Mot de passe oublié ?
                </a>
              </div>
              <button 
                type="submit"
                class="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white py-3 px-4 rounded-lg hover:from-orange-600 hover:to-orange-700 focus:ring-4 focus:ring-orange-200 font-medium text-lg transition-all duration-200 transform hover:scale-[1.02]"
              >
                Se connecter
              </button>
              <div class="text-center">
                <span class="text-gray-500 text-sm">Ou</span>
              </div>
              <!-- Social Login -->
              <div class="flex space-x-4">
                <button 
                  type="button"
                  class="w-full flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                >
                  <svg class="w-5 h-5 mr-3" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  <span class="text-gray-700 font-medium">Google</span>
                </button>
                <button 
                  type="button"
                  class="w-full flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                >
                  <svg width="19" height="18" viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12.9639 0C13.0058 0 13.0477 0 13.092 0C13.1947 1.2694 12.7102 2.21789 12.1213 2.90476C11.5435 3.58688 10.7523 4.24845 9.47267 4.14807C9.38731 2.89685 9.87262 2.01871 10.4607 1.33342C11.0061 0.69477 12.0059 0.126466 12.9639 0Z" fill="black"/>
                  <path d="M16.8378 13.2125C16.8378 13.2252 16.8378 13.2362 16.8378 13.2481C16.4782 14.3373 15.9652 15.2708 15.3392 16.137C14.7677 16.9235 14.0674 17.9819 12.817 17.9819C11.7365 17.9819 11.0188 17.2871 9.91147 17.2681C8.74008 17.2492 8.0959 17.8491 7.0249 18C6.90238 18 6.77987 18 6.65973 18C5.87327 17.8862 5.23857 17.2634 4.77618 16.7022C3.41272 15.0439 2.35911 12.9019 2.16309 10.1608C2.16309 9.89202 2.16309 9.62407 2.16309 9.35533C2.24608 7.39354 3.19931 5.79849 4.46634 5.02547C5.13503 4.61445 6.05427 4.2643 7.07785 4.4208C7.51653 4.48878 7.96469 4.63896 8.35753 4.78755C8.72981 4.93062 9.19536 5.18434 9.63641 5.1709C9.93518 5.16221 10.2324 5.0065 10.5335 4.89663C11.4156 4.5781 12.2803 4.21293 13.4201 4.38445C14.7899 4.59153 15.7621 5.20015 16.3628 6.13916C15.2041 6.87661 14.288 7.98792 14.4445 9.8857C14.5836 11.6096 15.5858 12.6181 16.8378 13.2125Z" fill="black"/>
                  </svg>

                  <span class="text-gray-700 font-medium">Apple</span>
                </button>
              </div>
              <div class="text-center pt-4">
                <span class="text-gray-600">Vous n'avez pas de compte? </span>
                <a href="/register" class="text-orange-600 hover:text-orange-500 font-medium">S'inscrire</a>
              </div>
            </form>
          </div>
          <!-- Right Section - Image -->
          <div class="w-1/2 h-full relative flex items-center justify-center">
              <img 
                src="/images/image.png"
                alt="Femmes faisant du shopping"
                class="w-full h-full"
              >
          </div>
        </div>
    </div>
  `,
  styles: [`
    .animate-float {
      animation: float  ease-in-out infinite;
    }
    
    @keyframes float {
      0%, 100% { transform: translateY(0px); }
      50% { transform: translateY(-20px); }
    }
  `]
})
export class LoginComponent {
  loginForm: FormGroup;
  showPassword = false;

  constructor(private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      rememberMe: [false]
    });
  }

  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      console.log('Form submitted:', this.loginForm.value);
      // Ici vous pouvez ajouter la logique de connexion
    } else {
      console.log('Form is invalid');
    }
  }
}