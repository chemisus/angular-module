(function () {
  module.module = angular.module;
  
  function module(app, requires) {
    console.log(arguments);
    
    if (!(app in module.modules)) {
      module.modules[app] = {
        providers: [],
      };
      
      var methods = Object.keys(module.module('someSuperObscureModuleName', []));
  
      methods.map(function (method) {
        module.modules[app][method] = function () {
          this.providers.push([method, arguments]);
          
          return this;
        };
      });
    }
    
    if (arguments.length === 2) {
      var actual = module.module(app, requires);
      
      module.modules[app].providers.map(function (provider) {
        actual[provider[0]].apply(null, provider[1])
      });
      
      module.modules[app] = actual;
    }
    
    return module.modules[app];
  }
  
  angular.module = module;
  
  module.modules = {};
})();
