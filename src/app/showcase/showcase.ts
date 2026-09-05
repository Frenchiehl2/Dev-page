import { Component, computed, inject, signal } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Reveal } from '../shared/reveal';
import { Language } from '../shared/language';
import { UI_TEXT } from '../shared/ui-text';
import { SHOWCASE } from './showcase.data';

/**
 * A YouTube id: exactly 11 characters of the URL-safe alphabet.
 *
 * Building an iframe URL needs bypassSecurityTrustResourceUrl, which is a
 * sanitiser bypass — so the id is checked first. The list is ours today, but a
 * bypass that only ever sees well-formed input is the version that stays safe
 * if that stops being true.
 */
const VIDEO_ID = /^[\w-]{11}$/;

@Component({
  imports: [Reveal],
  selector: 'app-showcase',
  styleUrl: './showcase.css',
  templateUrl: './showcase.html',
})
export class Showcase {
  private readonly language = inject(Language);
  private readonly sanitizer = inject(DomSanitizer);

  protected readonly t = computed(() => UI_TEXT[this.language.current()]);

  /** Ids the visitor has pressed play on; until then only a thumbnail loads. */
  private readonly playing = signal<ReadonlySet<string>>(new Set());

  /**
   * Trusted embed URLs, built once per id rather than per binding call: a
   * method in the template would mint a new SafeResourceUrl on every change
   * detection pass, reloading the player each time.
   */
  private readonly embeds = new Map<string, SafeResourceUrl>();

  protected readonly videos = computed(() => {
    const lang = this.language.current();
    return SHOWCASE.filter((video) => VIDEO_ID.test(video.id)).map((video) => ({
      id: video.id,
      title: video.title[lang],
      thumb: `https://i.ytimg.com/vi/${video.id}/hqdefault.jpg`,
    }));
  });

  protected isPlaying(id: string): boolean {
    return this.playing().has(id);
  }

  protected play(id: string): void {
    this.playing.update((current) => new Set(current).add(id));
  }

  /** youtube-nocookie: no tracking cookies for visitors who never press play. */
  protected embed(id: string): SafeResourceUrl {
    let url = this.embeds.get(id);
    if (!url) {
      url = this.sanitizer.bypassSecurityTrustResourceUrl(
        `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`,
      );
      this.embeds.set(id, url);
    }
    return url;
  }
}
