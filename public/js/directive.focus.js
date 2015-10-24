angular
    .module('cep.hack')
    .directive('focusOn', function ($timeout) {
        return {
            link: function(scope, element, attrs) {
                scope.$watch(attrs.focusOn, function(newValue){
                    if ( newValue ) {
                        $timeout(function(){
                            element.focus();
                        }, 10);
                    }
                });
            }
        };
    });