import { Controller, Get, Put,Post,Delete,Body,Param,Res } from '@nestjs/common';
import {Response} from 'express'
import { AppService } from './app.service';
import {notes} from './notes.dto'
import * as note from './notes.json'

  // View  a Record
@Controller('view')
export class ViewController 
{
  constructor(private readonly appService: AppService) {}
  @Get(':name')
  View(@Param() param,@Res() res:Response) :Promise<string>
  {
    return this.appService.View(param.name,res);
  }
}

  // Create  a Record

@Controller('create')
export class CreateController
{
  constructor(private readonly appService: AppService) {}
  @Post()
Create(@Body() newnote:notes,@Res() res:Response):Promise<string> 
{
return this.appService.Create(newnote,res);
}
}

  //Delete a Record

@Controller('delete')
export class DeleteController
{
constructor (private readonly appService:AppService){}
@Delete(':name')
Delete(@Param() param, @Res() res:Response): Promise<string>
{
  return this.appService.Delete(param.name,res);
}
}
  //Update a Record
  
@Controller('update')
export class UpdateController
{
  constructor (private readonly appService:AppService){}
  @Put()
  Update(@Body() updnote:notes,@Res() res:Response): Promise<string>
  {
    return this.appService.Update(updnote,res);
  }

}