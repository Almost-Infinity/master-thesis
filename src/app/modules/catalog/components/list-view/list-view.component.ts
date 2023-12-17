import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ColDef } from 'ag-grid-community';
import { Beer } from '../../../../core/types';
import { AG_GRID_LOCALE_UA } from '../../../../core/ag-grid-locale-ua';
import { AgGridModule } from 'ag-grid-angular';

@Component({
  selector: 'mt-list-view',
  standalone: true,
  imports: [ CommonModule, AgGridModule ],
  template: `
      <ag-grid-angular class="ag-theme-material grid"
                       [rowData]="data"
                       [columnDefs]="colDefs"
                       [localeText]="agGridLocale"
      ></ag-grid-angular>
  `,
  styleUrl: './list-view.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListViewComponent {
  @Input()
  public data: any[] | null = null;

  readonly agGridLocale = AG_GRID_LOCALE_UA;

  readonly colDefs: ColDef<Beer>[] = [
    {
      field: 'id',
      headerName: '#',
    },
    {
      field: 'image_url',
    },
    {
      field: 'name',
      headerName: "Назва"
    },
    {
      field: 'tagline',
      headerName: 'Гасло',
    },
    {
      field: 'first_brewed',
      headerName: 'Дата створення'
    },
    {
      /* https://en.wikipedia.org/wiki/Alcohol_by_volume */
      field: 'abv',
      headerName: 'Міцність',
    },
    {
      /* https://en.wikipedia.org/wiki/Beer_measurement#Bitterness */
      field: 'ibu',
      headerName: 'Гіркота'
    },
    {
      field: 'target_fg',
    },
    {
      field: 'target_og',
    },
    {
      /* https://en.wikipedia.org/wiki/European_Brewery_Convention */
      field: 'ebc',
      headerName: 'Інтенсивність кольору',
    },
    {
      /* https://en.wikipedia.org/wiki/Standard_Reference_Method */
      field: 'srm',
      headerName: 'Колір',
    },
    {
      field: 'ph',
      headerName: 'Кислотність',
    },
    {
      /* https://en.wikipedia.org/wiki/Attenuation_(brewing) */
      field: 'attenuation_level',
      headerName: 'Attenuation',
    }
  ];
}
