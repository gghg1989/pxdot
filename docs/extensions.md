# Extensions

Extensions are loaded on startup from `./PxDot/extensions/` based on the ordering of a `config.json` file in that directory. Just create a folder there along with a package.json that points to your main file, and you're set.

## Example

From your module, you can access other modules in the application.

Behind the scenes PxDot is using SystemJS to dynamically load these modules.

## Creating Views

As a simple example, let's create an extension that displays all other extensions loaded by the application.

```tsx
import * as React from 'react';
import {Extension} from 'pxdot';

@Extension
class ExtensionView extends React.Component {
  render() {
    let { extensions } = this;
    return (
      <div/>
        {
          extensions.map((e, i) =>
          <div key={i}>
            <h1>{e.title}</h1>
            <h2>{e.author}</h2>
            <p>{e.description}</p>
          </div>
        )
        }
      </div>
      );
  }
}

export default ExtensionView;
```