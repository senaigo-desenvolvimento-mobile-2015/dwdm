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

requirejs(['app', 'jquery', 'jquery.bootstrap'], (app, $) =>{
    todoManager = new app.TodoManagerComponent("#todo");
    try {
        $('body').tooltip({
            selector: '[data-toggle="tooltip"]',
            placement : 'bottom'
        });
    } catch (error) {
        console.log(error)      
    }
}, (err) => {
  console.log(err)
});
