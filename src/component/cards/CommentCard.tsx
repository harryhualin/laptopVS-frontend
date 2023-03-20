import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import { IconButton } from '@mui/material';
import {CommentModel} from "../../models/CommentModel";
import {SyntheticEvent} from "react";
import {reduxState} from "../../reducer/root.reducer";
import {useSelector} from "react-redux";
import AddCommentIcon from '@mui/icons-material/AddComment';

export const CommentCard=(props:{commentInfo:CommentModel,replyFunction:(id:number)=>void})=>{
    const {comments,user}=useSelector((state:reduxState)=>state);
    const commentInfo=props.commentInfo;

    const replyClickHandler=(event:SyntheticEvent)=>{
        event.preventDefault();
        props.replyFunction(commentInfo.id?commentInfo.id:0);
    }
    return(
        <Box id={"commentCard"+commentInfo.id} sx={{margin:'2% 0% 0 0%', height:'200px',width:'100%',borderBottom:'1px solid'}}>
            <Box id="commentCard_commenter"  display='flex'  sx={{height:100,width:'100%'}}>
                <Avatar style={{backgroundColor:"darkgrey",border:"1px solid",borderRadius:"50%"}}>
                    {commentInfo.username!.substring(0,2)}
                </Avatar>
                <Box id='commentCard_commenterDetail' sx={{height:'100%',width:'100%',paddingLeft:'5%'}}>
                    <Box id='commentCard_commenterDetail_authorName' sx={{width:'100%',height:'30%'}}>
                        <Typography variant="h6">
                            {commentInfo.username}
                        </Typography>
                    </Box>
                    <Box id='commentCard_commenterDetail_comment' sx={{width:'100%',height:'100%',backgroundColor:'lightgrey'}}>
                        <Typography variant="h5">

                            {commentInfo.target_id>0?
                               <>{'To '}
                                <a href={"#commentCard"+commentInfo.target_id}>
                                    {comments.find((comment)=>{return comment.id===commentInfo.target_id;})!.username}
                                </a>
                                 {": "}
                               </>
                                :""}

                            {commentInfo.content}
                        </Typography>
                    </Box>
                    <IconButton disabled={user?false:true} onClick={replyClickHandler}>
                    <AddCommentIcon/>
                    </IconButton>
                </Box>
            </Box>
        </Box>

    )
}