import {useSelector} from "react-redux";
import {LaptopCard} from "../cards/LaptopCard";
import {FormControlLabel,Checkbox,Accordion,AccordionSummary,AccordionDetails} from "@mui/material";
import React, {SyntheticEvent, useEffect, useState} from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {AppConstants, PRODUCT_FILTER_CONDITIONS, PRODUCT_SORT_COMPARATOR} from "../../constant/AppConstants";
import {ProductModel} from "../../models/ProductModel";
import {reduxState} from "../../reducer/root.reducer";
import {wrapMapToPropsConstant} from "react-redux/es/connect/wrapMapToProps";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import {useParams} from "react-router-dom";

export const Products=()=>{

    const products=useSelector((state:reduxState)=>state.products);
    const [brand,setBrand]=useState('all');
    const [search,setSearch]=useState('');
    const [viewProducts,setViewProducts]=useState(products);
    const {sortedBy}=useParams();
    const [sort,setSort]=useState(sortedBy);

    const checklist:{[key:string]:boolean}={};
    Object.keys(PRODUCT_FILTER_CONDITIONS).map((key)=>{
        Object.keys(PRODUCT_FILTER_CONDITIONS[key])
            .map((condition)=>{checklist[condition]=false});
    });
    const [checked, setChecked] = useState(checklist);

    useEffect(()=>{
        let newList=[...products];
        Object.keys(PRODUCT_FILTER_CONDITIONS)
            .forEach((key)=>{
                Object.keys(PRODUCT_FILTER_CONDITIONS[key])
                    .forEach((condition)=>{
                        if(checked[condition]) {
                            newList=newList
                                .filter(PRODUCT_FILTER_CONDITIONS[key][condition]);

                        }
                    });
            });
        setViewProducts(newList);
    },[checked,products])


    const handleChange = (event: SyntheticEvent) => {
        event.preventDefault();
        setChecked({...checked,[(event.target as HTMLInputElement).name]:!checked[(event.target as HTMLInputElement).name]});
    };

    const brandClickHandler=(event:SyntheticEvent)=>{
        event.preventDefault();
        const newBrand=(event.target as HTMLInputElement).id;
        if(newBrand===brand){
            setBrand('all');
        }
        else setBrand(newBrand);
    }


    return (
        <div>
            <ul className="nav nav-tabs navbar-expand-lg">
                {AppConstants.LAPTOP_BRANDS?  AppConstants.LAPTOP_BRANDS.map((brand,index)=>{
                    return <li className={'nav-item'} key={index}>
                        <a className={'nav-link'} id={brand} href="#" onClick={(e)=>{brandClickHandler(e);}}>{brand}</a>
                    </li>
                }):<h5>loading</h5>}

            </ul>

            <div style={{display:'flex',height:'100vh'}}>
                <div id={'condition-filter'} style={{width:'20%',overflowY:"auto"}}>
                    <div id='sorted-bar'>
                        {'Sorted by     '}
                        <select value={sort} onChange={(e)=>{setSort(e.target.value);}}>
                            <option value='highest-price'>highest-price</option>
                            <option value='lowest-price'>lowest-price</option>
                            <option value='most-views'>most-views</option>
                            <option value='least-view'>least-view</option>
                            <option value='highest-rated'>highest-rated</option>
                            <option value='lowest-rated'>lowest-rated</option>
                        </select>
                    </div>
                    <div>

                        {
                            Object.keys(PRODUCT_FILTER_CONDITIONS).map((key,index)=>{
                                return<Accordion key={index}>
                                    <AccordionSummary
                                        expandIcon={<ExpandMoreIcon/>}
                                        aria-controls="panel1a-content"
                                        id="panel1a-header"
                                    >
                                        <Typography>{key}</Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <Box sx={{ display: 'flex', flexDirection: 'column', ml: 3 }}>

                                            {
                                                Object.keys(PRODUCT_FILTER_CONDITIONS[key])
                                                    .map((condition,index)=>{return <FormControlLabel
                                                        key={index}
                                                        label={condition}
                                                        name={condition}
                                                        control={<Checkbox checked={checked[condition]} onChange={handleChange}/>}
                                                    />})
                                            }
                                        </Box>
                                    </AccordionDetails>
                                </Accordion>
                                }
                            )
                        }



                    </div>
                </div>
                <div style={{width:'80%'}}>
                <TextField style={{width:'80%'}} label='Search' value={search} onChange={(e)=>{setSearch(e.target.value)}}></TextField>
                <div id={'main-container'} style={{display:'flex',flexWrap: 'wrap',overflowY:'auto',maxHeight:'80%'}}>

                    {
                        viewProducts? viewProducts
                                .filter((product)=>{if(brand==='all') return product.name.toLowerCase().includes(search);
                                    else return product.brand.toLowerCase()===brand.toLowerCase()&&product.name.toLowerCase().includes(search);})
                                .sort(PRODUCT_SORT_COMPARATOR[sort?sort:'most-views'])
                                .map((product:ProductModel,i:number)=> <div style={{width:'25%'}} key={i}><LaptopCard product={product} ></LaptopCard></div>)
                            :<>loading</>
                    }
                </div>
                </div>
            </div>

        </div>
    )
}