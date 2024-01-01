import { ChangeDetectorRef, inject, Pipe, PipeTransform } from '@angular/core';
import { Observable, take } from 'rxjs';

@Pipe({
  name: 'mtFetch',
  pure: false,
  standalone: true
})
export class FetchPipe implements PipeTransform {
  private readonly cdRef = inject(ChangeDetectorRef);

  private obs: Observable<any> | null = null;
  private data: any[] | null = null;

  transform(observable: Observable<any>): any[] {
    if (this.data != null || this.obs != null) {
      return this.data ?? [];
    }

    this.obs = observable;

    observable.pipe(take(1)).subscribe((data) => {
      this.data = data;
      this.cdRef.markForCheck();
    });

    return this.data ?? [];
  }
}
