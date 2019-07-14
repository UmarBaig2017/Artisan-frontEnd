import React, { Component } from 'react';
import { Route, Router } from 'react-router-dom';
import history from './History';
// PureArt
import PureUsers from "./components/PureArtesanal/PureUsers"
import PureListings from "./components/PureArtesanal/PureListings"
import PureSales from "./components/PureArtesanal/PureSales"
import PureCategory from "./components/PureArtesanal/PureCategory"
// PureArArt
import PureArUsers from "./components/PuroAr/PureUsers"
import PureArListings from "./components/PuroAr/PureListings"
import PureArSales from "./components/PuroAr/PureSales"
import PureArCategory from "./components/PuroAr/PureCategory"
// My Consgmnt
import MyCat from "./components/My consigmnent/myCat"
import MyListings from "./components/My consigmnent/MyListings"
import MyUsers from "./components/My consigmnent/MyUsers"
import MySales from "./components/My consigmnent/MySales"
// Mi consgmnt
import MiCategory from "./components/Mi Consigmnrnt Spanish/myCat"
import MiListings from "./components/Mi Consigmnrnt Spanish/MyListings"
import MiUsers from "./components/Mi Consigmnrnt Spanish/MyUsers"
import MiSales from "./components/Mi Consigmnrnt Spanish/MySales"

import Dashboard from "./components/Dashboard"
import Admin from "./components/admin"

// export const history = createBrowserHistory()

class Routers extends Component {
    render() {
        return (
            <Router history={history}>
                <div>
                    <Route exact path="/" component={Admin} />   
                    <Route  path="/Dashboard" component={Dashboard} />   
                      {/** */}
                    <Route  path="/PureUsers" component={PureUsers} />   
                    <Route  path="/PureListings" component={PureListings} />   
                    <Route  path="/PureCategory" component={PureCategory} />   
                    <Route  path="/PureSales" component={PureSales} />   
                    {/** */}
                    <Route  path="/PureArUsers" component={PureArUsers} />   
                    <Route  path="/PureArListings" component={PureArListings} />   
                    <Route  path="/PureArCategory" component={PureArCategory} />   
                    <Route  path="/PureArSales" component={PureArSales} /> 
                      {/** */}  
                    <Route  path="/MyUsers" component={MyUsers} />   
                    <Route  path="/MySales" component={MySales} />   
                    <Route  path="/MyCategory" component={MyCat} />   
                    <Route  path="/MyListings" component={MyListings} />  
                      {/** */} 
                    <Route  path="/MiUsers" component={MiUsers} />   
                    <Route  path="/MiSales" component={MiSales} />   
                    <Route  path="/MiCategory" component={MiCategory} />   
                    <Route  path="/MiListings" component={MiListings} />  
                </div>
            </Router>
        )
    }
}

export default Routers;