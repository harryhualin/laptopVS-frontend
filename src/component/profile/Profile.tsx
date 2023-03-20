import {useDispatch, useSelector} from "react-redux";
import {LaptopCard} from "../cards/LaptopCard";
import {useState, DragEvent, useEffect, SyntheticEvent} from "react";
import {Modal} from '@mui/material';
import {ProductModel} from "../../models/ProductModel";
import CompareItemCard from "../cards/CompareItemCard";
import {reduxState} from "../../reducer/root.reducer";
import {SavedProductModel} from "../../models/SavedProduct";
import {deleteSavedProduct, getSavedProducts} from "../../actions/profile.action";
import {useParams} from "react-router-dom";
import DeleteIcon from '@mui/icons-material/Delete';
import Button from "@mui/material/Button";
import Alert from '@mui/material/Alert';
import { AlertTitle } from '@mui/material';
import {AppConstants} from "../../constant/AppConstants";

export const Profile=()=>{
    const {savedProducts,user}=useSelector((state:reduxState)=>state);
    const [open, setOpen] = useState(false);
    const [item1,setItem1]= useState<ProductModel|null>(null);
    const [item2,setItem2]= useState<ProductModel|null>(null);
    const [error,setError]=useState({open:false, message:''});
    const dispatch=useDispatch();
    useEffect(()=>{
        dispatch(getSavedProducts(user?user.id!:0));
        return ()=>{
            dispatch({
                type:AppConstants.RESET_SAVED_PRODUCTS,
                payload:null
            });
        }
    },[user]);

    const handleOpen = (event:SyntheticEvent) => {
        event.preventDefault();
        if(item1&&item2) setOpen(true);
        else setError({open:true,message:'pick two different product please!'});

    }
    const handleClose = () => {
        setOpen(false);}

    const dropItem1Handler=(event:DragEvent)=>{
        const id=event.dataTransfer.getData('text');
        if(item2&&id===item2.id.toString()) {
            setError({open:true,message:'You must compare two different product'});
            return null;}
        const savedProduct= savedProducts.find((product:SavedProductModel)=>{return product.product.id===+id});
        const item1=savedProduct!.product;
        setItem1(item1);
    }

    const dropItem2Handler=(event:DragEvent)=>{
        const id=event.dataTransfer.getData('text');
        if(item1&&id===item1.id.toString()) {
            setError({open:true,message:'You must compare two different product'});
            return null;}
        const savedProduct= savedProducts.find((product:SavedProductModel)=>{return product.product.id===+id});
        const item2=savedProduct!.product;
        setItem2(item2);
    }

    const dragOverHandler=(event:DragEvent)=>{
        event.preventDefault();
    }

    const deleteClickHandler=(event:SyntheticEvent)=>{
        event.preventDefault();
        event.stopPropagation();
        dispatch(deleteSavedProduct(Number((event.currentTarget as HTMLDivElement).id)));
    }

    return (
        <>
            <Modal
                id={'comparing-modal'}
                open={open}
                onClose={handleClose}
            >
                <div className={'center-modal'} style={{display:'flex',justifyContent:'center'}}>
                   <CompareItemCard firstProduct={item1} secondProduct={item2}></CompareItemCard>
                </div>
            </Modal>

            <Modal
                id={'error-modal'}
                open={error.open}
                onClose={()=>{
                    setError({...error,open:false,message:''})}}
            >
                <div className={'errModal'} >
                    <Alert severity="error" style={{marginTop:'10%'}}>
                        <AlertTitle>Error</AlertTitle>
                        <strong>{error.message}</strong>
                    </Alert>
                    <Button variant="outlined"
                            onClick={()=>{setError({...error,open:false,message:''})}}
                            style={{marginLeft:'60%'}}
                    >Confirmed</Button>
                </div>
            </Modal>


            <div>
            <div className={'center-content'} style={{position:'sticky',top:'0',height:'150px',width:'100%'}}>
                <div id={'compareItem1'} className={'drop-region'} onDrop={dropItem1Handler} onDragOver={dragOverHandler}>
                    {item1 ? <div style={{height:'100%',width:'100%',display:'flex'}}>
                            <img height={'80%'} src={item1.image} alt={item1.name}/>
                            <h3>{item1.name}</h3>
                            </div>
                        : <><h3>Drag First Item In Here</h3><h1>+</h1></>
                    }
                </div>
                <button className={'btn btn-success'} onClick={handleOpen}>compare</button>
                <div id={'compareItem2'} className={'drop-region'} onDrop={dropItem2Handler} onDragOver={dragOverHandler}>
                    {item2 ? <div style={{height:'100%',width:'100%',display:'flex'}}>
                            <img height={'80%'} src={item2.image} alt={item2.name}/>
                            <h3>{item2.name}</h3>
                        </div>
                        : <><h3>Drag Second Item In Here</h3><h1>+</h1></>
                    }
                </div>
            </div>

            {/*<div style={{width:'100%',height:'50px',overflowY:"auto"}}>*/}
            {/*    <div id='sorted-bar'>*/}
            {/*        {'Sorted by     '}*/}
            {/*        <select>*/}
            {/*            <option>price</option>*/}
            {/*        </select>*/}
            {/*    </div>*/}
            {/*</div>*/}

            <div style={{display:'flex'}}>

                <div id={'main-container'} style={{width:'100%',display:'flex',flexWrap: 'wrap'}}>
                    {
                        savedProducts? savedProducts.map((product:SavedProductModel,i:number)=> {
                            return(<div style={{width: '25%'}} key={i}>
                                <div className={"DeleteDiv"} id={product.id!.toString()} onClick={deleteClickHandler} style={{width:'100%',display:"flex",justifyContent:'end'}}>
                                    <DeleteIcon fontSize={"large"} style={{position: "absolute"}}/>
                                </div>
                                    <LaptopCard product={product.product}></LaptopCard>
                                </div>)
                            })
                            :<>loading</>
                    }
                </div>
            </div>
        </div>

        </>
    )
}