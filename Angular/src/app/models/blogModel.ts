import { CommentModel } from "./commentModel";

export interface BlogModel{
    id:number,
    title:string,
    titlePhoto:string,
    mainDescription:string,
    contentOfPost:string,
    categoryId:number,
    addedAt:string,
    comments:CommentModel[]
}