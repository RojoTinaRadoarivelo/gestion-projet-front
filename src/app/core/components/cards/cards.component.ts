import { ChangeDetectorRef, Component, Input, OnChanges, inject } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss'],
})
export class CardsComponent implements OnChanges {
  @Input() widthClass = 'w-full';
  @Input() heightClass = 'h-full';
  @Input() paddingClass = 'py-8';
  // @Input() boxShadowClass: string = 'shadow shadow-sm';
  @Input() boxShadowClass = '';
  @Input() bgClass = 'bg-white';

  cardClass = '';

  @Input() title = '';
  @Input() titleClass = 'text-center text-2xl font-semibold';

  @Input() lang = false;
  @Input() langClass = 'w-full flex justify-end';

  @Input() footerClass = '';
  private readonly _cdr = inject(ChangeDetectorRef);

  ngOnChanges(): void {
    this.cardClass = [
      this.widthClass,
      this.heightClass,
      this.bgClass,
      this.boxShadowClass,
      this.paddingClass,
      'rounded-lg',
    ].join(' ');
    this._cdr.markForCheck();
  }
}
