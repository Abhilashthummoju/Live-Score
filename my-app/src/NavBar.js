import React, { useState,useEffect } from "react";

const NavBar = () => {
    const userDataString = localStorage.getItem('userData');
    const userDataObject = JSON.parse(userDataString);
    console.log("abhi dataaa", userDataObject.data);

  return (
    <div style={{height:70,width:'100%',padding:5,display:'flex',flexDirection:'row'}}>
        <text style={{fontSize:40,color:'white',marginTop:20,marginLeft:15}}>MyGame Online</text>
        <div  style={{position:'absolute',right:50,marginTop:30,display:'flex',flexDirection:'row'}}>
        <div style={{margin:10,marginTop:10,color:'white',cursor: 'pointer',fontSize:25}}
        onClick={()=>{
            window.location.href = '/home';
        }}><text>Home</text></div>
        <div style={{margin:10,marginTop:10,color:'white',cursor: 'pointer',fontSize:25}}
        onClick={()=>{
            window.location.href = '/matches';
        }}><text>Matches</text></div>
        <div style={{margin:10,marginTop:10,color:'white',cursor: 'pointer',fontSize:25}}
        onClick={()=>{
            window.location.href = '/teams';
        }}><text>Teams</text></div>
        <div style={{margin:10,marginTop:10,color:'white',cursor: 'pointer',fontSize:25}}
        onClick={()=>{
            window.location.href = '/about';
        }}><text>About</text></div>
        <div style={{margin:10,marginTop:10,color:'white',cursor: 'pointer',fontSize:25}}
        onClick={()=>{
            window.location.href = '/contact';
        }}><text>Contact</text></div>
        <div style={{margin:10,marginTop:10,color:'white',cursor: 'pointer',fontSize:25}}
        onClick={()=>{
            window.location.href = '/auth';
        }}><text>Logout</text></div>
        </div>
   </div>
  );
};

const styles = {
    navBar:{
        // backgroundColor:'#ff4b2b',
        height:70,
        width:'100%',
        padding:5,
        display:'flex',
    },
   
}

export default NavBar;















