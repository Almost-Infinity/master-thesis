import { animate, style, transition, trigger } from '@angular/animations';

export const panelOpenAnimation = trigger('panelOpenAnimation', [
  transition(':enter', [
    style({ transform: 'translateX(-100%)' }),
    animate('150ms ease-in-out', style({ transform: 'translateX(0)' })),
  ]),
  transition(':leave', animate('150ms ease-in-out', style({ transform: 'translateX(-100%)' })))
]);
