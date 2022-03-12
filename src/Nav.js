import React,{useEffect, useState} from "react";
import netflix from '../src/netflix.png'
import avatar from '../src/netflixs.png'
import './nav.scss'

const Nav = () => {
    const [show, handleShow] = useState(false);
    

    useEffect(() => {
      window.addEventListener("scroll", ()=> {
        if (window.scrollY > 100) {
            handleShow(true);
        } else {
            handleShow(false);
        }
      });    
      return () => {
        window.removeEventListener("scroll")
      };
    }, []);
    
  return ( 
    <div className={`nav ${show && "nav__black"}`}>
        <img src={avatar} alt="Netflix logo" className="nav__logo" />

        <img src={netflix} alt="Netflix logo" className="nav__avatar" />        
    </div>
  )
};

export default Nav;
