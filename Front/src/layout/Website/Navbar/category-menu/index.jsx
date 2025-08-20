import { useState,useEffect } from "react";
import '../../../../assets/css/vendor/bootstrap.min.css';
import '../../../../assets/css/vendor/font-awesome.css';
import '../../../../assets/css/vendor/fontawesome-stars.css';
import '../../../../assets/css/vendor/ion-fonts.css';
import '../../../../assets/css/plugins/slick.css';
import '../../../../assets/css/plugins/animate.css';
import '../../../../assets/css/plugins/jquery-ui.min.css';
import '../../../../assets/css/plugins/lightgallery.min.css';
import '../../../../assets/css/plugins/nice-select.css';
import '../../../../assets/css/style.css';
const category_menu =()=>{ 
    return(
        <div class="custom-category_col col-12">
        <div class="category-menu category-menu-hidden" >
            <div class="category-heading">
                <h2 class="categories-toggle" >
                 
                    <span>Porosite sot,</span>
                    <span>montoje nesër</span>
                </h2>
            </div>
        </div>
    </div>
    );
};

export default category_menu;