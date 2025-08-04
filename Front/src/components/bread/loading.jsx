import '../../assets/css/vendor/bootstrap.min.css';
const loading =()=>{

    return(
        <div class="loading">
        <div class="text-center middle">
            <div class="lds-ellipsis">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
    </div>
    );
};


export default loading;