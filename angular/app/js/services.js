'use strict';

angular.module('myApp.services', ['ngResource'])

  .value('cms', 'http://angular.dev')

  .factory('cmsSiteSettings', ['$resource', 'cms', function($resource, cms) {
    return $resource(cms + '/api/1.0/site-information.json', {}, {
      get: {
        method: 'GET',
        cache: true
      }
    });
  }])

  .factory('cmsMainMenu', ['$resource', 'cms', function($resource, cms) {
    return $resource(cms + '/api/1.0/main-menu.json', {}, {
      get: {
        method: 'GET',
        cache: true
      }
    });
  }])

  .factory('cmsNode', ['$resource', 'cms', function($resource, cms) {
    return $resource(cms + '/api/1.0/nodes.json',
      {
        path: '@path'
      },
      {
        get: {
          method: 'GET',
          cache: true
        }
      }
    );
  }])

  .factory('cmsTemplate', ['$http', '$templateCache', '$q', '$timeout', function($http, $templateCache, $q, $timeout) {
    return {
      getPartial: function(node) {
        var deferred = $q.defer();
        $timeout(function() {
          var templateUrl = '/_partials/nodes/' + node.type + '.html';
          $http.get(templateUrl, {
            cache: $templateCache
          })
            .success(function(data) {
              $templateCache.put(templateUrl, data);
              deferred.resolve(templateUrl);
            })
            .error(function(data) {
              var genericTemplateUrl = '/_partials/nodes/node.html';
              $http.get(genericTemplateUrl, {
                cache: $templateCache
              })
                .success(function(data) {
                  $templateCache.put(templateUrl, data);
                  deferred.resolve(templateUrl);
                })
                .error(function(data){
                  deferred.reject();
                });
          });
        });
        return deferred.promise;
      }
    };
  }])

  .factory('cmsNews', ['cms', '$resource', function(cms, $resource) {
    return $resource(cms + '/api/1.0/news.json', {}, {
      get: {
        method: 'GET',
        cache: true
      }
    });
  }])

  .factory('cmsTout', ['cms', '$resource', function(cms, $resource) {
    return $resource(cms + '/api/1.0/touts.json', {
      id: '@id'
    }, {
      get: {
        method: 'GET',
        cache: true
      }
    });
  }])
;
