import React,{Component} from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import AppUrls from '../../../service.config';
import { MDBBtn, MDBDataTable } from 'mdbreact';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import XLSX from 'xlsx';

class ScheduleDrive extends Component{
    constructor(props){
        super(props);
        this.state={
            open:false,
            panelist:[{
                name:'Pritesh',
                skill:'Java',
                id:13
            },
            {
                name:'Avdhut',
                skill:'Java',
                id:6
            },
            {
                name:'Pratik',
                skill:'UI',
                id:15
            },
            {
                name:'Nikita',
                skill:'QA',
                id:8
            }
        ],
            candidateList:[
                {
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
                },
                {
                    "Name": "Kelly",
                    "id":4,
                    "Email": "bekelly@outlook.com",
                    "PAN": "tyrb",
                    "Skill": "QA",
                    "Status": "L2"
                }
            ]
        }
    }

    componentWillMount(){
        // API call to fetch list of panelist
        axios.get(AppUrls.schema.panelist.panel).then((res)=>{
            console.log("[Panel Master data]",res.data)
            // this.setState({
            //     panelist : res.data
            // })

        }).catch((e)=>{
            console.log("[error] -- ",e);
        })
    }
    onClick = (e,c) =>{
        console.log("[select panelist] -- ",e.target.value ," candidateId == ",c);
    }

        handleClose = () => {
        this.setState({ open: false });
        };

    updateDrive = ()=>{
        let req = [

            {
                "candidateId":65,
                "driveId":63,
                "adminId":66
            },
            {
                "candidateId":64,
                "driveId":63,
                "adminId":66
            }
            
    ];
        axios.post(AppUrls.drive.mapping,req).then((res)=>{
            this.props.history.push('/home');

        }).catch((e)=>{
            console.log("[error] -- ",e);
        })
    }

    downloadExcel=()=>{

        let downArr = [
            ['Drive Id','Skill','ScheduleAt'],
            ['UI22d2018','UI','Dec-22-2018'],
            [],
            ['Name','Email','Skill','Status','Remark'],
            ['Sam','sam@gmail.com','UI','L1-R','L1 -Rejected'],
            ['Sarah','sarah@yahoo.com','UI','L1','L1 -Pending'],
            ['Nick','nick@hotmail.com','UI','PM-A','Cleared'],
            ['Kelly','bekelly@outlook.com','UI','L2','L2 -Pending']
        ];

        /* convert from array of arrays to workbook */
            let worksheet = XLSX.utils.aoa_to_sheet(downArr);
            // let obj = {
            //     "id": 63,
            //     "createdAt": 1544868083111,
            //     "scheduledAt": 1544832000000,
            //     "updatedAt": 1544868083111,
            //     "skill": {
            //         "id": 1,
            //         "skill": "Java",
            //         "hibernateLazyInitializer": {}
            //     },
            //     "candidates": null,
            //     "panel": [
            //         {
            //             "id": 60,
            //             "password": "password123",
            //             "role": "HR",
            //             "emailId": "hr1@gmail.com",
            //             "createdAt": 1544867912733,
            //             "updatedAt": 1544867912733,
            //             "skill": {
            //                 "id": 1,
            //                 "skill": "Java",
            //                 "hibernateLazyInitializer": {}
            //             },
            //             "hibernateLazyInitializer": {}
            //         }
            //     ]
            // };

            // let worksheet = XLSX.utils.json_to_sheet(obj);
            console.log("[worksheet] - ",worksheet);
            let new_workbook = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(new_workbook, worksheet, "Drive report");
            console.log("[new_workbook] - ",new_workbook);
            // var reader = new FileReader();
            // var blob = new Blob([worksheet], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
            // reader.readAsDataURL(blob);

            // reader.onloadend = function (e) {
            //     window.open(reader.result, 'Excel', 'width=20,height=10,toolbar=0,menubar=0,scrollbars=no', '_blank');
            // }

                let blob = new Blob([new_workbook],{type: "text/plain;charset=utf-8"});
                // var formattedDate =   $filter('date')(new Date(),vm.dateType.dataFormat);
                // var fileName = $filter('translate')('FOLLOWED_SUPPLIERS_LABEL')+" "+formattedDate+".xlsx";
                let fileName = "drive-report" + downArr[1][2] + ".xlsx";
                if (window.navigator && window.navigator.msSaveOrOpenBlob) {
                    window.navigator.msSaveOrOpenBlob(blob,fileName);
                }
                else {
                    /*var objectUrl = URL.createObjectURL(blob);
                     window.open(objectUrl);*/

                    let a = window.document.createElement('a');
                    a.href = URL.createObjectURL(blob);
                    a.download = fileName;
                    document.body.appendChild(a);
                    a.click();
                    document.body.removeChild(a);
                }

    }

