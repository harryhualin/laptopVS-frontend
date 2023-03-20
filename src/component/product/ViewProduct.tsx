import {CommentCard} from "../cards/CommentCard";
import {AppConstants} from "../../constant/AppConstants";

import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import {useDispatch, useSelector} from "react-redux";
import {reduxState} from "../../reducer/root.reducer";
import {SyntheticEvent, useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {Checkbox, Modal} from '@mui/material';
import {Favorite, FavoriteBorder, Timer} from "@mui/icons-material";
import {ProductModel} from "../../models/ProductModel";
import {Rating} from "react-simple-star-rating";
import {getProductById, getProductRate, getProducts, rateProduct} from "../../actions/product.action";
import {addComment, getCommentsByProductId} from "../../actions/comment.action";
import {CommentModel} from "../../models/CommentModel";
import {SavedProductModel} from "../../models/SavedProduct";
import {addSavedProduct, checkIfSaved, removeSavedProduct} from "../../actions/profile.action";
import {RateModel} from "../../models/RateModel";
import { IconButton } from '@mui/material';
import CommentIcon from '@mui/icons-material/Comment';
import * as React from "react";

export const ViewProduct=()=>{
    const {user,viewProduct,comments}=useSelector((state:reduxState)=>{return {user:state.user,viewProduct:state.viewProduct,comments:state.comments}});
    const {productId}=useParams();
    const dispatch=useDispatch();
    const [comment,setComment]=useState("Any Comment?");
    const [targetId,setTargetId]=useState(0);
    const [open,setOpen]=useState(false);

    // Catch Rating value
    const handleRating = (rate: number) => {
        if(user&&viewProduct) {
            const newRate: RateModel = {rate: rate, userId: user.id, productId: viewProduct.id};
            dispatch(rateProduct(newRate));
        }

    }
    useEffect(()=>{
        dispatch(getProductById(Number(productId),user?user.id:0));
        dispatch(getCommentsByProductId(Number(productId)));
        dispatch(getProductRate(Number(productId),user?user.id:0));
        // dispatch(checkIfSaved(Number(productId),user?user.id:0));
        return ()=>{

            dispatch({type:AppConstants.GET_PRODUCT_BY_ID,payload:null});
            dispatch({type:AppConstants.GET_COMMENTS,payload:null});
        };
    },[user]);



    const commentHandler = (event:SyntheticEvent) => {
        event.preventDefault();
        event.stopPropagation();
        if(user&&viewProduct)
        {
            const newComment:CommentModel= {
                comment_date: new Date(), content: comment, product: viewProduct, target_id: targetId, user: user
            };
            dispatch(addComment(newComment));
            setComment('');
            setTargetId(0);
            setOpen(false);
        }
    };

    const likeHandler=(event:SyntheticEvent)=>{
        event.preventDefault();
        if(user&&viewProduct)
        {   if(!viewProduct.isSaved)
            {
                const newSavedProduct:SavedProductModel={product: viewProduct, userId: user.id!};
                dispatch(addSavedProduct(newSavedProduct));
                console.log("saved product id "+ productId);
            }
            else if(viewProduct.isSaved===true)
            {
                dispatch(removeSavedProduct(Number(productId),user.id!));
                console.log("unsaved product id "+ productId);
            }
            dispatch(checkIfSaved(Number(productId),user?user.id:0));
        }
    }

    return (
       <div> { viewProduct?
           <>
                <Modal
                     id={'comment-modal'}
                     open={open}
                     onClose={()=>{setOpen(false);setTargetId(0);setComment('');}}
                >
                <div className={'comment-modal'}>
                    <Typography variant={'h4'}> {targetId>0?`To ${comments.find((comment)=>{return comment.id===targetId;})!.username}:`:'To All:'}</Typography>
                    <TextField sx={{
                        width:'100%',
                        height:'50%',
                        marginTop:'0%'}}
                               multiline={true}
                               rows={5}
                               label="Comment"
                               autoComplete="off"
                               value={comment}
                               onFocus={()=>{setComment('')}}
                               onChange={(e)=>{if(e.target.value.length<=200) setComment(e.target.value); } } >
                    </TextField>
                    <Button disabled={user?false:true}
                            onClick={commentHandler}
                            variant="outlined"
                            >
                        submit
                    </Button>
                    <Button disabled={user?false:true}
                            onClick={()=>{setOpen(false);setComment('');setTargetId(0);}}
                            variant="outlined"
                    >
                        Cancel
                    </Button>

                </div>
                </Modal>
                <div id={'product-detail'} style={{display:'flex',justifyContent:'space-between'}}>
                <div>
                    <ul>
                        {
                            AppConstants.PRODUCT_CONFIG_FIELDS.map((field,index:number)=>
                                <li key={index}>{field.id+': '+viewProduct[field.id as keyof ProductModel]}</li>
                            )
                        }
                        <li>price: <span className="text-danger" style={{fontSize:'200%'}}><strong>{viewProduct.price}</strong></span></li>
                        <li>buying link: <a href={viewProduct.source}>{viewProduct.source}</a></li>
                    </ul>
                    <div style={{paddingLeft:'10%'}}>
                    <Checkbox checked={viewProduct.isSaved?viewProduct.isSaved:false} disabled={user?false:true} icon={<FavoriteBorder/>} checkedIcon={<Favorite />} onClick={likeHandler}/>
                    <Rating
                        readonly={user?false:true}
                        onClick={handleRating}
                        initialValue={viewProduct.rate?viewProduct.rate.rate:5}
                    />
                        <Typography variant="caption" >
                            {(viewProduct.rate&&user&&viewProduct.rate.userId===user.id)?"rated":''}
                        </Typography>

                        <Typography variant={'h4'}>{"views: "+viewProduct.views}</Typography>
                    </div>

                </div>


                <div className={'center-content'} style={{width:'40%',paddingTop:'2%'}}>
                <img  src={viewProduct.image} alt={viewProduct.name} style={{maxWidth:'80%',maxHeight:"90%"}}></img>
                </div>
            </div>
            <div id={'comment-wrapper'}>
                <div id="comment_banner" style={{paddingLeft:'10%',borderTop:'1px solid black',display:'flex',alignItems:'center',backgroundColor:'lightcyan'}}>
                    <Typography component="h1" variant="h4"  color='red'>Comments</Typography>
                    <IconButton disabled={user?false:true} onClick={(e)=>{e.preventDefault();setOpen(true);}}>

                        <CommentIcon fontSize={'large'}></CommentIcon>
                    </IconButton>

                </div>
                <div id={'comment-list'} style={{margin:'0 10% 0 10%'}}>
                    {
                        comments.map((comment,index)=>
                            <CommentCard
                            key={index}
                            commentInfo={comment}
                            replyFunction={(commentId:number)=>{
                                setTargetId(commentId);
                                setOpen(true);}}/>)
                    }
                </div>
            </div></>:<div>NOT FOUNDING</div>
        }
       </div>
    )
}