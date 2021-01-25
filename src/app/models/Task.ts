export class Task{
    _id: string;
    Description: string;
    Date: Date;
    Status: boolean;
  
    constructor(description: string, date: Date, status: boolean, id: string = ''){
      this._id = id
      this.Description = description
      this.Date = date
      this.Status = status
    }

  
  }