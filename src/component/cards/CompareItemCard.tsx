import React from "react";
import {AppConstants} from "../../constant/AppConstants";
import {ProductModel} from "../../models/ProductModel";

class CompareItemCard extends React.Component<compareItemProps, any> {
    firstProduct=this.props.firstProduct;
    secondProduct=this.props.secondProduct;

    render(){
        return (
            <>
            {(this.firstProduct&&this.secondProduct)?
                <div id={this.firstProduct.id.toString()} style={{padding:'0% 2% 2% 2%',margin:'2% 5% 2% 5%',width:'100%',height:'96%'}}>
                <div style={{height:'40%',width:'100%',marginTop:'3%',display:'flex'}}>
                    <div className={'center-content'} style={{width:'40%'}}> <img draggable={false}  src={this.firstProduct.image} alt={this.firstProduct.name} style={{maxWidth:'80%',maxHeight:"90%"}}/></div>
                    <div className={'center-content'} style={{width:'60%',paddingLeft:'20%'}}> <img draggable={false}  src={this.secondProduct.image} alt={this.secondProduct.name} style={{maxWidth:'80%',maxHeight:"90%"}}/></div>
                </div>
                <div>
                    <ul>
                        {
                            AppConstants.PRODUCT_CONFIG_FIELDS.map((field,index:number)=>{
                                return(
                                    <li key={index} style={{textOverflow:"ellipsis",overflow: "hidden",borderTop:'1px solid black',display:'flex'}}>
                                       <div style={{width:'40%'}}>{field.label+': '+this.firstProduct![field.id as keyof ProductModel]}</div>
                                        <div style={{width:'60%',paddingLeft:'20%'}}>{field.label+': '+this.secondProduct![field.id as keyof ProductModel]}</div>

                                    </li>
                                )
                            })
                        }
                        <li style={{textOverflow:"ellipsis",overflow: "hidden",borderTop:'1px solid black',display:'flex'}}>
                            <div style={{width:'40%'}}>price: <span className="text-danger" style={{fontSize:'200%'}}><strong>{this.firstProduct.price}</strong></span></div>
                            <div style={{width:'60%',paddingLeft:'20%'}}>price: <span className="text-danger" style={{fontSize:'200%'}}><strong>{this.secondProduct.price}</strong></span></div>

                        </li>
                    </ul>
                </div>
            </div>:<div>invalid</div>}
                </>
                );

    }
}
interface compareItemProps{
    firstProduct:ProductModel|null;
    secondProduct:ProductModel|null
}
export default CompareItemCard;