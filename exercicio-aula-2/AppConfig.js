requirejs.config({
    baseUrl: '/',
    paths: {
        "app" : 'app/app',
        "jquery" : 'lib/jquery/dist/jquery.min',
        "jquery.bootstrap" : 'lib/bootstrap/dist/js/bootstrap.min',
        "todo" : 'app/todo',
        "manager" : 'app/todoManager'
    },shim:{
        "jquery.bootstrap" : {
            deeps : ["jquery"]
        }
    }
});

requirejs(['app', 'jquery', 'jquery.bootstrap'], (app, $) =>{
  $('[data-toggle="tooltip"]').tooltip();
  todoManager = new app.TodoManagerComponent("#todo");
}, (err) => {
  console.log(err)
});
