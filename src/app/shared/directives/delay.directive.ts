import {Directive, Input, TemplateRef, ViewContainerRef} from '@angular/core';

@Directive({
  selector: '[ajDelay]'
})
export class DelayDirective {

  // private _ajDelay: number;

  constructor(private templateRef: TemplateRef<any>,
              private viewContainerRef: ViewContainerRef) {}

  @Input() set ajDelay(time: number) {
    // this._ajDelay = time;
    setTimeout(() => {
      this.viewContainerRef.createEmbeddedView(this.templateRef);
    }, time);
  }
  // get ajDelay(): number {
  //   return this._ajDelay;
  // }
}


// import {Component} from '@angular/core';
//
// @Component({
//   selector: 'app-root',
//   template: `
//     <div *ngFor="let item of [1,2,3,4,5,6]">
//       <card *appDelay="500 * item">
//         {{item}}
//       </card>
//     </div>
//   `
// })
// export class AppComponent {
// }

// import {Component} from '@angular/core';
//
// @Component({
//   selector: 'card',
//   template: `<ng-content></ng-content>`,
//   styles: [`
//     :host {
//       padding: 2rem;
//       font-size: 2rem;
//       font-family: 'Helvetica', sans-serif;
//       font-weight: 300;
//       background: #e3f2fd;
//       margin: 1rem;
//       display: inline-block;
//     }
//   `]
// })
// export class CardComponent {
//   ngOnInit() {
//     console.log('card component loaded!');
//   }
// }
