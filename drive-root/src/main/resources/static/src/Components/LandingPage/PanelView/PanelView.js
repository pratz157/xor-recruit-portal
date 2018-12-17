import React,{Component} from 'react';
import { Route,withRouter,Link } from 'react-router-dom';

import axios from 'axios';
import AppUrls from '../../../service.config';
import { MDBCard, MDBCardBody, MDBListGroup, MDBListGroupItem, MDBContainer, MDBBadge } from "mdbreact";


class PanelView extends Component{

    constructor(props){
        super(props);
        this.state={
            candidateList:[{
                "Name": "Sam",
                "id":1,
                "Email": "sam@gmail.com",
                "PAN": "crtt",
                "Skill": "UI",
                "Status": "LO"
            },
            {
                "Name": "Sarah",
                "id":2,
                "Email": "sarah@yahoo.com",
                "PAN": "rrtt",
                "Skill": "Java",
                "Status": "L1"
            },
            {
                "Name": "Nick",
                "id":3,
                "Email": "nick@hotmail.com",
                "PAN": "qqae",
                "Skill": "DevOp",
                "Status": "PM"
            }]
        }
    }

    componentWillMount(){
        // axios.get(AppUrls.panel.getCandiates).then((res)=>{
        //     console.log(res.data);
        // }).catch((err)=>{
        //     console.log("[ERROR] -- ",err);
        // })
    }

    render(){
        return(
            <div>

                <MDBContainer>

                    <MDBCard className="my-5 px-5 pb-5">
                        <MDBCardBody>
                            {/* <h2 className="h1-responsive font-weight-bold text-center my-5">
                            Recent posts
                            </h2> */}
                            <p className="text-center w-responsive mx-auto mb-5">
                            Hello Xorianter!! Following candidates are to be interviewed by you .
                            </p>
                        </MDBCardBody>
                        {/* style={{ width: "22rem" }} */}
                <MDBListGroup >
                    {
                        this.state.candidateList.map((candy)=>{
                            let clink= "/view-candidate/"+candy.id+'?panel';
                            return(
                                <MDBListGroupItem key={candy.id} className="d-flex justify-content-between align-items-center">
                                   <Link to={clink}>
                                    {candy['Name']}{'   '}
                                        <MDBBadge color="primary"
                                        pill>{candy['Status']}
                                        </MDBBadge>
                                    </Link>
                                </MDBListGroupItem>
                            )
                        })
                    }
                    {/* <MDBListGroupItem className="d-flex justify-content-between align-items-center">Cras justo odio<MDBBadge color="primary"
                        pill>14</MDBBadge>
                    </MDBListGroupItem>
                    <MDBListGroupItem className="d-flex justify-content-between align-items-center">Dapibus ac facilisis in<MDBBadge
                        color="primary" pill>2</MDBBadge>
                    </MDBListGroupItem>
                    <MDBListGroupItem className="d-flex justify-content-between align-items-center">Morbi leo risus<MDBBadge color="primary"
                        pill>1</MDBBadge>
                    </MDBListGroupItem> */}
                </MDBListGroup>
                </MDBCard>
                </MDBContainer>

            </div>
        )
    }
}

export default PanelView;