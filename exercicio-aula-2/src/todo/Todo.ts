/**
 * @Entity
 */
export class Todo{

  private _id:number;
  private _description:string;
  private _completed:boolean;

  get id() : number{
    return this._id;
  }

  set id(newId:number){
    this._id = newId;
  }

  get description() : string{
    return this._description;
  }

  set description(newDescription:string){
    this._description = newDescription;
  }

  set completed(newCompleted:boolean){
    this._completed = newCompleted;
  }

  get completed() : boolean{
    return this._completed;
  }


}
