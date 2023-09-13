import {
  Component,
  EventEmitter,
  Inject,
  Input,
  OnInit,
  Output,
  PLATFORM_ID,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Options } from '@angular-slider/ngx-slider';

@Component({
  selector: 'app-ms-filter-sidebar',
  templateUrl: './ms-filter-sidebar.component.html',
  styleUrls: ['./ms-filter-sidebar.component.scss'],
})
export class MsFilterSidebarComponent implements OnInit {
  @Input() defaultValue;
  @Input() multiple = false;
  @Input() filterTitle = 'Category';
  private _selectedOptions: string[] = [];
  @Input() get selectedOptions(): string[] {
    return this._selectedOptions;
  }

  set selectedOptions(value: string[]) {
    this._selectedOptions = value;
    this.appliedFilterName();
  }

  @Input() options: any = [];
  @Input() isRange = false;
  @Input() isRadio = false;
  @Input() isSelect = false;
  @Input() maxRange = 1000;
  @Input() minRange = 0;
  @Output() optionsFilter: EventEmitter<any> = new EventEmitter<any>();
  @Output() optionsNameFilter: EventEmitter<any> = new EventEmitter<any>();

  isBrowser: any;
  public collapse = true;
  withColors = false;
  sliderOpts: Options = {
    floor: 0,
    ceil: 1000,
    translate: (value: number): string => `€${value}`,
  };

  constructor(@Inject(PLATFORM_ID) private platformId: object) {
    if (isPlatformBrowser(this.platformId)) {
      this.isBrowser = true; // for ssr
    }

    this.optionsFilter.subscribe(() => {
      this.appliedFilterName();
    });
  }

  ngOnInit(): void {
    if (this.options && this.options.length) {
      this.withColors = this.options[0] instanceof Object;
    }
  }

  appliedFilterName(emit = true) {
    if (this.isRadio && this.options.length) {
      if (!this._selectedOptions.length) {
        if (emit) {
          this.optionsNameFilter.emit(
            this.defaultValue ? this.defaultValue : ''
          );
        }
      } else {
        const optionsNames = this._selectedOptions.map(
          id => this.options.find(o => o.id === id).name
        );
        if (emit) {
          this.optionsNameFilter.emit(
            this.isRadio ? optionsNames[0] : optionsNames
          );
        }
      }
    }
  }

  appliedFilter(value) {
    if (!this.isRadio) {
      const index = this._selectedOptions.indexOf(value); // checked and unchecked value
      this._selectedOptions = Object.assign([], this._selectedOptions); // Copy object to avoid problems with not extensive object
      if (index === -1) {
        this._selectedOptions.push(value);
      } else {
        this._selectedOptions.splice(index, 1);
      }
    } else {
      this._selectedOptions = [value];
    }
    this.optionsFilter.emit(
      this._selectedOptions.length ? this._selectedOptions : []
    );
  }

  appliedFilterUnique(option) {
    this.optionsFilter.emit(option);
  }

  changeSelection(items) {
    this._selectedOptions = items.map(item => item.id);
    this.optionsFilter.emit(this._selectedOptions);
  }

  checked(item) {
    if (this._selectedOptions.indexOf(item) !== -1) {
      return true;
    }
  }

  changeRangeValue(event) {
    const values = { min: event.value, max: event.highValue };
    this.optionsFilter.emit(values);
  }

  removeFilter() {
    this._selectedOptions = [];
    if (!this.isRange) {
      this.optionsFilter.emit(this.defaultValue ? [this.defaultValue] : []);
    } else {
      this.minRange = this.sliderOpts.floor;
      this.maxRange = this.sliderOpts.ceil;
      this.optionsFilter.emit({ min: this.minRange, max: this.maxRange });
    }
  }
}
