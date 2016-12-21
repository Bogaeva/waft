var app = angular.module("waft", []);

app.controller("bottleName", function($scope) {
    $scope.fontTypes = [{
      name: "Arial",
      family: "'Arial', sans-serif"
    }, {
      name: "Mirza",
      family: "'Mirza', cursive"
    }, {
      name: "Pacifico",
      family: "'Pacifico', cursive"
    }, {
      name: "Oswald",
      family: "'Oswald', sans-serif"
    }];
    $scope.fontType = "";
});
  
app.run(function($rootScope) {
  angular.element(document).on("click", function(e) {
    $rootScope.$broadcast("documentClicked", angular.element(e.target));
  });
});

app.directive("dropdown", function($rootScope) {
    return {
      restrict: "E",
      templateUrl: "dropdown.html",
      scope: {
        placeholder: "@",
        list: "=",
        selected: "=",
        property: "@"
      },
      link: function(scope) {
        scope.listVisible = false;
        scope.isPlaceholder = true;

        scope.select = function(item) {
          scope.isPlaceholder = false;
          scope.selected = item;
          if (scope.onChange !== undefined)
            scope.onChange(item);
        };

        scope.isSelected = function(item) {
          return item[scope.property] === scope.selected[scope.property];
        };
        
        scope.show = function() {
          scope.listVisible = !scope.listVisible;
        };

        $rootScope.$on("documentClicked", function(inner, target) {
          if (!$(target[0]).is(".dropdown-display.clicked") && !$(target[0]).parents(".dropdown-display.clicked").length > 0)
            scope.$apply(function() {
              scope.listVisible = false;
            });
        });

        scope.$watch("selected", function(value) {
          scope.isPlaceholder = scope.selected[scope.property] === undefined;
          scope.display = scope.selected[scope.property];
        });
      }
    }
});

app.directive('toggleClass', function() {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            element.bind('click', function() {
                element.parent().parent().toggleClass(attrs.toggleClass);
            });
        }
    };
});