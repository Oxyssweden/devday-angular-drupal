'use strict';

angular.module('myApp.controllers', [])
  .controller('SiteCtrl', ['$scope', 'cmsSiteSettings', function($scope, cmsSiteSettings) {
    $scope.site = {
      templates: {
        mainMenu: '/_partials/mainMenu.html',
        front: '/_partials/front.html'
      }
    };
    var siteSettings = cmsSiteSettings.get({}, function (settings) {
      if (settings.variables) {
        for (var key in settings.variables) {
          if (settings.variables.hasOwnProperty(key) && key.substr(0, 5) === 'site_') {
            $scope.site[key.substr(5)] = settings.variables[key];
          }
        }
      }
    });
  }])

  .controller('MainMenuCtrl', ['$scope', 'cmsMainMenu', function($scope, cmsMainMenu) {
   $scope.mainMenu = [];
    var mainMenu = cmsMainMenu.get({}, function(data) {
      if (data.links.length) {
        for (var i = 0; i < data.links.length; i++) {
          var link = data.links[i].link;
          if (link.internal_path === '<front>') {
            link.path = '/';
          }
          else {
            link.path = '/' + link.alias;
          }
          $scope.mainMenu.push(data.links[i].link);
        }
      }
    });
  }])

  .controller('PageCtrl', ['$scope', 'cmsNode', 'cmsSiteSettings', '$location', 'cmsTemplate', function($scope, cmsNode, cmsSiteSettings, $location, cmsTemplate) {
    $scope.node = {};
    $scope.front = false;
    $scope.path = $location.path().substr(1);

    var siteSettings = cmsSiteSettings.get({}, function (settings) {

      // Forward to the actual front page URL instead of just "/"
      if ($scope.path.length <= 1 && settings.variables.site_frontpage && settings.variables.site_frontpage.length) {
        $scope.path = '/'+ settings.variables.site_frontpage;
        $location.path($scope.path);
      }
      else {
        var node = cmsNode.get({path: $scope.path}, function(data) {
          if (data.nodes && data.nodes[0] && data.nodes[0].node) {
            $scope.node = data.nodes[0].node;

            // See if this is the front page.
            if (settings.variables.site_frontpage && ($scope.node.path && $scope.node.path == settings.variables.site_frontpage) || ('node/' + $scope.node.id == settings.variables.site_frontpage)) {
              $scope.front = true;
            }

            // See if this is an allowed content type.
            if ($scope.node.type && settings.variables.allowed_content_types && settings.variables.allowed_content_types.indexOf($scope.node.type) !== -1) {
              // Redirect to an aliased path if it exists.
              if ($scope.path !== $scope.node.path) {
                $location.path($scope.node.path).replace();
              }

              // Discover the template for this content type.
              cmsTemplate.getPartial($scope.node).then(function(partialUrl) {
                $scope.templateUrl = partialUrl;
              }, function () {
                $location.path('/404');
              });
            }
            else {
              $location.path('/404');
            }
          }
          else {
            $location.path('/404');
          }
        });
      }
    });
  }])

  .controller('NewsCtrl', ['$scope', '$http', 'cmsNews', function($scope, $http, cmsNews) {
    $scope.posts = [];
    var news = cmsNews.get({path: $scope.path}, function(data) {
      if (data.posts && data.posts.length) {
        for (var i = 0; i < data.posts.length; i++) {
          var post = data.posts[i].post;
          if (post.created) {
            var date = new Date(post.created * 1000);
            post.createdFormatted = date.getDay() + '-' + date.getMonth() + '-' + date.getYear() + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds;
          }
          $scope.posts.push(data.posts[i].post);
        }
      }
    });
  }])

  .controller('ToutCtrl', ['$scope', '$http', 'cmsSiteSettings', 'cmsTout', '$element', function($scope, $http, cmsSiteSettings, cmsTout, $element) {
    $scope.tout = {};
    var siteSettings = cmsSiteSettings.get({}, function (settings) {
      var tout = $element.attr('data-tout');
      if (settings.variables && settings.variables.touts && settings.variables.touts[tout]) {
        var tout = cmsTout.get({id: settings.variables.touts[tout]}, function(data) {
          if (data.touts && data.touts[0] && data.touts[0].tout) {
            $scope.tout = data.touts[0].tout;
          }
        });
      }
    });
  }])

  .controller('404Ctrl', ['$scope', function($scope) {
  }])

;