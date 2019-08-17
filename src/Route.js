import React, { Component } from 'react';
import { Route, Router } from 'react-router-dom';
import history from './History';
// PureArt
import PureUsers from "./components/PureArtesanal/PureUsers"
import PureListings from "./components/PureArtesanal/PureListings"
import PureSales from "./components/PureArtesanal/PureSales"
import PureCategory from "./components/PureArtesanal/PureCategory"
import PureReports from "./components/PureArtesanal/PureReports"
import PureListingReports from "./components/PureArtesanal/PureListigReports"
// PureArArt
import PureArUsers from "./components/PuroAr/PureUsers"
import PureArListings from "./components/PuroAr/PureListings"
import PureArSales from "./components/PuroAr/PureSales"
import PureArCategory from "./components/PuroAr/PureCategory"
import PureArReports from "./components/PuroAr/PureArReports"
import PureArListingReports from "./components/PuroAr/PuroArListingReports"
// My Consgmnt
import MyCat from "./components/My consigmnent/myCat"
import MyListings from "./components/My consigmnent/MyListings"
import MyUsers from "./components/My consigmnent/MyUsers"
import MySales from "./components/My consigmnent/MySales"
import MyReports from './components/My consigmnent/MyReports'
import MyListingReports from './components/My consigmnent/ListingReports'
// Mi consgmnt
import MiCategory from "./components/Mi Consigmnrnt Spanish/myCat"
import MiListings from "./components/Mi Consigmnrnt Spanish/MyListings"
import MiUsers from "./components/Mi Consigmnrnt Spanish/MyUsers"
import MiSales from "./components/Mi Consigmnrnt Spanish/MySales"
import MiReports from "./components/Mi Consigmnrnt Spanish/MyReports"
import MiListingReports from "./components/Mi Consigmnrnt Spanish/MyListingReports"

import Reset from "./components/Reset"
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
                    <Route  path="/Reset" component={Reset} />   
                      {/** */}
                    <Route  path="/PureUsers" component={PureUsers} />   
                    <Route  path="/PureListings" component={PureListings} />   
                    <Route  path="/PureCategory" component={PureCategory} />   
                    <Route  path="/PureSales" component={PureSales} />   
                    <Route  path="/PureReports" component={PureReports} />   
                    <Route  path="/PureListingReports" component={PureListingReports} />   
                    {/** */}
                    <Route  path="/PureArUsers" component={PureArUsers} />   
                    <Route  path="/PureArListings" component={PureArListings} />   
                    <Route  path="/PureArCategory" component={PureArCategory} />   
                    <Route  path="/PureArSales" component={PureArSales} /> 
                    <Route  path="/PureArReports" component={PureArReports} /> 
                    <Route  path="/PureArListingReports" component={PureArListingReports} /> 
                      {/** */}  
                    <Route  path="/MyUsers" component={MyUsers} />   
                    <Route  path="/MySales" component={MySales} />   
                    <Route  path="/MyCategory" component={MyCat} />   
                    <Route  path="/MyListings" component={MyListings} />  
                    <Route  path="/MyReports" component={MyReports} />  
                    <Route  path="/MyListingReports" component={MyListingReports} />  
                      {/** */} 
                    <Route  path="/MiUsers" component={MiUsers} />   
                    <Route  path="/MiSales" component={MiSales} />   
                    <Route  path="/MiCategory" component={MiCategory} />   
                    <Route  path="/MiListings" component={MiListings} />  
                    <Route  path="/MiReports" component={MiReports} />  
                    <Route  path="/MiListingReports" component={MiListingReports} />  
                </div>
            </Router>
        )
    }
}

export default Routers;