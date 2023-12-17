import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'mt-grid-view',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './grid-view.component.html',
  styleUrl: './grid-view.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GridViewComponent {
  @Input()
  public data: any[] | null = null;
}
