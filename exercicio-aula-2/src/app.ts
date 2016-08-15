import {Todo} from "todo/Todo";
import {TodoManager} from "todo/TodoManager";
/**
 * Controlador principal
 */
export class TodoManagerComponent{

  private _element : JQuery;
  private body : JQuery;
  private txtTodo : JQuery;  
  private todoList : JQuery;  
  private _ENTER : number = 13;
  private _ESCAPE : number = 27;
  /*
   * Inicialização
   */
  constructor(seletor:string, private todo = new Todo(), private manager = new TodoManager()){
    this._element = $(seletor);
    this.txtTodo = this._element.find(".input-group input");        
    this.todoList = this._element.find(".list-group");
    this.body = this._element.find("body");    
    /*
     * Lista todos os itens na inicialização do body
     */
    this.body.ready(()=>{
      this.listAll();
    });
    /*
     * Campo para cadastro.
     * Para cadastrar o usuário deve clicar Enter ou Esc
     */
    this.txtTodo.focus().on("keyup", e => {
      if(e.key==="Enter" || e.keyCode === this._ENTER || e.key === "Escape" || e.keyCode === this._ESCAPE){
        const text = this.txtTodo.val();
        this.add(text, (t) => {
          this.createNewLi(t.id, t.description, t.completed);
        });
      }
    });   
  }
  /**
   * Controla a adição de um item para a lista
   */
  private add(text:string, callback:(a?) => any){
    if(!text){
      console.log("Erro", "A descrição no pode ser vazia");
      return;
    }
    this.todo.description = text;
    this.todo.completed = false;
    const newTodoAdded = this.manager.add(this.todo);
    this.txtTodo.val("");
    !callback || callback(newTodoAdded);
  }
  /**
   * Controla a remoção de um item acidionado a lista
   */
  public remove(id:number){
    this.todo.id = id;
    this.manager.remove(this.todo);
    $(`#${id}`).fadeOut("slow", () => {
        $(this).remove();
    });
  }
  /**
   * Controla a marcação de um item adicionado a lista como completado
   * @todo
   */
  private setAsCompleted(id:number, checkbox:any){
    //   console.log(checkbox);
    //   console.log($(checkbox));

      if($(checkbox).val() === "on"){
        $(`#${id}`).addClass("list-group-item-success").find("label").addClass("finish");
      }else{
          $(`#${id}`).removeClass("list-group-item-success").find("label").removeClass("finish");
      }

      this.todo.id = id;
      this.manager.setAsCompleted(this.todo);      
  }
  /**
   * Controla a listagem de todos os itens
   */
  private listAll(){
    const dados = this.manager.listAll();
    console.log(dados);
    
    let obj : any;
    for(let key in dados){
        obj = $.parseJSON(dados[key]);        
        this.createNewLi(key, obj.description, obj.completed);
    }
  }
  /**
   * Cria a listagem para o html
   */
  private createNewLi(id:string, description:string, completed:string){            
    let checked = (completed === "true") ? "checked" : "";       
    const newLine = `
      <li class="list-group-item clearfix" id="${id}">
            <div class="checkbox pull-left">
              <label class="todo-desc"><input type="checkbox" onclick="todoManager.setAsCompleted(${id}, this)" ${checked}>&nbsp;&nbsp;${description}</label>
            </div>
            <div class="button pull-right">
              <button type="button" class="btn btn-danger btn-sm" data-toggle="tooltip" onclick="todoManager.remove(${id})" title="Remover item da lista" data-placement="left" >
                <span class="glyphicon glyphicon-trash" aria-hidden="true"></span>
              </button>
            </div>
      </li>`;      
     this.todoList.append(newLine).children(':last').hide().fadeIn("slow");         
  }
  /**
   * Controla a listagem dos itens ativos, marcados como não completados
   */
  private listActive(){

  }
  /**
   * Controla a listamge dos itens marcados como completados
   */
  private listComplete(){

  }
  /**
   * Controla a exclusão dos itens completados
   */
  private clearCompleted(){

  }

}


