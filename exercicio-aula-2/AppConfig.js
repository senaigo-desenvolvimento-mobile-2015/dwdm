var curLocation = (window.location.hostname === "localhost") ? "/" : "/dwdm/"; 
requirejs.config({
    baseUrl: curLocation,
    paths: {
        "app" : 'app/app',
        "jquery" : 'lib/jquery/dist/jquery.min',
        "jquery.bootstrap" : 'lib/bootstrap/dist/js/bootstrap.min',
        "todo" : 'app/todo',
        "manager" : 'app/todoManager'
    },
    shim:{
        "jquery.bootstrap" : ["jquery"]        
    }
});

requirejs(['app', 'jquery', 'jquery.bootstrap'], function(app, $){
    (window.location.hostname === "localhost") ? $("base").val("/") : $("base").val("/tree/gh-pages");
    todoManager = new app.TodoManagerComponent("#todo");
    try {
        $('body').tooltip({
            selector: '[data-toggle="tooltip"]',
            placement : 'bottom'
        });    
    } catch (error) {
        console.log(error)      
    }
}, function(err){
  console.log(err)
});
