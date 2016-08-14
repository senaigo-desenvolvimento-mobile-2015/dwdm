import {Todo} from "./Todo";
/**
 * @Manager gerencia o acesso aos dados.
 */
export class TodoManager{
  private _todos: Todo[] = [];
  /**
   * Adiciona um todo a lista
   */
  public add(todo:Todo) : Todo{
    todo.id = Math.floor((Math.random() * 10000) + 1);
    localStorage.setItem(`${todo.id}`, `{${todo.description},${todo.completed}}`);
    return todo;
  }
  /**
   * Remove um todo da lista
   */
  public remove(todo:Todo){
    const index = this._todos.indexOf(todo);
		if (index >= 0) {
			this._todos.splice(index, 1);
		}
  }
  /**
   * Recupera todos os todos adicionados na lista
   */
  public listAll() : Object{
     var values = {};
     var keys = Object.keys(localStorage);
     var i = keys.length;
     while (i--) {
         values[localStorage.key(i)] = localStorage.getItem(keys[i])
     }
     return values;
  }
  /**
   * Marcar um item adicionado como completado
   */
  public setAsCompleted(){

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
