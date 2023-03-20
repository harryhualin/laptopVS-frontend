import {SyntheticEvent,DragEvent} from "react";
import {useNavigate} from "react-router-dom";
import {AppConstants} from "../../constant/AppConstants";
import {ProductModel} from "../../models/ProductModel";




export const LaptopCard=(props:{product:ProductModel})=>{
    const product=props.product;
    let navigate=useNavigate();

    const clickHandler=(event:SyntheticEvent)=>{
        event.preventDefault();
        navigate(`${AppConstants.viewProductRoute}/${product.id}`);
    }

    const dragStartHandler=(event:DragEvent)=>{
        event.dataTransfer.setData('text',product.id.toString());
    }


    return(
        <div draggable={true} onDragStart={dragStartHandler} id={product.id.toString()} style={{padding:'2% 2% 2% 2%',margin:'2% 5% 2% 5%',height:'400px',border:'0.5px solid lightgrey',boxShadow:'-10px 10px lightgrey'}}>
            <div className={'center-content'} style={{height:'35%',width:'100%',borderBottom:'1px solid black',marginTop:'10%'}}>
            <img onClick={clickHandler} draggable={false}  src={product.image} alt={product.name} style={{maxWidth:'80%',maxHeight:"80%"}}/>
            </div>
            <div>
                <ul>
                {
                    AppConstants.PRODUCT_CONFIG_FIELDS.map((field,index:number)=>{
                        return(
                            <li key={index} style={{textOverflow:"ellipsis",whiteSpace:'nowrap',overflow: "hidden"}}>{field.label+': '+product[field.id as keyof ProductModel]}</li>
                        )
                    })
                }
                </ul>
            </div>
        </div>);
}
