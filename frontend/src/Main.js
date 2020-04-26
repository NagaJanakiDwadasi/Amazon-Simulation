import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Home from './LandingPage';
import Login from './Components/Login/login';
import Signup from './Components/SignUp/signup';
import SellerHome from './Components/Seller/sellerHome';
import CustomerHome from './Components/Customer/customerHome';
import Customer from './Components/Customer/customer';
import UserProfile from './Components/User/userProfile';
import CustomerAddresses from './Components/Customer/customerAddresses';
import Cart from './Components/Cart/Cart';
//admin
import adminHome from './Components/Admin/adminHome';
import inventory from './Components/Admin/inventory';
import viewSellerList from './Components/Admin/viewSellerList';
//Products
import AddProduct from './Components/Products/AddProduct';
import EditName from './Components/User/editName';
import EditEmail from './Components/User/editEmail';
import SellerOptions from './Components/Seller/sellerOptions';
import AddNewAddress from './Components/Addresses/addNewAddress';
import PaymentInfo from './Components/PaymentOptions/paymentInfo';
import SavedAddresses from './Components/Addresses/savedAddresses';

class Main extends Component {
    render() {
        return (
                <div> 
                    <Route exact path="/" component={Home}/> 
                    <Route path="/login" component={Login}/>
                    <Route path="/signup" component={Signup}/>
                    <Route path="/sellerHome" component={SellerHome}/>
                    <Route path="/customerHome" component={CustomerHome}/>
                    <Route path="/customer" component={Customer}/>
                    <Route path="/userProfile" component={UserProfile}/>
                    <Route path="/adminHome" component={adminHome} />
                    <Route path="/inventory" component={inventory} />
                    <Route path="/viewSellerList" component={viewSellerList} />       
                    <Route path="/addProduct" component={AddProduct} />
                    <Route path="/editName" component={EditName}/>
                    <Route path="/editEmail" component={EditEmail}/>
                    <Route path="/sellerOptions" component={SellerOptions}/>
                    <Route path="/cart" component={Cart}/>
                    <Route path="/addNewAddress" component={AddNewAddress}/>
                    <Route path="/paymentInfo" component={PaymentInfo}/>
                    <Route path="/savedAddresses" component={SavedAddresses}/>
                </div>
        )
    }
}

export default Main;