import React, { useEffect, useState } from "react";
import '../../../assets/css/vendor/bootstrap.min.css';
import '../../../assets/css/vendor/font-awesome.css';
import '../../../assets/css/vendor/fontawesome-stars.css';
import '../../../assets/css/vendor/ion-fonts.css';
import '../../../assets/css/plugins/slick.css';
import '../../../assets/css/plugins/animate.css';
import '../../../assets/css/plugins/jquery-ui.min.css';
import '../../../assets/css/plugins/lightgallery.min.css';
import '../../../assets/css/plugins/nice-select.css';
import '../../../assets/css/style.css';
import { useParams } from 'react-router-dom';
import Sparea from './sp-area/index';
import Description from './product-tab/index';
import Others_Products from './product-related/index';
import Brand from './brand/index';
import axios from "axios";
import Loader from "../../../components/Loader/Loader";
const Product =()=>{
     const { id } = useParams();
     const [part,setPart]= useState(null);
     const [reviews,setreviews]= useState(null);

useEffect(() => {
  axios.get(`http://localhost:5298/api/user/product/getproduct/${id}`)
    .then(response => {
      setPart(response.data);
    })
    .catch(error => console.error('Gabim gjatë marrjes së produktit:', error));
}, [id]);
useEffect(() => {
  axios.get(`http://localhost:5298/api/user/product/getreviews/${id}`)
    .then(response => {
      setreviews(response.data);
    })
    .catch(error => console.error('Gabim gjatë marrjes së produktit:', error));
}, [id]);
     if(!part)
        return <Loader/> 

const descriptionArray = [
    {title:part.Name , text:part.description}
];



    return(
        
    <div className="main-wrapper">
 
<Sparea product={part} />

<Description description={descriptionArray} reviews={reviews.reviews} partId={part.id}/>
    <Others_Products/>

   <Brand/>
 



</div>

    );
};

export default Product;