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
  private contador : JQuery;
  private buttomBar : JQuery;
  private bttodos :JQuery;  
  private btativos :JQuery;  
  private btcompletos :JQuery;  
  private btapagartodos :JQuery;  
  private _ENTER : number = 13;
  private _ESCAPE : number = 27;
  /*
   * Construtor
   */
  constructor(seletor:string){
    this._element = $(seletor);
    this.txtTodo = this._element.find(".input-group input");
    this.todoList = this._element.find(".list-group");
    this.body = this._element.find("body");
    this.buttomBar = $("#button-bar");
    this.contador = $("#contador");    
    this.bttodos = $("#bttodos");            
    this.btativos = $("#btativos");            
    this.btcompletos = $("#btcompletos");            
    this.btapagartodos = $("#btapagartodos");            
    /*
     * Lista todos os itens na inicialização do body
     */
    this.body.ready(()=>{
      this.listAll("todos");      
    });
    /*
     * Campo para cadastro.
     * Para cadastrar o usuário deve clicar Enter ou Esc
     */
    this.txtTodo.focus().on("keyup", e => {
      if(e.key==="Enter" || e.keyCode === this._ENTER || e.key === "Escape" || e.keyCode === this._ESCAPE){
        const text = this.txtTodo.val();
        this.add(text, (t) => {
          this.createNewLi(t.id, t.description, t.completed, "single");
          this.getItemsNotChecked();
        });
      }
    });   
  }
  /**
   * Controla a adição de um item para a lista
   */
  private add(text:string, callback:(a?) => any){
    if(!text){
      alert("A descrição no pode ser vazia");
      return;
    }
    const todo = new Todo();
    const manager = new TodoManager();
    todo.description = text;
    todo.completed = false;
    const newTodoAdded = manager.add(todo);
    this.txtTodo.val("");
    this.getItemsNotChecked();
    !callback || callback(newTodoAdded);
  }
  /**
   * Controla a remoção de um item acidionado a lista
   */
  public remove(id:number){
    const todo = new Todo();
    const manager = new TodoManager();
    todo.id = id;
    manager.remove(todo);
    const elementId = `#${id}`; 
    $(elementId).fadeOut("slow", null, () => {
        $(elementId).remove();
        this.getItemsNotChecked();        
    });
  }
  /**
   * Controla a marcação de um item adicionado a lista como completado
   * @todo
   */
  private setAsCompleted(id:number, checkbox:any){
    const todo = new Todo();
    const manager = new TodoManager();
    todo.id = id;
    manager.setAsCompleted(todo); 
    $(checkbox).change((a) => {
        ((a.target).checked) ? this.setStyleAsComplete(id) : this.setStyleAsNotComplete(id);
        this.getItemsNotChecked();
    });
  }
  /**
   * Define o estilo do todo como completo
   */
  private setStyleAsComplete(id:number){
    $(`#${id}`).addClass("list-group-item-success").find("label").addClass("finish");
  }
  /**
   * Define o estilo do todo como Não completo
   */
  private setStyleAsNotComplete(id:number){
      $(`#${id}`).removeClass("list-group-item-success").find("label").removeClass("finish");
  }
  /**
   * Controla a listagem de todos os itens
   */
  private listAll(status:string){
    const manager = new TodoManager();
    let dados;    
    switch (status) {        
        case "ativos":
            dados = manager.listActive();
            this.bttodos.removeClass();
            this.btcompletos.removeClass();
            this.btativos.addClass("active");
            break;
        case "completos":            
            dados = manager.listComplete();
            this.bttodos.removeClass();
            this.btativos.removeClass();
            this.btcompletos.addClass("active");
            break;    
        default:
            dados = manager.listAll();
            this.btativos.removeClass();
            this.btcompletos.removeClass();
            this.bttodos.addClass("active");
            break;
    }
    if(Object.keys(dados).length >= 1){                
        let obj : any;    
        for(let key in dados){
            obj = $.parseJSON(dados[key]);
            this.createNewLi(key, obj.description, obj.completed);
        }
        this.getItemsNotChecked();
    }else{        
        this.todoList.find(".list-group-item").remove();
        if(status !== "completos" && status !== "ativos"){
            this.buttomBar.addClass("hidden"); 
        }  
    }
  }    
  /**
   * Cria a listagem para o html
   */
  private createNewLi(id:any, description:string, completed:string, type?:string){
    type || this.todoList.children().remove();
    $(document).ready(()=>{    
        let checked = "";
        let isdone = "";
        let ischeck = "";
        if(completed === "true"){
            checked = "checked";
            isdone = "list-group-item-success";
            ischeck = "finish";
        }  
        const newLine = `
        <li class="list-group-item clearfix ${isdone}" id="${id}">
                <div class="checkbox pull-left">
                <label class="todo-desc ${ischeck}"><input type="checkbox" onclick="todoManager.setAsCompleted(${id}, this)" ${checked}>&nbsp;&nbsp;${description}</label>
                </div>
                <div class="button pull-right">
                <button type="button" class="btn btn-danger btn-sm" data-toggle="tooltip" onclick="todoManager.remove(${id})" title="Remover item da lista" data-placement="left" >
                    <span class="glyphicon glyphicon-trash" aria-hidden="true"></span>
                </button>
                </div>
        </li>`;      
        this.todoList.prepend(newLine).children(':first').hide().fadeIn("slow");
     });         
  }
  /**
   * Retorna a quantidade de itens a fazer
   */
  private getItemsNotChecked(){      
      $(document).ready(()=>{
        const count = $("[type='checkbox']:not(:checked)").length;
        this.contador.text(`${count} item(s) restante`);

        const countCompleted = $("[type='checkbox']:checked").length;
        countCompleted > 0 ? this.btapagartodos.removeClass("hidden") : this.btapagartodos.addClass("hidden");
      });
      this.coutItems();
  }
  /**
   * 
   */
  private coutItems(){
      $(document).ready(()=>{
        const count = $("[type='checkbox']").length;
        count > 0 ? this.buttomBar.removeClass("hidden") : this.buttomBar.addClass("hidden");        
      });       
  }
  /**
   * Controla a exclusão dos itens completados
   */
  private clearCompleted(){
    const manager = new TodoManager();      
    manager.clearCompleted();

    this.listAll("todos");
  }

}


