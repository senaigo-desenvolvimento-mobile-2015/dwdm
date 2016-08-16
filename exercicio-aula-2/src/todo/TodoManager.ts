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
            return error;
        }
    }
    /**
     * Remove um todo da lista
     */
    public remove(todo: Todo) {
        try {
            localStorage.removeItem(`${todo.id}`);            
        } catch (error) {
            
        }
    }
    /**
     * Recupera todos os todos adicionados na lista
     */
    public listAll() : Object {
        try {
            const values = {};
            const keys = Object.keys(localStorage);
            let i = keys.length;
            while (i--) {
                values[localStorage.key(i)] = localStorage.getItem(keys[i]);
            }
            return values;            
        } catch (error) {
            return error;
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
    public listActive() : Object {
        try {
            const values = {};
            const keys = Object.keys(localStorage);
            let i = keys.length;
            while (i--) {
                let ativo = jQuery.parseJSON(localStorage.getItem(keys[i]));                        
                if(ativo.completed === "false"){
                    values[localStorage.key(i)] = localStorage.getItem(keys[i]);
                }                        
            }
            return values;            
        } catch (error) {
            return error;
        }
    }
    /**
     * Listar itens completados
     */
    public listComplete() : Object {
        try {
            const values = {};
            const keys = Object.keys(localStorage);
            let i = keys.length;
            while (i--) {
                let ativo = jQuery.parseJSON(localStorage.getItem(keys[i]));                        
                if(ativo.completed === "true"){
                    values[localStorage.key(i)] = localStorage.getItem(keys[i]);
                }                        
            }
            return values;            
        } catch (error) {
            return error;
        }
    }
    /**
     * Apagar itens completados
     */
    public clearCompleted() {
        try {
            const completed = this.listComplete();
            for(let key in completed){
                localStorage.removeItem(`${key}`);            
            }             
        } catch (error) {
            console.log(error);            
        }
    }
}
