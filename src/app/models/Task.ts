export class Task{
    id: number;
    description: string;
    date: string;
    status: boolean;
  
    constructor(description: string, date: string, status: boolean, id: number = 0){
      this.id = id
      this.description = description
      this.date = date
      this.status = status
    }

  
  }