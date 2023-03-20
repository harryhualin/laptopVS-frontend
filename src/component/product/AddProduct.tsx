import React, {SyntheticEvent} from "react";
import {ProductModel} from "../../models/ProductModel";
import {RateModel} from "../../models/RateModel";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import {bindActionCreators, Dispatch} from "redux";
import {connect} from "react-redux";
import {addProduct} from "../../actions/product.action";

class AddProduct extends React.Component<AddProductProps, AddProductState>{
    constructor(props:any) {
        super(props);
        this.state={
            brand: "",
            camera: "",
            display: "",
            graphics: "",
            image: "",
            memory: "",
            name: "",
            operating_system: "",
            price: 0,
            processor: "",
            source: "",
            storage: "",
            type: "",
            views: 0
        }
    }

    updateHandler=(event:SyntheticEvent)=>{
        const fieldValue=(event.target as HTMLInputElement).value;
        const field=(event.target as HTMLInputElement).name;
        const newProduct={...this.state, [field]:fieldValue};

        //shallow copy comparison then merge to state
        //so even no msg to update, the msg wouldn't delete
        //But it only works on first property
        this.setState(newProduct);
    }
    addProductHandler=(event:SyntheticEvent)=>{
        event.preventDefault();
        console.log(this.state);
        this.props.addProduct(this.state);
    }

    render() {
        return (
            <div className={'center-content'} >
                <ul style={{width:'70%',display:'flex',flexDirection:"column"}}>
                {   Object.keys(this.state).map((key)=>{
                    return <TextField
                        key={key}
                        name={key}
                        label={key}
                        value={this.state[key as keyof typeof this.state]}
                        onChange={this.updateHandler}
                        margin='normal'
                    >
                    </TextField>
                })
                }
                <Button variant={'contained'} onClick={this.addProductHandler}>add</Button>
                </ul>

            </div>
        );
    }


}
interface AddProductProps {
    addProduct: (newProduct: AddProductState) => {};
}
export interface AddProductState {
    type:string;
    name:string;
    brand:string;
    views:number;
    image:string;
    source:string;
    price:number;
    processor: string;
    operating_system:string;
    graphics : string;
    memory :string;
    storage : string;
    display :string;
    camera :string;
}

function mapDispatchToProps(dispatch:Dispatch){
    return bindActionCreators({
        addProduct:addProduct
    },dispatch);
}

export default connect(null,mapDispatchToProps) (AddProduct);

