import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import axios from 'axios';

const StoreCartFloatingBtn = (props) => {
  const [cartQuantity, setCartQuantity] = useState(0);

  const getUserCartQuantity = async() => {
    const resp = await axios.post("http://localhost:3000/getUserCartQuantity", null, { params: {"memId": "user01test"}});
    // alert(resp.data)
    setCartQuantity(resp.data)  // 담긴 물건이 0 이면 투명, 0 이 아니면 "cart_reddot"
  }

  useEffect (() => {
    getUserCartQuantity()
  }, [cartQuantity])

  const handleClick = () => {
    // window.open("https://example.com", "_blank");
  }

  return (
    <Link to={`/store-cart/`} rel="noopener noreferrer">
        <button className='cart_reddot'
        style={{
            position: 'fixed',
            bottom: '-15px',
            right: '80px',
            zIndex: "9999"
        }}
        onClick={handleClick}
        >
        {/* {props.productCode} // 지금 바로 구입 aa */}
        {/* <FontAwesomeIcon icon={faCamera} size="5x" /> */}
        <div style={{padding: "0px 0px 0px 0px", position: "relative;"}}>
          <FontAwesomeIcon icon={faCartShopping} size="3x"/>
        </div>
        
        <div style={{position: "relative", left: "30px", top: "-60px"}}>
          <h6><span class={cartQuantity === 0 ? "cart_none" : "cart_reddot"}>{cartQuantity}</span></h6>
        </div>
        
        </button>
        
    </Link>
                    
  );
}

export default StoreCartFloatingBtn;
