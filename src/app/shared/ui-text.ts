import { Lang } from './language';

/**
 * Interface strings that are not part of the Markdown content.
 *
 * Article text lives in src/content/**; this covers only the chrome around it.
 */
export interface UiText {
  role: string;
  tagline: string;
  overview: string;
  skills: string;
  commercialReleases: string;
  projects: string;
  showcase: string;
  experience: string;
  education: string;
  certificates: string;
  downloads: string;
  contact: string;
  contactIntro: string;
  subjectLabel: string;
  messageLabel: string;
  sendMessage: string;
  copyEmail: string;
  emailCopied: string;
  findMeOnline: string;
  location: string;
  focus: string;
  email: string;
  viewProject: string;
  viewRelease: string;
  technologiesUsed: string;
  backToProfile: string;
  projectNotFound: string;
  noProjectMatching: (slug: string) => string;
  playVideo: (title: string) => string;
  languageToggle: string;
  sections: string;
}

export const UI_TEXT: Record<Lang, UiText> = {
  en: {
    role: 'Software and systems engineer',
    tagline: 'Building maintainable software and systems with full proof design.',
    overview: 'Overview',
    skills: 'Skills',
    commercialReleases: 'Commercial Releases',
    projects: 'Projects',
    showcase: 'Showcase',
    experience: 'Practical Experience',
    education: 'Education',
    certificates: 'Certificates',
    downloads: 'Downloads',
    contact: 'Contact',
    contactIntro:
      'Write a message below and press send — it opens in your own mail app, addressed to me.',
    subjectLabel: 'Subject',
    messageLabel: 'Message',
    sendMessage: 'Send message',
    copyEmail: 'Copy email',
    emailCopied: 'Copied',
    findMeOnline: 'Find me online',
    location: 'Location',
    focus: 'Focus',
    email: 'Email',
    viewProject: 'View project →',
    viewRelease: 'View release →',
    technologiesUsed: 'Technologies used',
    backToProfile: 'Back to profile',
    projectNotFound: 'Project not found',
    noProjectMatching: (slug) => `There is no project matching “${slug}”.`,
    playVideo: (title) => `Play: ${title}`,
    languageToggle: 'Language: English. Switch to German.',
    sections: 'Sections',
  },
  de: {
    role: 'Software- und Systemingenieur',
    tagline: 'Entwicklung wartbarer Software und Systeme mit einem absolut zuverlässigen Design.',
    overview: 'Überblick',
    skills: 'Fähigkeiten',
    commercialReleases: 'Kommerzielle Veröffentlichungen',
    projects: 'Projekte',
    showcase: 'Showcase',
    experience: 'Praktische Erfahrung',
    education: 'Ausbildung',
    certificates: 'Zertifikate',
    downloads: 'Downloads',
    contact: 'Kontakt',
    contactIntro:
      'Schreiben Sie unten eine Nachricht und klicken Sie auf Senden — sie öffnet sich in Ihrem eigenen E-Mail-Programm, an mich adressiert.',
    subjectLabel: 'Betreff',
    messageLabel: 'Nachricht',
    sendMessage: 'Nachricht senden',
    copyEmail: 'E-Mail kopieren',
    emailCopied: 'Kopiert',
    findMeOnline: 'Online finden',
    location: 'Standort',
    focus: 'Schwerpunkt',
    email: 'E-Mail',
    viewProject: 'Projekt ansehen →',
    viewRelease: 'Release ansehen →',
    technologiesUsed: 'Verwendete Technologien',
    backToProfile: 'Zurück zum Profil',
    projectNotFound: 'Projekt nicht gefunden',
    noProjectMatching: (slug) => `Es gibt kein Projekt mit dem Namen „${slug}“.`,
    playVideo: (title) => `Abspielen: ${title}`,
    languageToggle: 'Sprache: Deutsch. Zu Englisch wechseln.',
    sections: 'Abschnitte',
  },
};
