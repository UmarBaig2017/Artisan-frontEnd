import React, { Component } from 'react'
import './admin.css'
import { css } from '@emotion/core';
import { Link } from 'react-router-dom';
import firebase from "firebase"
import { ClipLoader ,CircleLoader } from 'react-spinners';
import { Table } from 'reactstrap';
export default class Dashboard extends Component {
  constructor(props) {
    super(props)

    this.state = {
      loading1: true,
      loading2: true,
      loading3: true,
      loading4: true,
      loading: true,
      adminName: "",
      SubEmail: "",
      subPasswrd: "",
      admins: [],
      LoginName: "",
      modal: false,
    
      users: 0,
      categories: 0,
      listings: 0,
      sales: 0,

    }

    this.handleDeleteSubAdmin = this.handleDeleteSubAdmin.bind(this)
    this.FetchAdmins = this.FetchAdmins.bind(this)
    this.toggle = this.toggle.bind(this);
    // this.fetchAdminPass = this.fetchAdminPass.bind(this);
  }
  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }

  handleChnage(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleAdminSubmit(e) {
    e.preventDefault()
    const auth = firebase.auth();
    let promise = auth.createUserWithEmailAndPassword(this.state.SubEmail, this.state.subPasswrd)
    .then(credential => {
     
      let email = this.state.SubEmail
      let em = email.replace('.com', '')
      let db = firebase.database();

      db.ref("Admins").child(credential.user.uid)
        .set({ "Admin": this.state.SubEmail, "password": this.state.subPasswrd, "Name": this.state.adminName , uid: credential.user.uid })
        .then(e => {
         alert("Admin Created")
         this.setState({
          adminName: "",
          SubEmail: "",
          subPasswrd: ""
         })
          this.FetchAdmins()
        });


    })
    promise.catch(e => {
      alert("admin not created , Try again")
    })
  }

  componentDidMount() {

   var user = JSON.parse(localStorage.getItem('user'));
    let loginperson = user.Name
    let islogin = user.login

    if (islogin === 1) {
      this.setState({
        LoginName: loginperson
      })
      // this.fetchAdminPass()
      this.FetchAdmins()
      this.Getusers()
      this.GetCat()
      this.GetList()
      this.GetSales()

    }
    else {
      alert("User Must Login First")
      this.props.history.push("/")
    }

  }
   async Getusers(){
   
      const response = await fetch("https://artisanbackend.herokuapp.com/api/allUsers",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json"
          }
        });
      const json = await response.json();
     let u = json.length
  
    this.setState({
      users : u,
      loading4: false
    })
    }
  
   async GetSales(){
   
      const response = await fetch("https://artisanbackend.herokuapp.com/api/AllSales",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json"
          }
        });
      const json = await response.json();
     let u = json.length
 
    this.setState({
    
    sales: u,
    loading1 : false

    })
    }
  
   async GetCat(){
   
      const response = await fetch("https://artisanbackend.herokuapp.com/api/AllCatigories",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json"
          }
        });
      const json = await response.json();
     let u = json.length

    this.setState({
     categories: u,
     loading2: false
    })
    }
   async GetList(){
   
      const response = await fetch("https://artisanbackend.herokuapp.com/api/AllListings",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json"
          }
        });
      const json = await response.json();
     let u = json.length
  
    this.setState({
     listings: u,
     loading3: false

    })
    }
  
  
  // fetchAdminPass(){
  //   let firebaseRef = firebase.database().ref().child("AdminPass");
  //   firebaseRef.once("value", snap=>{
  //     let password  = snap.val()
  //    let pass=password.Password
  //    this.setState({
  //     firebasePassword : pass
  //    })
  //   })
  // }

  FetchAdmins() {
    this.setState({
      loading: true
    })
    let arr = [];
    let firebaseRef = firebase.database().ref("Admins");
    firebaseRef.once("value", snap => {
      snap.forEach(Key => {
        let dataRef = firebaseRef.child(Key.ref.key).key;

        let data = snap.child(dataRef).val();

        arr.push(data)
        if(arr.length>0){
          this.setState({
            loading: false,
              admins: arr

          })
        }
        else{
          this.setState({
            loading:false
          })
        }
        
      });
    })
  }
  handleLogout() {
    let user = {
      Name: "",
      login: 0
    }
    localStorage.setItem('user', JSON.stringify(user));
    this.props.history.push("/")
  }
  handleDeleteSubAdmin(e,uid) {
 
    let data ={
     uid : uid
    }
    fetch("https://artisanbackend.herokuapp.com/api/deleteAdminOrUSer",
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(data)
        }).then(res => res.json())
        .then((data)=> {
       
          var firebaseRef = firebase.database().ref('Admins');
        firebaseRef.child(uid).remove().then(()=>{
         this.FetchAdmins()
    })

  
          alert("Sub Admin Deleted")
  
        }).catch(err => console.error(err))
    
   
  }
  handleChange(e) {
    this.setState({
      VerifyPassword: e.target.value
    })
  }
  render() {
    const style = {
      "margin": "auto",
      
      "width": "50%",
    }
     
const override = css`
display: block;
margin: 0 auto;
border-color: red;
`;
    return (
      <div>
        {/* navigation */}
        <nav className="navbar navbar-expand-md bg-dark navbar-dark">
          <div className="container-fluid">
           <h3 style={{"color": "white"}}><b>Admin Panel</b></h3>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="collapsibleNavbar">
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
            
                </li>
                <li className="nav-item dropdown">
                  <a className="nav-link dropdown-toggle"  id="navbardrop" data-toggle="dropdown">
                    {this.state.LoginName}
                  </a>
                  <div className="dropdown-menu">

                  <button onClick={this.handleLogout.bind(this)} className="dropdown-item" > <i className="fas fa-sign-out-alt"></i> Logout</button>

                  </div>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        <br />
       
        <div className="container-fluid row">
        <div style={{"paddingBottom": 50}} className="col-md-3 ">
        <ul className="navbar-nav">
        <li className="nav-item">
          <Link to="/Dashboard"><li className="list-group-item bg-light"><i className="fa fa-tachometer"></i> <b> Dashboard </b></li></Link>
        </li>
        <li className="nav-item">
          <a href="#new1" data-toggle="collapse">
            <li className="list-group-item bg-light "><i className="fa fa-list" aria-hidden="true"></i> <b> My Consignment </b>  <i style={{"float": "right"}}  className="fas fa-sort-down"></i> </li></a>
          <ul className="collapse"  id="new1" style={{ "listStyle": "none" ,  "fontFamily" :"Comic Sans MS" ,"backgroundColor" : "white" , "color" : "black"  }}>
            <Link to="/MyUsers" className="nav-item">
              <li className=" bg-light">
                <div className="col-md-1"></div> <i className="fa fa-users" aria-hidden="true"></i> User Details
          </li>
            </Link>


            <Link to="/MySales" className="nav-item">
              <li className=" bg-light">
                <div className="col-md-1"></div> <i className="fa fa-credit-card-alt" aria-hidden="true"></i> Sale Details
          </li>
            </Link>
            <Link to="/MyListings" className="nav-item">
              <li className=" bg-light">
                <div className="col-md-1"></div> <i className="fa fa-list-ol" aria-hidden="true"></i> Listing
      </li>
            </Link>
            <Link to="/MyCategory" className="nav-item">
              <li className=" bg-light">
                <div className="col-md-1"></div> <i className="fa fa-folder" aria-hidden="true"></i> Categories
  </li>
            </Link>
            <Link to="/MyReports" className="nav-item">
            <li className=" bg-light">
              <div className="col-md-1"></div> <i className="fa fa-bug" aria-hidden="true"></i> Reports
</li>
          </Link>
          <Link to="/MyListingReports" className="nav-item">
            <li className=" bg-light">
              <div className="col-md-1"></div> <i className="fas fa-flag" aria-hidden="true"></i> Listing Reports
</li>
          </Link>

          </ul>
        </li>
        <li className="nav-item">
          <a href="#new2" data-toggle="collapse">
            <li className="list-group-item bg-light "><i className="fa fa-list" aria-hidden="true"></i> <b> Mi Consignacion </b> <i style={{"float": "right"}}  className="fas fa-sort-down"></i> </li></a>
          <ul className="collapse" id="new2" style={{ "list-style": "none" ,  "fontFamily" :"Comic Sans MS" ,"backgroundColor" : "white" , "color" : "black"  }}>
            <Link to="/MiUsers" className="nav-item">
              <li className=" bg-light">
                <div className="col-md-1"></div> <i className="fa fa-users" aria-hidden="true"></i> Detalles de usuario
          </li>
            </Link>


            <Link to="/MiSales" className="nav-item">
              <li className=" bg-light">
                <div className="col-md-1"></div> <i className="fa fa-credit-card-alt" aria-hidden="true"></i>  Detalles de venta
          </li>
            </Link>
            <Link to="/MiListings" className="nav-item">
              <li className=" bg-light">
                <div className="col-md-1"></div> <i className="fa fa-list-ol" aria-hidden="true"></i> Listado
      </li>
            </Link>
            <Link to="/MiCategory" className="nav-item">
              <li className=" bg-light">
                <div className="col-md-1"></div> <i className="fa fa-folder" aria-hidden="true"></i> Las categorías
  </li>
            </Link>
            <Link to="/MiReports" className="nav-item">
            <li className=" bg-light">
              <div className="col-md-1"></div> <i className="fa fa-bug" aria-hidden="true"></i> Informes
</li>
          </Link>
          <Link to="/MiListingReports" className="nav-item">
            <li className=" bg-light">
              <div className="col-md-1"></div> <i className="fas fa-flag" aria-hidden="true"></i>  Listado de informes
      </li>
          </Link>

          </ul>
        </li>
        <li className="nav-item">
          <a href="#new3" data-toggle="collapse">
            <li className="list-group-item bg-light "><i className="fa fa-list" aria-hidden="true"></i> <b> Pure Artisan</b> <i style={{"float": "right"}}  className="fas fa-sort-down"></i> </li></a>
          <ul className="collapse" id="new3" style={{ "list-style": "none" ,  "fontFamily" :"Comic Sans MS" ,"backgroundColor" : "white" , "color" : "black"  }}>
            <Link to="/PureUsers" className="nav-item">
              <li className=" bg-light">
                <div className="col-md-1"></div> <i className="fa fa-users" aria-hidden="true"></i> User Details
          </li>
            </Link>


            <Link to="/PureSales" className="nav-item">
              <li className=" bg-light">
                <div className="col-md-1"></div> <i className="fa fa-credit-card-alt" aria-hidden="true"></i> Sale Details
          </li>
            </Link>
            <Link to="/PureListings" className="nav-item">
              <li className=" bg-light">
                <div className="col-md-1"></div> <i className="fa fa-list-ol" aria-hidden="true"></i> Listing
      </li>
            </Link>
            <Link to="/PureCategory" className="nav-item">
              <li className=" bg-light">
                <div className="col-md-1"></div> <i className="fa fa-folder" aria-hidden="true"></i> Categories
  </li>
            </Link>
            <Link to="/PureReports" className="nav-item">
            <li className=" bg-light">
              <div className="col-md-1"></div> <i className="fa fa-bug" aria-hidden="true"></i> Reports
</li>
          </Link>
          <Link to="/PureListingReports" className="nav-item">
            <li className=" bg-light">
              <div className="col-md-1"></div> <i className="fas fa-flag" aria-hidden="true"></i> Listing Reports
</li>
          </Link>

          </ul>
        </li>
        <li className="nav-item">
          <a href="#new4" data-toggle="collapse">
            <li className="list-group-item bg-light "><i className="fa fa-list" aria-hidden="true"></i> <b> Puro Artesanal </b> <i style={{"float": "right"}}  className="fas fa-sort-down"></i> </li> </a>
          <ul className="collapse" id="new4" style={{ "list-style": "none" ,  "fontFamily" :"Comic Sans MS" ,"backgroundColor" : "white" , "color" : "black"  }}>
            <Link to="/PureArUsers" className="nav-item">
              <li  className=" bg-light">
                <div className="col-md-1"></div> <i className="fa fa-users" aria-hidden="true"></i> Detalles de usuario
          </li>

            </Link>


            <Link to="/PureArSales" className="nav-item">
              <li className=" bg-light">
                <div className="col-md-1"></div> <i className="fa fa-credit-card-alt" aria-hidden="true"></i> Detalles de venta
          </li>
            </Link>
            <Link to="/PureArListings" className="nav-item">
              <li className=" bg-light">
                <div className="col-md-1"></div> <i className="fa fa-list-ol" aria-hidden="true"></i> Listado
      </li>
            </Link>
            <Link to="/PureArCategory" className="nav-item">
              <li className=" bg-light">
                <div className="col-md-1"></div> <i className="fa fa-folder" aria-hidden="true"></i> Las categorías
  </li>
            </Link>
            <Link to="/PureArReports" className="nav-item">
            <li className=" bg-light">
              <div className="col-md-1"></div> <i className="fa fa-bug" aria-hidden="true"></i> Informes
</li>
          </Link>
          <Link to="/PureArListingReports" className="nav-item">
            <li className=" bg-light">
              <div className="col-md-1"></div> <i className="fas fa-flag" aria-hidden="true"></i> Listado de Informes
</li>
          </Link>

          </ul>
        </li>

      </ul> </div>
          <br />

          <div className="col-md-9">
            <div className="row">
              <div className="col-md-3">
                <div className="card">
                  <div className="card-header bg-warning">
                    <div className="row">
                      <div className="col-md-3">
                        <i className="fa fa-signal" aria-hidden="true" style={{ "fontSize": "4.5em", "color": "blue" }}></i>
                      </div>
                      <div className="col-md-9" style={{ "color": "blue" }}>
                        <div className="text-right" style={{ "fontSize": "2.5em" }}>
                        <ClipLoader
                        css={override}
                        sizeUnit={"px"}
                        size={30}
                        color={'blue'}
                        loading={this.state.loading1}
                      />
                        
                        { this.state.loading1===false && this.state.sales}</div>
                        <div className="text-right"> Sales </div>
                      </div>
                    </div>
                  </div>
                  <div className="card-footer ">
                    <Link to="PureSales" >
                      <div className="row">
                        <div className="col-md-10"> View Sales </div>
                        <div className="col-md-2"><i className="fa fa-arrow-circle-o-right" aria-hidden="true"></i> </div>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>

              <div className="col-md-3">
                <div className="card">
                  <div className="card-header bg-success">
                    <div className="row">
                      <div className="col-md-3">
                        <i className="fa fa-list" aria-hidden="true" style={{ "fontSize": "4.5em", "color": "white" }}></i>
                      </div>
                      <div className="col-md-9" style={{ "color": "white" }}>
                        <div className="text-right" style={{ "fontSize": "2.5em" }}>  <ClipLoader
                        css={override}
                        sizeUnit={"px"}
                        size={30}
                        color={'#B91313'}
                        loading={this.state.loading2}
                      />
                      {this.state.loading2===false && this.state.categories}</div>
                        <div className="text-right">Categories</div>
                      </div>
                    </div>
                  </div>
                  <div className="card-footer ">
                    <Link to="/PureCategory">
                      <div className="row">
                        <div className="col-md-10"> View Categories</div>
                        <div className="col-md-2"><i className="fa fa-arrow-circle-o-right" aria-hidden="true"></i> </div>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>

              <div className="col-md-3">
                <div className="card">
                  <div className="card-header bg-primary">
                    <div className="row">
                      <div className="col-md-3">
                        <i className="fa fa-eye" aria-hidden="true" style={{ "fontSize": "4.5em", "color": "yellow" }}></i>
                      </div>
                      <div className="col-md-9" style={{ "color": "yellow" }}>
                        <div className="text-right" style={{ "fontSize": "2.5em" }}>
                        <ClipLoader
                        css={override}
                        sizeUnit={"px"}
                        size={30}
                        color={'#B91313'}
                        loading={this.state.loading3}
                      />
                        
                        {this.state.loading3===false && this.state.listings}</div>
                        <div className="text-right">Listings</div>
                      </div>
                    </div>
                  </div>
                  <div className="card-footer ">
                    <Link to="/PureListings">
                      <div className="row">
                        <div className="col-md-10">View Listings</div>
                        <div className="col-md-2"><i className="fa fa-arrow-circle-o-right" aria-hidden="true"></i> </div>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>

              <div className="col-md-3">
                <div className="card">
                  <div className="card-header bg-info">
                    <div className="row">
                      <div className="col-md-3">
                        <i className="fa fa-users" aria-hidden="true" style={{ "fontSize": "4.5em", "color": "red" }}></i>
                      </div>
                      <div className="col-md-9" style={{ "color": "red" }}>
                        <div className="text-right" style={{ "fontSize": "2.5em" }}>
                        <ClipLoader
                        css={override}
                        sizeUnit={"px"}
                        size={30}
                        color={'#B91313'}
                        loading={this.state.loading4}
                      />
                        {this.state.loading4===false && this.state.users}</div>
                        <div className="text-right">Users</div>
                      </div>
                    </div>
                  </div>
                  <div className="card-footer ">
                    <Link to="/PureUsers">
                      <div className="row">
                        <div className="col-md-10"> View Users</div>
                        <div className="col-md-2"><i className="fa fa-arrow-circle-o-right" aria-hidden="true"></i> </div>
                      </div>

                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/*Comnt star */}
            <div className="container">
              <div className="row" style={{ "marginTop": "30px" }}>
                <div className="col-md-7">
                  <div  className="row" className="card">
                    <div className="card-header">
                      <h5>Sub Admins</h5>
                    </div> <div style={{"overflow": "scroll", "height": 300}}>
                    {this.state.loading===true &&
                      <div className='sweet-loading'>
                        <CircleLoader
                          css={style}
                          sizeUnit={"px"}
                          size={100}
                          color={'#2fbb9f'}
                          loading={this.state.loading}
                        />
                      </div>}
                    <div className="card-body">
                      <div   >
                      

                      { this.state.loading===false &&<Table className="table">
                      <thead>
                        <tr>
                          
                          <th>Name</th>
                          <th>Email</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody >
                     
                      { this.state.admins  && this.state.admins.map((item, index) => {
                        return (
                          <tr key={index}>
                             <td> {item.Name}</td>
                            <td>{item.Admin}</td>
                            <butoon className="btn btn-danger" onClick={() => { this.handleDeleteSubAdmin(index,item.uid) }} style={{ "margin": 10 }}> Delete </butoon>
                          </tr>
                        )
                      })}
                        
                      </tbody>
                    </Table>}

                      </div>
                    </div>
                    </div>

                  </div>
                </div>
                <div className="col-md-5">
                  <form className="card">
                    <div className="card-header text-center">
                      <h4>Registered Sub Admin</h4>
                    </div>
                    <div className="card-body">
                      <div className="form-group">
                        <div className="row">
                          <label className="control-label col-md-4">Name</label>
                          <div className="col-md-8">
                            <input type="text" name="adminName"
                              value={this.state.adminName} onChange={this.handleChnage.bind(this)} className="form-control" placeholder="Enter Name" />
                            <br />
                          </div>
                        </div>
                        <div className="row">
                          <label className="control-label col-md-4">Email</label>
                          <div className="col-md-8">
                            <input type="email" name="SubEmail"

                              value={this.state.SubEmail} onChange={this.handleChnage.bind(this)} className="form-control" placeholder="Enter Email" />
                            <br />
                          </div>
                        </div>
                        <div className="form-group">
                          <div className="row">

                          </div>
                          <div className="form-group">
                            <div className="row">
                              <label className="control-label col-md-4">Password</label>
                              <div className="col-md-8">
                                <input type="password" onChange={this.handleChnage.bind(this)}
                                  name="subPasswrd"
                                  value={this.state.subPasswrd} className="form-control" placeholder="Password" />
                              </div>
                            </div>
                          </div>

                        </div>
                        <div className="row">
                          <div className="col-md-12">
                            <button className="btn btn-danger btn-block " onClick={this.handleAdminSubmit.bind(this)}>Registered Admin</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
           
            {/*Comnt end */}

           
          </div>
        </div>
        </div>
      </div>
      </div>
    )
  }
}
