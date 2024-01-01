import { ChangeDetectionStrategy, Component, inject, OnInit, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Beer } from '../../core/types';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonToggleChange, MatButtonToggleModule } from '@angular/material/button-toggle';
import { ListViewComponent } from './components/list-view/list-view.component';
import { CardsViewComponent } from './components/cards-view/cards-view.component';
import { GridViewComponent } from './components/grid-view/grid-view.component';
import { ActivatedRoute, Router } from '@angular/router';
import { FiltersPanelComponent } from './components/filters-panel/filters-panel.component';
import { CdkConnectedOverlay } from '@angular/cdk/overlay';
import { MatSelectModule } from '@angular/material/select';
import { PunkService } from './punk.service';

const VIEW_TYPE_QUERY_PARAM_NAME = 'view_type';

@Component({
  selector: 'mt-catalog',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatButtonToggleModule,
    FiltersPanelComponent,
    ListViewComponent,
    CardsViewComponent,
    GridViewComponent,
    CdkConnectedOverlay,
    MatSelectModule
  ],
  templateUrl: './catalog.component.html',
  styleUrl: './catalog.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CatalogComponent implements OnInit {
  private readonly router = inject(Router);
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly punkService = inject(PunkService);

  data: Beer[] | null = []; // change to null

  isFilterPanelOpen = false;

  get viewTypeRouterParam(): string | null {
    return this.activatedRoute.snapshot.queryParamMap.get(VIEW_TYPE_QUERY_PARAM_NAME);
  }

  ngOnInit(): void {
    this.punkService.getPaginated({
      page: 1,
      per_page: 2,
      abv_gt: 50
    }).subscribe((result) => {
      // console.log('BEEEEEEER:', result);
    });
  }

  onViewTypeChange(event: MatButtonToggleChange): void {
    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: {
        [VIEW_TYPE_QUERY_PARAM_NAME]: event.value
      },
      queryParamsHandling: 'merge'
    });
  }

  onFiltersClick(): void {
    this.isFilterPanelOpen = !this.isFilterPanelOpen;
  }
}
