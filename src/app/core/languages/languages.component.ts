import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  Renderer2,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslocoService } from '@ngneat/transloco';
import { firstValueFrom } from 'rxjs';
import { TranslationService } from 'src/app/core/translation/translation.service';

import { AnimationBuilder, animate, style } from '@angular/animations';
import { AvailableLangs } from '../services/navigation/navigation.type';

@Component({
  selector: 'languages',
  templateUrl: './languages.component.html',
  styleUrls: ['./languages.component.scss'],
})
export class LanguagesComponent implements OnInit {
  selected: any;

  languages: AvailableLangs = [];
  isLangageOpen: boolean = false;

  @Input() showLabel: boolean = true;

  @Output()
  public showLoading: EventEmitter<boolean> = new EventEmitter<boolean>(false);
  flagCodes: any;
  private _asideOverlay: HTMLElement | null = null;
  private _player: any;
  private readonly _handleOverlayClick: any;

  constructor(
    private _translocoService: TranslocoService,
    private _translateService: TranslationService,

    private _activatedRoute: ActivatedRoute,
    private _changeDetectorRef: ChangeDetectorRef,
    private _renderer2: Renderer2,
    private _animationBuilder: AnimationBuilder,
    private _elementRef: ElementRef
  ) {
    this._handleOverlayClick = (): void => {
      this.toggleLangage();
    };
  }
  ngOnInit(): void {
    this.languages = this._translateService.getAvailableLangues();
    // Set the country ISO codes for languages for flags
    this.flagCodes = {
      en: 'us',
      fr: 'fr',
      cn: 'cn',
      pt: 'pt',
    };
    // set the current language to the select
    this._translateService.getSelectedLang().subscribe((curr) => {
      this.selected = this.languages.find((el) => el.id == curr);
    });
  }

  // Public methods
  toggleLangage() {
    this.isLangageOpen = !this.isLangageOpen;
    if (this.isLangageOpen) {
      this._showOverlay();
    } else {
      this._hideOverlay();
    }
  }

  async onSelectedLangage(langue: string, event: Event) {
    event.stopPropagation();
    this.selected = this.languages.find((el) => el.id == langue);
    this.isLangageOpen = false;
    this._changeDetectorRef.detectChanges();
    // current language for translation
    this._translocoService.setActiveLang(langue);
    // apply current language for every layout children
    this._translateService.setSelectedLang(langue);

    // loading bar
    this.showLoading.emit(true);
    this._hideOverlay();

    try {
      // get the translation
      const translations = await firstValueFrom(
        this._translateService.getTranslationWithCustomPath(
          langue,
          (await this._activatedRoute.snapshot.data['i18nPath']) ??
            (await this._activatedRoute.snapshot.firstChild?.data['i18nPath'])
        )
      );
      if (translations) {
        this._translocoService.setTranslation(translations, langue, {
          merge: true,
        });
      }
    } finally {
      this.showLoading.emit(false);
    }
  }

  private _showOverlay(): void {
    // Return if there is already an overlay
    if (this._asideOverlay) return;

    // Create the aside overlay element
    this._asideOverlay = this._renderer2.createElement('div');

    // Add a class to the aside overlay element
    this._asideOverlay!.classList.add('langage-overlay');

    // Append the aside overlay to the parent of the navigation
    this._renderer2.appendChild(
      this._elementRef.nativeElement.parentElement,
      this._asideOverlay
    );

    // Create the enter animation and attach it to the player
    this._player = this._animationBuilder
      .build([
        animate(
          '400ms cubic-bezier(0.25, 0.8, 0.25, 1)',
          style({ opacity: 1 })
        ),
      ])
      .create(this._asideOverlay);

    // Play the animation
    this._player.play();

    // Add an event listener to the aside overlay
    this._asideOverlay!.addEventListener('click', this._handleOverlayClick);
  }
  private _hideOverlay(): void {
    if (!this._asideOverlay) return;

    // Create the leave animation and attach it to the player
    this._player = this._animationBuilder
      .build([
        animate(
          '400ms cubic-bezier(0.25, 0.8, 0.25, 1)',
          style({ opacity: 0 })
        ),
      ])
      .create(this._asideOverlay);

    // Play the animation
    this._player.play();

    // Once the animation is done...
    this._player.onDone(() => {
      // If the aside overlay still exists...
      if (this._asideOverlay) {
        // Remove the event listener
        this._asideOverlay.removeEventListener(
          'click',
          this._handleOverlayClick
        );

        // Remove the aside overlay
        this._asideOverlay!.parentNode!.removeChild(this._asideOverlay);
        this._asideOverlay = null;
      }
    });
  }
}
