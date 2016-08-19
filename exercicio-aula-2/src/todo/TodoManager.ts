import {Todo} from "./Todo";
/**
 * @Manager gerencia o acesso aos dados.
 */
export class TodoManager {
  /**
   * Adiciona um todo a lista
   */
  public add(todo: Todo): Todo {
    try {
      if (!todo.id) {
        todo.id = Math.floor((Math.random() * 10000) + 1);
      }
      localStorage.setItem(`${todo.id}`, `{"description":"${todo.description}", "completed":"${todo.completed}"}`);
      return todo;
    } catch (error) {
      alert(error);
    }
  }
  /**
   * Remove um todo da lista
   */
  public remove(todo: Todo) {
    try {
      localStorage.removeItem(`${todo.id}`);
    } catch (error) {
      alert(error)
    }
  }
  /**
   * Recupera todos os todos adicionados na lista
   */
  public listAll(): Object {
    try {
      return localStorage;
    } catch (error) {
      alert(error);
    }
  }
  /**
   * Marcar um item adicionado como completado
   */
  public setAsCompleted(todo: Todo) {
    try {
      let old = jQuery.parseJSON(localStorage.getItem(`${todo.id}`));
      (old.completed === "true") ? todo.completed = false : todo.completed = true;
      todo.description = old.description;
      this.add(todo);
    } catch (error) {

    }
  }
  /**
   * Listar itens ativos, não completados
   */
  public listActive() {
    const valuesNew = {};
    $.map(localStorage, (value: any, index: any) => {
      if (jQuery.parseJSON(value).completed === "false") {
        valuesNew[index] = value;
      }
    });
    return valuesNew;
  }
  /**
   * Listar itens completados
   */
  public listComplete(): Object {
    const valuesNew = {};
    $.map(localStorage, (value: any, index: any) => {
      if (jQuery.parseJSON(value).completed === "true") {
        valuesNew[index] = value;
      }
    });
    return valuesNew;
  }
  /**
   * Apagar itens completados
   */
  public clearCompleted() {
    try {
      const completed = this.listComplete();
      for (let key in completed) {
        localStorage.removeItem(`${key}`);
      }
    } catch (error) {
      alert(error);
    }
  }
}
