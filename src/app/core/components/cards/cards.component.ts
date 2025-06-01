import {
  ChangeDetectorRef,
  Component,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss'],
})
export class CardsComponent implements OnChanges {
  @Input() widthClass: string = 'w-full';
  @Input() heightClass: string = 'h-full';
  @Input() paddingClass: string = 'py-8';
  // @Input() boxShadowClass: string = 'shadow shadow-sm';
  @Input() boxShadowClass: string = '';
  @Input() bgClass: string = 'bg-white';

  cardClass: string = '';

  @Input() title: string = '';
  @Input() titleClass: string = 'text-center text-2xl font-semibold';

  @Input() lang: boolean = false;
  @Input() langClass: string = 'w-full flex justify-end';

  @Input() footerClass: string = '';

  constructor(private readonly _cdr: ChangeDetectorRef) {}

  ngOnChanges(changes: SimpleChanges): void {
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
