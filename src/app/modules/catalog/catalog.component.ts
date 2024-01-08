import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
  OnInit,
  ViewEncapsulation
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Beer } from '../../core/types';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ListViewComponent } from './components/list-view/list-view.component';
import { FiltersPanelComponent } from './components/filters-panel/filters-panel.component';
import { CdkConnectedOverlay } from '@angular/cdk/overlay';
import { PunkService } from './punk.service';
import { take } from 'rxjs';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    FiltersPanelComponent,
    ListViewComponent,
    CdkConnectedOverlay
  ],
  templateUrl: './catalog.component.html',
  styleUrl: './catalog.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CatalogComponent implements OnInit {
  private readonly punkService = inject(PunkService);
  private readonly cdRef = inject(ChangeDetectorRef);

  data: Beer[] | null = null; // change to null

  isFilterPanelOpen = false;

  ngOnInit(): void {
    this.fetchBeer();
  }

  fetchBeer(params?: Record<string, any>): void {
    this.punkService.getPaginated(params).pipe(take(1)).subscribe((data) => {
      this.data = data;
      this.cdRef.detectChanges();
    });
  }
}
