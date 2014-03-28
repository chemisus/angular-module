



function module(app, requires) {
  console.log(arguments);
  
  if (!(app in module.modules)) {
    module.modules[app] = {
      providers: [],
    };
    
    var methods = Object.keys(angular.module('someSuperObscureModuleName', []));

    methods.map(function (method) {
      module.modules[app][method] = function () {
        this.providers.push([method, arguments]);
        
        return this;
      };
    });
  }
  
  if (arguments.length === 2) {
    var actual = angular.module(app, requires);
    
    module.modules[app].providers.map(function (provider) {
      actual[provider[0]].apply(null, provider[1])
    });
    
    module.modules[app] = actual;
  }
  
  return module.modules[app];
}


module.modules = {};

module('App')
  .value('a', 'A')
  .value('b', 'B');

module('App')
   .filter('filter', function () {
     
   });

module('App', [])
  .value('c', 'C')
  .value('d', 'D');

module('App')
  .value('e', 'E')
  .value('f', 'F');

module('App')
  .run(function (a, b, c, d, e, f) {
    console.log(a, b, c, d, e, f);
  });
