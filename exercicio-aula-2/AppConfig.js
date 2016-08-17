requirejs.config({
    baseUrl: '/',
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
    todoManager = new app.TodoManagerComponent("#todo");
    var curLocation = window.location.hostname;
    try {
        $('body').tooltip({
            selector: '[data-toggle="tooltip"]',
            placement : 'bottom'
        });
        if(curLocation === "localhost"){
            $("base").val("/");
        }else{
            $("base").val("/tree/gh-pages");
        }
    } catch (error) {
        console.log(error)      
    }
}, function(err){
  console.log(err)
});
