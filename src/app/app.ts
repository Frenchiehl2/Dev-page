import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LanguageSelector } from './shared/language-selector';
import { Crosshair } from './shared/crosshair';

@Component({
  imports: [RouterOutlet, LanguageSelector, Crosshair],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {}
