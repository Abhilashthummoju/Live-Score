import React from "react";
import NavBar from "./NavBar";

const About = () => {
  return (
    <div >
        <NavBar/>
      <h2>About Us</h2>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed gravida
        mattis nisi, nec accumsan libero dapibus ac. Duis nec eros purus. Ut
        eget tincidunt ligula. Quisque et urna sit amet ex sollicitudin
        vestibulum. Integer consectetur orci a ipsum ultricies, vel cursus
        dolor faucibus. Donec tincidunt quam vel augue fermentum, in mollis
        odio bibendum.
      </p>
      <p>
        Vestibulum non lacinia elit, nec lacinia risus. Nullam a diam sit amet
        ipsum fringilla tempus. Aliquam erat volutpat. Suspendisse potenti.
        Phasellus id ligula tincidunt, lobortis nulla eget, tincidunt eros.
        Cras sit amet lacus in tortor rutrum interdum. Vestibulum rhoncus,
        turpis sit amet bibendum venenatis, nisi ligula ullamcorper elit, in
        sodales odio sem et tortor.
      </p>
      <p>
        Nulla nec tortor et ex efficitur hendrerit. Fusce maximus nulla vel
        diam tincidunt, non malesuada ex tempus. Integer eleifend ipsum id
        augue cursus, a venenatis enim consectetur. Curabitur id libero et
        lorem condimentum maximus.
      </p>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "600px",
    margin: "0 auto",
    padding: "20px",
  },
};

export default About;
