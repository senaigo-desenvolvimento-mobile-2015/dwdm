import {Todo} from "todo/Todo";
import {TodoManager} from "todo/TodoManager";
/**
 * Controlador principal
 */
export class TodoManagerComponent{

  private _element : JQuery;
  private body : JQuery;
  private txtTodo : JQuery;
  // private btRemove : JQuery;
  private todoList : JQuery;
  private _ENTER : number = 13;
  private _ESCAPE : number = 27;
  /*
   * Inicialização
   */
  constructor(seletor:string, private todo = new Todo(), private manager = new TodoManager()){
    this._element = $(seletor);
    this.txtTodo = this._element.find(".input-group input");
    // this.btRemove = this._element.find(".list-group-item button");
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
        this.add(text, (a) => {
          this.createNewLi(a.description, a.completed);
        });
      }
    });
    /*
     * Remove um item
     */
    // this.btRemove.on("click", () => {
    //   this.remove();
    // });
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
  private remove(){
    console.log(localStorage);
  }
  /**
   * Controla a marcação de um item adicionado a lista como completado
   */
  private setAsCompleted(){

  }
  /**
   * Controla a listagem de todos os itens
   */
  private listAll(){
    const dados = this.manager.listAll();
    for(let key in dados){
      this.createNewLi(key,"");
    }
  }
  private createNewLi(key:string, status:string){
    const newLine = `
      <li class="list-group-item clearfix" id="${key}">
            <div class="checkbox pull-left">
              <label><input type="checkbox">${key}</label>
            </div>
            <div class="button pull-right">
              <button type="button" class="btn btn-danger btn-sm" data-toggle="tooltip" title="Remover item da lista" data-placement="left" >
                <span class="glyphicon glyphicon-trash" aria-hidden="true"></span>
              </button>
            </div>
      </li>
    `;
    // console.log(newLine);
    this.todoList.append(newLine);
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


