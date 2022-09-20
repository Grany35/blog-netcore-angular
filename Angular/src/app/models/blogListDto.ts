import { CommentModel } from "./commentModel";

export interface BlogListDto{
    id:number;
    title:string;
    titlePhoto:string;
    mainDescription:string;
    contentOfPost:string;
    categoryId:number;
    categoryName:string;
    addedAt:string;
    comments:CommentModel[];
}