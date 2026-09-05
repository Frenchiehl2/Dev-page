import { Lang } from '../shared/language';

/** One embedded video in the Showcase section. */
export interface ShowcaseVideo {
  /**
   * YouTube video id — the v= parameter of a watch URL, 11 characters.
   * From https://www.youtube.com/watch?v=dQw4w9WgXcQ the id is 'dQw4w9WgXcQ'.
   */
  id: string;
  /** Caption, per language. Also names the play button. */
  title: Record<Lang, string>;
}

/**
 * Add a video by pasting its id here. The grid wraps to new rows on its own,
 * and the section hides itself entirely while this list is empty.
 *
 * Ids are checked against the 11-character YouTube format before being used to
 * build an iframe URL; anything malformed is skipped rather than rendered.
 *
 * Shape of an entry:
 *
 *   {
 *     id: 'dQw4w9WgXcQ',
 *     title: { en: 'Palletjack demo', de: 'Palletjack-Demo' },
 *   }
 */
export const SHOWCASE: ShowcaseVideo[] = [
   {
      id: 'LiP0DFsY13s',
      title: { en: 'Physics demo', de: 'Physik demo' },
   },
    {
      id: 'vaUzclN3w3Y',
      title: { en: 'State Machine an AI', de: 'Zustandsmaschine und KI' },
   }
];
