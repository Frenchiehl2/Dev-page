import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LanguageSelector } from './shared/language-selector';

@Component({
  imports: [RouterOutlet, LanguageSelector],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {}
