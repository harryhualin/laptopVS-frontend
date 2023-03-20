import {SyntheticEvent} from "react";
import {useNavigate} from "react-router-dom";
import {AppConstants} from "../../constant/AppConstants";
import {ProductModel} from "../../models/ProductModel";

export const AdsItemCard=(props:{product:ProductModel})=>{
    const product=props.product;
    let navigate=useNavigate();

    const clickHandler=(event:SyntheticEvent)=>{
        event.preventDefault();
        navigate(`${AppConstants.viewProductRoute}/${product.id}`);
    }
    return(
        <div onClick={clickHandler}>
            <div className={'center-content'}>
                <img src={product.image} alt={product.name}/>
                <div>
                    <ul>
                        {
                            AppConstants.PRODUCT_CONFIG_FIELDS.map((field,index:number)=> <li key={index}>{field.label+': '+product[field.id as keyof ProductModel]}</li>

                            )
                        }
                    </ul>
                </div>
            </div>
        </div>);
}
