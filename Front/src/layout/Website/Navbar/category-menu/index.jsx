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
       const [showMenu, setShowMenu] = useState(false);
    
        useEffect(() => {
        }, [showMenu]);
    return(
        <div class="custom-category_col col-12">
        <div class="category-menu category-menu-hidden" onClick={() => setShowMenu(!showMenu)}>
            <div class="category-heading">
                <h2 class="categories-toggle" >
                 
                    <span>Shop By</span>
                    <span>Department</span>
                </h2>
            </div>
            <div id="cate-toggle" class="category-menu-list" style={{ display: showMenu ? "block" : "none" }}>
                <ul>
                    <li class="right-menu"><a href="shop-left-sidebar.html">Car Parts</a>
                        <ul class="cat-mega-menu">
                            <li class="right-menu cat-mega-title">
                                <a href="shop-left-sidebar.html">Active body control</a>
                                <ul>
                                    <li><a href="shop-left-sidebar.html">Aluminum Nonstick</a></li>
                                    <li><a href="shop-left-sidebar.html">Calphalon</a></li>
                                    <li><a href="shop-left-sidebar.html">Contemporary</a></li>
                                    <li><a href="shop-left-sidebar.html">Hard-Anodized</a></li>
                                </ul>
                            </li>
                            <li class="right-menu cat-mega-title">
                                <a href="shop-left-sidebar.html">Battery Indicator</a>
                                <ul>
                                    <li><a href="shop-left-sidebar.html">Sanai laptops</a></li>
                                    <li><a href="shop-left-sidebar.html">Byteflight</a></li>
                                    <li><a href="shop-left-sidebar.html">EXcaliberPC</a></li>
                                    <li><a href="shop-left-sidebar.html">Gaming Laptops</a></li>
                                </ul>
                            </li>
                            <li class="right-menu cat-mega-title">
                                <a href="shop-left-sidebar.html">Remote Starter</a>
                                <ul>
                                    <li><a href="shop-left-sidebar.html">Dual Core</a></li>
                                    <li><a href="shop-left-sidebar.html">Gaming Monitors</a></li>
                                    <li><a href="shop-left-sidebar.html">GPS Monitors</a></li>
                                    <li><a href="shop-left-sidebar.html">Heat Shield</a></li>
                                </ul>
                            </li>
                        </ul>
                    </li>
                    <li class="right-menu"><a href="shop-left-sidebar.html">Tools &amp; Accessories</a>
                        <ul class="cat-mega-menu cat-mega-menu-2">
                            <li class="right-menu cat-mega-title">
                                <a href="shop-left-sidebar.html">Drills</a>
                                <ul>
                                    <li><a href="shop-left-sidebar.html">Angle Drills</a></li>
                                    <li><a href="shop-left-sidebar.html">Combi Drills</a></li>
                                    <li><a href="shop-left-sidebar.html">Drill Drivers</a></li>
                                    <li><a href="shop-left-sidebar.html">PercussionDrills</a></li>
                                </ul>
                            </li>
                            <li class="right-menu cat-mega-title">
                                <a href="shop-left-sidebar.html">Nail Guns</a>
                                <ul>
                                    <li><a href="shop-left-sidebar.html">Air Nail Guns</a></li>
                                    <li><a href="shop-left-sidebar.html">Cordless Nail Guns</a></li>
                                    <li><a href="shop-left-sidebar.html">Electric Nail Guns</a></li>
                                    <li><a href="shop-left-sidebar.html">Gas Nail Guns</a></li>
                                </ul>
                            </li>
                            <li class="right-menu cat-mega-title">
                                <a href="shop-left-sidebar.html">Sanders</a>
                                <ul>
                                    <li><a href="shop-left-sidebar.html">1/2 Sheet Sanders</a></li>
                                    <li><a href="shop-left-sidebar.html">1/4 Sheet Sanders</a></li>
                                    <li><a href="shop-left-sidebar.html">Belt Sanders</a></li>
                                    <li><a href="shop-left-sidebar.html">Drywall Sanders</a></li>
                                </ul>
                            </li>
                            <li class="right-menu cat-mega-title">
                                <a href="shop-left-sidebar.html">Saws</a>
                                <ul>
                                    <li><a href="shop-left-sidebar.html">Circular Saws</a></li>
                                    <li><a href="shop-left-sidebar.html">Jigsaws</a></li>
                                    <li><a href="shop-left-sidebar.html">Mitre Saws</a></li>
                                    <li><a href="shop-left-sidebar.html">Reciprocating Saws</a></li>
                                </ul>
                            </li>
                        </ul>
                    </li>
                    <li class="right-menu"><a href="shop-left-sidebar.html">Suspension Systems</a>
                        <ul class="cat-mega-menu cat-mega-menu-3">
                            <li class="right-menu cat-mega-title">
                                <a href="shop-left-sidebar.html">Clothing</a>
                                <ul>
                                    <li><a href="shop-left-sidebar.html">Cuisinart</a></li>
                                    <li><a href="shop-left-sidebar.html">Homeinart</a></li>
                                    <li><a href="shop-left-sidebar.html">Kettle Stainless</a></li>
                                    <li><a href="shop-left-sidebar.html">Steel Stovetop</a></li>
                                </ul>
                            </li>
                            <li class="right-menu cat-mega-title">
                                <a href="shop-left-sidebar.html">Jewelry</a>
                                <ul>
                                    <li><a href="shop-left-sidebar.html">Hard Anodized</a></li>
                                    <li><a href="shop-left-sidebar.html">Scratch Resistant</a></li>
                                    <li><a href="shop-left-sidebar.html">Thermo-Spot</a></li>
                                    <li><a href="shop-left-sidebar.html">Ultimate</a></li>
                                </ul>
                            </li>
                        </ul>
                    </li>
                    <li class="right-menu"><a href="shop-left-sidebar.html">Turbo System</a>
                        <ul class="cat-mega-menu">
                            <li class="right-menu cat-mega-title">
                                <a href="shop-left-sidebar.html">BMW</a>
                                <ul>
                                    <li><a href="shop-left-sidebar.html">Dining Chairs</a></li>
                                    <li><a href="shop-left-sidebar.html">Dining Tables</a></li>
                                    <li><a href="shop-left-sidebar.html">Gramophone</a></li>
                                    <li><a href="shop-left-sidebar.html">Sideboards</a></li>
                                </ul>
                            </li>
                            <li class="right-menu cat-mega-title">
                                <a href="shop-left-sidebar.html">FORD</a>
                                <ul>
                                    <li><a href="shop-left-sidebar.html">Chairs & Sofas</a></li>
                                    <li><a href="shop-left-sidebar.html">Chest</a></li>
                                    <li><a href="shop-left-sidebar.html">Loungers</a></li>
                                    <li><a href="shop-left-sidebar.html">Sets</a></li>
                                </ul>
                            </li>
                            <li class="right-menu cat-mega-title">
                                <a href="shop-left-sidebar.html">POSCHER</a>
                                <ul>
                                    <li><a href="shop-left-sidebar.html">Bed</a></li>
                                    <li><a href="shop-left-sidebar.html">Daybed</a></li>
                                    <li><a href="shop-left-sidebar.html">Futon</a></li>
                                    <li><a href="shop-left-sidebar.html">Hammock</a></li>
                                </ul>
                            </li>
                        </ul>
                    </li>
                    <li class="right-menu"><a href="shop-left-sidebar.html">Oils & Fluids</a>
                        <ul class="cat-dropdown">
                            <li>
                                <a href="shop-left-sidebar.html">Daylesford</a>
                                <a href="shop-left-sidebar.html">Delaware</a>
                                <a href="shop-left-sidebar.html">Fayence</a>
                                <a href="shop-left-sidebar.html">Franzea</a>
                                <a href="shop-left-sidebar.html">Mable</a>
                                <a href="shop-left-sidebar.html">Mobo</a>
                                <a href="shop-left-sidebar.html">Pippins</a>
                            </li>
                        </ul>
                    </li>
                    <li class="right-menu"><a href="shop-left-sidebar.html">Exterior</a>
                        <ul class="cat-dropdown cat-dropdown-2">
                            <li>
                                <a href="shop-left-sidebar.html">Coffee & side tables</a>
                                <a href="shop-left-sidebar.html">Living room lighting</a>
                                <a href="shop-left-sidebar.html">Living room storage</a>
                                <a href="shop-left-sidebar.html">Living room textiles & rugs</a>
                            </li>
                        </ul>
                    </li>
                    <li><a href="shop-left-sidebar.html">Body Parts</a></li>
                    <li><a href="shop-left-sidebar.html">Interior</a></li>
                    <li><a href="shop-left-sidebar.html">Audio</a></li>
                    <li><a href="shop-left-sidebar.html">End Tables</a></li>
                    <li class="rx-child"><a href="shop-left-sidebar.html">Uncategorized</a></li>
                    <li class="rx-child"><a href="shop-left-sidebar.html">Appliances</a></li>
                    <li class="rx-parent">
                        <a class="rx-default">More Categories</a>
                        <a class="rx-show">Collapse</a>
                    </li>
                </ul>
            </div>
        </div>
    </div>
    );
};

export default category_menu;