    paneloptions = (candidateId,isDisable) =>{

        return(
            <select className="browser-default custom-select"
                    value={this.state.candidateList[0].l1}
                    disabled={isDisable}
                    onChange={(e)=>this.onClick(e,candidateId)}>
                {this.state.panelist.map((s) =>
                    <option id={s.id} key={s.id} value={s.name}>{s.name}</option>
                )}
            </select>);

    } 



    render(){
        

        const columns= [
            {
              label: '#',
              field: 'id',
              sort: 'asc'
            },
            {
              label: 'Candidate Name',
              field: 'name',
              sort: 'asc'
            },
            {
              label: 'Level 1',
              field: 'l1',
              sort: 'asc'
            },
            {
              label: 'Level 2',
              field: 'l2',
              sort: 'asc'
            },
            {
                label: 'PM round',
                field: 'pm',
                sort: 'asc'
            },
            {
                label: 'Remarks',
                field: 'status',
                sort: 'asc'
              }
          ];

          const rows_regular_btn = this.state.candidateList.map((candy)=>{
              let obj ={};
              obj.id = candy.id;
              obj.name = candy['Name'];

              switch(candy['Status']){
                case 'L1':
                obj.l1 = this.paneloptions(candy.id,false);
                obj.l2 = this.paneloptions(candy.id,true);
                obj.pm = this.paneloptions(candy.id,true);
                        break;
                case 'L2':
                obj.l1 = this.paneloptions(candy.id,true);
                obj.l2 = this.paneloptions(candy.id,false);
                obj.pm = this.paneloptions(candy.id,true);
                        break;
                case 'PM':
                obj.l1 = this.paneloptions(candy.id,true);
                obj.l2 = this.paneloptions(candy.id,true);
                obj.pm = this.paneloptions(candy.id,false);
                        break;

                default:  
                obj.l1 = this.paneloptions(candy.id,true);
                obj.l2 = this.paneloptions(candy.id,true);
                obj.pm = this.paneloptions(candy.id,true);
                        break;   
                    
                  
              }
              obj.status = candy['Status'];
           
              return obj;
          });

          const tbData = {
            columns: columns,
            rows:rows_regular_btn
          }
        
        
        return(
       

        // <MDBTable btn>
        //     <MDBTableHead columns={columns} />
        //     <MDBTableBody rows={rows_regular_btn} />
        // </MDBTable>
        <div className="mt-4">
        <MDBDataTable
            striped
            bordered
            small
            data={tbData}
        />
        <br />
        <hr />

        <MDBBtn color="warning" size="sm" onClick={()=>this.setState({open:true})}>
                Save
        </MDBBtn>

        <MDBBtn color="success" size="sm" onClick={this.downloadExcel}>
                Download report
        </MDBBtn>

        <Dialog
                open={this.state.open}
                onClose={this.handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                >
                <DialogTitle id="alert-dialog-title" onClose={this.handleClose}>{"Save Changes?"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                        Update drive information.
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                        Cancel
                        </Button>
                        <Button onClick={this.updateDrive} color="primary" autoFocus>
                        Proceed
                        </Button>
                    </DialogActions>
            </Dialog>

        </div>
        
        )
    }
}

export default withRouter(ScheduleDrive);