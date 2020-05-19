import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injector, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { createCustomElement } from '@angular/elements';

import { DemoComponent } from './demo/demo.component';

@NgModule({
  declarations: [DemoComponent],
  imports: [BrowserModule],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  entryComponents: [DemoComponent],
})
export class AppModule {
  constructor(private injector: Injector) {}
  ngDoBootstrap() {
    const demoCE = createCustomElement(DemoComponent, {injector: this.injector});
    customElements.define('demo-element', demoCE);
  }
}
