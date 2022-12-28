import Image from '../../assets/meals.jpg'
import classes from './Header.module.css'
import React ,{Fragment} from 'react';
import HeaderCartButton from './HeaderCartButton';


function Header(props){
    return <Fragment>
        <header className = {classes.header}>
            <h1>React Meals</h1>
            <HeaderCartButton  onShow = {props.onShow}/>
        </header>
        <div className={classes['main-image']}>
            <img src={Image}  />
        </div>

    </Fragment>

}

export default Header;