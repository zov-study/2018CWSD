import React, { Component } from 'react';
//import logo from 'img/SmartBrands_FinalLogo.jpg';
import './css/App.css';

const logo = 'img/SmartBrands_FinalLogo.jpg';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="SmartBrands logo" />
          <h1 className="App-title"> </h1>
        </header>
        <nav class="navbar navbar-expand-lg navbar-fixed-top">
        <ul class="navbar-nav">
          <li>Home</li>
          <li>Men</li>
          <li>Women</li>
          <li>Apparel</li>
        </ul>
        </nav>
        <div className="col-lg-8">
          <h2>SHOP SMART PAY LESS!</h2>
          <p className="App-intro">
            At Smart Brands we offer affordable, designer-alternative handbags and perfumes at pop-up locations around New Zealand. We hunt the globe for products that look and feel like they’re straight off the run way, or fresh out of a magazine. Our products make you feel a million dollars, without breaking the bank.

            Follow us on Facebook for regular location and product updates.
          </p>
        </div>
        <footer>
          <ul class="social-popout">
            <li><a href="https://www.facebook.com/smartbrandsnz" target="_blank"><img src="img/facebook-48circle.png" alt="We are in Facebook" srcset=""/></a></li>
            <li><a href="http://instagram.com"target="_blank"><img src="img/instagram-48circle.png" alt="We are in InstaGram" srcset=""/></a></li>
            <li><a href="http://linkedin.com" target="_blank"><img src="img/linkedin-48circle.png" alt="We are in LinkedIn" srcset=""/></a></li>
        </ul>   
      </footer>
      </div>
    );
  }
}

export default App;
