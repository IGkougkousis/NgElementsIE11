# Angular Elements IE11

A template project to create independent angular elements that work in IE11.

This was inspired by this series of blog posts:

[Angular Elements, Part I: A Dynamic Dashboard In Four Steps With Web Components](https://www.angulararchitects.io/aktuelles/angular-elements-part-i/)

[Angular Elements, Part II: Lazy And External Web Components](https://www.angulararchitects.io/aktuelles/angular-elements-part-ii/)

[Angular Elements, Part III: Angular Elements without Zone.js](https://www.angulararchitects.io/aktuelles/angular-elements-part-iii/)

[Angular Elements, Part IV: Content Projection with Slots in Angular Elements (>=7)](https://www.angulararchitects.io/aktuelles/content-projection-with-slots-in-angular-elements-7/)

[Angular Elements, Part V: Your Options For Building Angular Elements With The CLI](https://www.angulararchitects.io/aktuelles/your-options-for-building-angular-elements/)


Please read them, they are very good. Parts 1,2,5 are the most relevant. I don't use anything from 3, 4 at all. But still read them.

Obviously `git clone`, `npm install` before doing anything else.

## Create new elements

1. Use CLI to generate a new application: `ng generate application my-app`

2. In `angular.json` find the part that refers to `my-app` and change `outputHashing` to `"none"` and `extractCss` to `false`. Add `"node_modules/@webcomponents/custom-elements/src/native-shim.js"` to the `scripts` array (should be empty by default)

3. In `projects/my-app/src//polyfills.ts` you must include:

```typescript
import '@webcomponents/webcomponentsjs/custom-elements-es5-adapter.js';
import 'core-js';
import 'document-register-element';
import 'web-animations-js';
import 'whatwg-fetch';
import '@angular/localize/init';
import 'zone.js/dist/zone';
```

I know these are too many, but this is to stay on the safe side. Through trial and error, find out what you don't need and remove it.

4. In `project/my-app/src/.browserslistrc` delete the `not` before `IE9-IE11`

5. Assuming you only have an `AppComponent`, make sure your `app.module.ts` looks something like this:

```typescript
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injector, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { createCustomElement } from '@angular/elements';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  entryComponents: [AppComponent],
  providers: [],
})
export class AppModule {
  constructor(private injector: Injector) {}
  ngDoBootstrap() {
    const appCE = createCustomElement(AppComponent, {
      injector: this.injector,
    });
    customElements.define('my-app', appCE);
  }
}
```

Write your code and build. It should now work in IE11.

`npm run build:my-app` <-- you need to write this in the style of `build:demo`. Same for `dev:demo`

## Test your element

I created a dev server for testing purposes. The point of Angular Elements is that they don't need to part of an existing Angular application in order to work. They are independent.

`devserver.js` is a simple express app that server `devindex.html` and the element code that resides in `/compiled-elements`. 

The npm scripts `build:demo` and `dev:demo` show how to build and run dev environment for the `demo-element`. Follow the same procedure. Create your own and run them. Pass the element name as a parameter to `concat-scripts.js` and `devserver.js` and it should work.

You will only need to **manually** change `devindex.html`. I couldn't find a way to make that generic, if you have any ideas, pull requests are welcome.

## Tips

### Encapsulate your styles

You should encapsulate the styles you want to use in your element so they don't get applied to the parent document. For example if you want to use Bootstrap in your element, try this:

**projects/demo-element/src/styles.scss**

```scss
demo-element {
  @import "~bootstrap/scss/bootstrap";
}
```

where `demo-element` is the name you define in `app.module.ts`, NOT the project name. The custom element you define there is what the browser will understand.

## Don't sweat the bundle size

Any client asking you to support IE is probably on a corporate intranet, so network is less of an issue compare to websites served over the internet. Anything you give them with this project template is probably going to be much more responsive and faster compared to whatever 12 year old jQuery they're currently using.
