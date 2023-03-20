
import {useSelector} from "react-redux";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import css from './Welcome.module.scss'
import {Link} from "react-router-dom";
import {AppConstants, PRODUCT_SORT_COMPARATOR} from "../../constant/AppConstants";
import {LaptopCard} from "../cards/LaptopCard";

import {AdsItemCard} from "../cards/AdsItemCard";
import {ProductModel} from "../../models/ProductModel";



export const Welcome=()=>{
    const products=useSelector((state:any)=>state.products);

    const responsive = {
        superLargeDesktop: {
            // the naming can be any, depends on you.
            breakpoint: { max: 4000, min: 3000 },
            items: 5
        },
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 1
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 2
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1
        }
    };
    const aResponsive = {
        superLargeDesktop: {
            // the naming can be any, depends on you.
            breakpoint: { max: 4000, min: 3000 },
            items: 5
        },
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 4
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 2
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1
        }
    };


    const adsItem= products.slice(0,3).map((product:ProductModel,index:number) =><AdsItemCard key={index} product={product}/>);

    if(!products) return<div></div>;
    else
    return(
        <div >
            <div style={{padding:'5px 10% 0 10%'}}>
                <Carousel responsive={responsive}>
                    {adsItem}
                </Carousel>
            </div>
            <div>
                <div className={css.itemTag}>
                <h5> most popular </h5>
                    <Link to={`${AppConstants.productsRoute}/most-views`}><h5> {'view more >>'}</h5></Link>
                </div>
                <Carousel responsive={aResponsive}>
                    {products?(products.sort(PRODUCT_SORT_COMPARATOR['most-views']).slice(0,10).map((product: any,index:number) => <LaptopCard key={product.name+index} product={product}></LaptopCard>)):<div>loading</div>}
                </Carousel>
            </div>
            <div>
                <div className={css.itemTag}>
                    <h5> highest rated </h5>
                 <Link to={`${AppConstants.productsRoute}/highest-rated`}><h5> {'view more >>'}</h5></Link>
                </div>

                <Carousel responsive={aResponsive}>
                    {products?(products.sort(PRODUCT_SORT_COMPARATOR['highest-rated']).slice(0,10).map((product: any,index:number) => <LaptopCard key={product.name+index} product={product}></LaptopCard>)):<div>loading</div>}
                </Carousel>
            </div>
            <div style={{height:'100px'}}></div>
        </div>
    );

}