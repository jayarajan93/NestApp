import { Injectable } from '@nestjs/common';
import {notes} from './notes.dto';
import * as fs from 'fs';
import { json } from 'express';
@Injectable()
export class AppService 
{

  async View(name: string,res): Promise<string> 
  {
    let newrecord:string=""
    const data=fs.readFileSync("./src/notes.json")
    let jsData=JSON.parse(data.toString())
    jsData.records.forEach(record => {
      if(record.name==name)
      {
        newrecord=record.notes
      }
      else
      {
        newrecord="record not found"
      }
    });
    return await res.send(newrecord)
  }

  
 async Delete(name: string,res): Promise<string>
 {
   const data=fs.readFileSync("./src/notes.json")
   let jsData=JSON.parse(data.toString())
   let flag:boolean=jsData.records.some(record=>record.name===name)
    if(flag)
    {
      let newrecords=jsData.records.filter(record=>record.name!==name)
      jsData.records=newrecords
      let filedata=JSON.stringify(jsData)
      fs.writeFileSync('./src/notes.json',filedata)
      return await res.send(`${name} notes is deleted`)
    }
    else
    {
      return await res.send("record not found")
    }
  }
  async Update(updnote:notes,res): Promise<string>
  {
   const data=fs.readFileSync('./src/notes.json')
   let jsData=JSON.parse(data.toString())
   let flag:boolean=jsData.records.some(record=>record.name==updnote.name)
   if(flag)
   {
     jsData.records.forEach(record => {
      if(record.name==updnote.name)
      {
        record.name=updnote.name?updnote.name:record.name;
        record.notes=updnote.notes?updnote.notes:record.notes;
        let fileData=JSON.stringify(jsData)
        fs.writeFileSync('./src/notes.json',fileData)
        
      }       
     });
     return await res.send(`${updnote.notes}`)
    }
   else
   {
   return await res.send(`${updnote.name} not found`)
   }
  }
  async Create(newnote:notes,res):Promise<string>
  {
    let flag: number=0;
    const data = fs.readFileSync('./src/notes.json')
    let jsData =JSON.parse(data.toString());
    jsData.records.forEach(record=>{
    
        if(record.name==newnote.name)
        {
          flag=1
        }
        
      })
        if(flag==1)
        {
         return await res.send(`${newnote.name}`)
        }
        if (flag!=1)
        {
        jsData.records.push({"name":newnote.name,"notes":newnote.notes})
        let fileData: string=JSON.stringify (jsData)
        fs.writeFileSync('./src/notes.json',fileData)
        return await res.send(`${newnote.name}`)
        } 
    
  }
}
  


