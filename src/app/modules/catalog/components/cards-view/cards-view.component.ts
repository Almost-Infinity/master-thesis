import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'mt-cards-view',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cards-view.component.html',
  styleUrl: './cards-view.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardsViewComponent {
  @Input()
  public data: any[] | null = null;
}
