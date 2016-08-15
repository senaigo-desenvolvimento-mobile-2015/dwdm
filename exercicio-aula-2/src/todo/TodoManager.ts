import {Todo} from "./Todo";
/**
 * @Manager gerencia o acesso aos dados.
 */
export class TodoManager{  
  /**
   * Adiciona um todo a lista
   */
  public add(todo:Todo) : Todo{
    if(!todo.id){
        todo.id = Math.floor((Math.random() * 10000) + 1);
    }  
    localStorage.setItem(`${todo.id}`, `{"description":"${todo.description}", "completed":"${todo.completed}"}`);
    return todo;
  }
  /**
   * Remove um todo da lista
   */
  public remove(todo:Todo){
    localStorage.removeItem(`${todo.id}`);
  }
  /**
   * Recupera todos os todos adicionados na lista
   */
  public listAll() : Object{
     var values = {};
     var keys = Object.keys(localStorage);
     var i = keys.length;
     while (i--) {
         values[localStorage.key(i)] = localStorage.getItem(keys[i]);        
     }    
     return values;
  }
  /**
   * Marcar um item adicionado como completado
   */
  public setAsCompleted(todo:Todo){      
      let old = jQuery.parseJSON(localStorage.getItem(`${todo.id}`));
      (old.completed === "true") ? todo.completed = false : todo.completed = true;
      todo.description = old.description;
      this.add(todo);
  }
  /**
   * Listar itens ativos, não completados
   */
  public listActive(){

  }
  /**
   * Listar itens completados
   */
  public listComplete(){

  }
  /**
   * Apagar itens completados
   */
  public clearCompleted(){

  }
}
