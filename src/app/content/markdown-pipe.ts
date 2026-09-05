import { Pipe, PipeTransform } from '@angular/core';
import { marked } from 'marked';

/**
 * Renders Markdown to an HTML string for use with [innerHTML].
 *
 * The result is bound through Angular's DomSanitizer at the binding site,
 * which strips scripts and inline event handlers — no bypassSecurityTrust
 * anywhere, deliberately.
 */
@Pipe({ name: 'markdown' })
export class MarkdownPipe implements PipeTransform {
  transform(value: string): string {
    return marked.parse(value, { async: false });
  }
}
