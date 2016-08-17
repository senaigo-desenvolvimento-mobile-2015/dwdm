define(["require","exports","todo/Todo","todo/TodoManager"],function(a,b,c,d){"use strict";var e=function(){function a(a){var b=this;this._ENTER=13,this._ESCAPE=27,this._element=$(a),this.txtTodo=this._element.find(".input-group input"),this.todoList=this._element.find(".list-group"),this.body=this._element.find("body"),this.buttomBar=$("#button-bar"),this.contador=$("#contador"),this.bttodos=$("#bttodos"),this.btativos=$("#btativos"),this.btcompletos=$("#btcompletos"),this.btapagartodos=$("#btapagartodos"),this.body.ready(function(){b.listAll("todos")}),this.txtTodo.focus().on("keyup",function(a){if("Enter"===a.key||a.keyCode===b._ENTER||"Escape"===a.key||a.keyCode===b._ESCAPE){var c=b.txtTodo.val();b.add(c,function(a){b.createNewLi(a.id,a.description,a.completed,"single"),b.getItemsNotChecked()})}})}return a.prototype.add=function(a,b){if(!a)return void alert("A descrição no pode ser vazia");var e=new c.Todo,f=new d.TodoManager;e.description=a,e.completed=!1;var g=f.add(e);this.txtTodo.val(""),this.getItemsNotChecked(),!b||b(g)},a.prototype.remove=function(a){var b=this,e=new c.Todo,f=new d.TodoManager;e.id=a,f.remove(e);var g="#"+a;$(g).fadeOut("slow",null,function(){$(g).remove(),b.getItemsNotChecked()})},a.prototype.setAsCompleted=function(a,b){var e=this,f=new c.Todo,g=new d.TodoManager;f.id=a,g.setAsCompleted(f),$(b).change(function(b){b.target.checked?e.setStyleAsComplete(a):e.setStyleAsNotComplete(a),e.getItemsNotChecked()})},a.prototype.setStyleAsComplete=function(a){$("#"+a).addClass("list-group-item-success").find("label").addClass("finish")},a.prototype.setStyleAsNotComplete=function(a){$("#"+a).removeClass("list-group-item-success").find("label").removeClass("finish")},a.prototype.listAll=function(a){var b,c=new d.TodoManager;switch(a){case"ativos":b=c.listActive(),this.bttodos.removeClass(),this.btcompletos.removeClass(),this.btativos.addClass("active");break;case"completos":b=c.listComplete(),this.bttodos.removeClass(),this.btativos.removeClass(),this.btcompletos.addClass("active");break;default:b=c.listAll(),this.btativos.removeClass(),this.btcompletos.removeClass(),this.bttodos.addClass("active")}if(Object.keys(b).length>=1){var e=void 0;for(var f in b)e=$.parseJSON(b[f]),this.createNewLi(f,e.description,e.completed);this.getItemsNotChecked()}else this.todoList.find(".list-group-item").remove(),"completos"!==a&&"ativos"!==a&&this.buttomBar.addClass("hidden")},a.prototype.createNewLi=function(a,b,c,d){var e=this;d||this.todoList.children().remove(),$(document).ready(function(){var d="",f="",g="";"true"===c&&(d="checked",f="list-group-item-success",g="finish");var h='\n        <li class="list-group-item clearfix '+f+'" id="'+a+'">\n                <div class="checkbox pull-left">\n                <label class="todo-desc '+g+'"><input type="checkbox" onclick="todoManager.setAsCompleted('+a+', this)" '+d+">&nbsp;&nbsp;"+b+'</label>\n                </div>\n                <div class="button pull-right">\n                <button type="button" class="btn btn-danger btn-sm" data-toggle="tooltip" onclick="todoManager.remove('+a+')" title="Remover item da lista" data-placement="left" >\n                    <span class="glyphicon glyphicon-trash" aria-hidden="true"></span>\n                </button>\n                </div>\n        </li>';e.todoList.prepend(h).children(":first").hide().fadeIn("slow")})},a.prototype.getItemsNotChecked=function(){var a=this;$(document).ready(function(){var b=$("[type='checkbox']:not(:checked)").length;a.contador.text(b+" item(s) restante");var c=$("[type='checkbox']:checked").length;c>0?a.btapagartodos.removeClass("hidden"):a.btapagartodos.addClass("hidden")}),this.coutItems()},a.prototype.coutItems=function(){var a=this;$(document).ready(function(){var b=$("[type='checkbox']").length;b>0?a.buttomBar.removeClass("hidden"):a.buttomBar.addClass("hidden")})},a.prototype.clearCompleted=function(){var a=new d.TodoManager;a.clearCompleted(),this.listAll("todos")},a}();b.TodoManagerComponent=e});