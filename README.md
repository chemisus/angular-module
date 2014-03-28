angular-module
==============

## Why?

The package angular-module adds the ability to specify a provider for a module before the module itself has officially been declared.

For example, in traditional angular, the following would not be possible.

```
  angular.module('App').value('a', 'A'); // <-- this causes an error, since App has not been declared.
  angular.module('App', []);
```

With this package, the above example is possible.

## How?

This package basically inserts itself as the angular.module method and then holds onto any providers with the arguments that are called before the package has been declared. All of your typical `service`, `factory`, `filter`, `directive` calls will actually be called on a placeholder module until the official module has been declared.

```
  angular.module('App')       // Creates a placeholder module, then returns the placeholder module.
    .value('a', 'A')          // Creates a value, then returns the placeholder module.
    .value('b', 'B')          // Creates a value, then returns the placeholder module.
    .run(function (a, b, c) { // Creates a run function, then returns placeholder module.
      console.log(a, b, c);   // Will log ['A', 'B', 'C'] when App is ran.
    });
    
  angular.module('App', [])   // Officialy declares the App module. It would be at this point that the value
                              // providers for 'a', 'b', and the run provider above would be called on the App
                              // module. Any calls from here on out will be called on the App module, and the
                              // placeholder will no longer be used. The official App module is returned.
    .value('c', 'C')          // Creates a value, then returns the official module.
```

## Installation

bower install angular-module

<script src="bower_components/angular-module/angular-module.js"></script>

## Configuration

None at the moement.

## Usage

Just keep doin' whatcher doin'.
