import React, { useState,useEffect } from "react";
import NavBar from "./NavBar";

const Home = () => {

  return (
<div style={{ backgroundImage: 'url(/background.jpg)', backgroundSize: 'cover', height: '100vh',padding:0,margin:-8 }}>
<NavBar />
<div style={{position:'absolute',right:200,top:200,height:500,width:700}}>
    <div style={{display:'flex',flexDirection:'column'}}> 
    <text style={{color:'white',fontSize:50,fontFamily:'fantasy',fontSmooth:20,fontWeight:'bold'}}>
Stay Updated, Stay Informed
</text>
<text style={{fontSize:20,color:'white'}}>With our live score updates, you'll never miss a moment of the action.</text>
<text style={{fontSize:20,color:'white'}}>From thrilling Test matches to high-octane T20 games, we cover it all.</text> 
<text style={{fontSize:20,color:'white'}}>Our dedicated team works around the clock to ensure you get the most accurate and up-to-date information, straight from the cricket field</text>

    </div>
</div>

{/* Your other content goes here */}
</div>
  );
};

const styles = {
    navBar:{
        backgroundColor:'#96EFFF',
        height:70,
        width:'100%',
        padding:5
    },
    dashboard:{
        display:'flex',
        alignItems:'center',
        alignSelf:'center',
        justifyContent:'center',
        width:500,
        height:50,
        borderRadius:10,
        backgroundColor:'#96EFFF',
        marginLeft:'35%',
        marginTop:5
    }
}

export default Home;















