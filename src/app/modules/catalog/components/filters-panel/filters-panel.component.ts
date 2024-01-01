import { Component, DestroyRef, EventEmitter, inject, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { CommonModule, DOCUMENT } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ConnectedPosition, Overlay, OverlayModule } from '@angular/cdk/overlay';
import { MatButtonModule } from '@angular/material/button';
import { panelOpenAnimation } from './animations';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepicker, MatDatepickerModule } from '@angular/material/datepicker';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, MatNativeDateModule } from '@angular/material/core';
import { MatSliderModule } from '@angular/material/slider';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { Filters, RecordToTypedFormControls } from './types';
import { MatInputModule } from '@angular/material/input';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { MatDividerModule } from '@angular/material/divider';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

// Depending on whether rollup is used, moment needs to be imported differently.
// Since Moment.js doesn't have a default export, we normally need to import using the `* as`
// syntax. However, rollup creates a synthetic default module and we thus need to import it using
// the `default as` syntax.
import * as _moment from 'moment';
import { default as _rollupMoment, Moment } from 'moment';
import { ResourceService } from './resource.service';
import { FetchPipe } from './fetch.pipe';

const moment = _rollupMoment || _moment;

@Component({
  selector: 'mt-filters-panel',
  standalone: true,
  imports: [
    CommonModule,
    OverlayModule,
    MatNativeDateModule,
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
    MatSelectModule,
    MatDatepickerModule,
    MatSliderModule,
    ReactiveFormsModule,
    MatInputModule,
    MatDividerModule,
    MatAutocompleteModule,
    FetchPipe
  ],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [ MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS ]
    },
    {
      provide: MAT_DATE_FORMATS,
      useValue: {
        parse: {
          dateInput: 'MM/YYYY'
        },
        display: {
          dateInput: 'MM/YYYY',
          monthYearLabel: 'MMM YYYY',
          dateA11yLabel: 'LL',
          monthYearA11yLabel: 'MMMM YYYY'
        }
      }
    }
  ],
  animations: [ panelOpenAnimation ],
  templateUrl: './filters-panel.component.html',
  styleUrl: './filters-panel.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class FiltersPanelComponent implements OnInit {
  private readonly overlay = inject(Overlay);
  private readonly documentRef = inject(DOCUMENT);
  private readonly destroyRef = inject(DestroyRef);
  readonly resourceService = inject(ResourceService);

  readonly SLIDER_LABEL_FORMATTER = (n: number) => n.toFixed(1);

  @Input()
  open: boolean = false;

  @Output()
  openChange = new EventEmitter<boolean>();

  @Output()
  filterChange = new EventEmitter<Filters>();

  readonly overlayPositions: ConnectedPosition[] = [
    {
      originX: 'start',
      originY: 'top',
      overlayX: 'start',
      overlayY: 'top'
    }
  ];

  readonly scrollStrategy = this.overlay.scrollStrategies.noop();

  readonly filtersForm = new FormGroup<RecordToTypedFormControls<Filters>>({
    abv_gt: new FormControl(null),
    abv_lt: new FormControl(null),
    ibu_gt: new FormControl(null),
    ibu_lt: new FormControl(null),
    ebc_gt: new FormControl(null),
    ebc_lt: new FormControl(null),
    beer_name: new FormControl(null),
    yeast: new FormControl(null),
    brewed_before: new FormControl(null),
    brewed_after: new FormControl(null),
    hops: new FormControl(null),
    malt: new FormControl(null),
    food: new FormControl(null)
  });

  get documentElement(): HTMLElement {
    return this.documentRef.documentElement;
  }

  ngOnInit() {
    this.filtersForm.valueChanges.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      takeUntilDestroyed(this.destroyRef)
    ).subscribe((value) => {
      this.filterChange.next(value as Required<typeof value>);
    });
  }

  onCloseClick(): void {
    this.openChange.emit(false);
  }

  setMonthAndYear(normalizedMonthAndYear: Moment, control: AbstractControl, datepicker: MatDatepicker<Moment>): void {
    const controlValue = control.value ?? moment();
    controlValue.month(normalizedMonthAndYear.month());
    controlValue.year(normalizedMonthAndYear.year());
    control.setValue(controlValue);
    control.markAsDirty();
    datepicker.close();
  }
}
