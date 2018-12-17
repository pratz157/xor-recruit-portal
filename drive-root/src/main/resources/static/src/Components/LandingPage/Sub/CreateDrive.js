import React, { Component } from "react";
import { withRouter } from 'react-router-dom';
import FileUpload from "../../FileUpload/FileUpload";
import {MDBContainer,MDBRow,MDBCol,MDBAlert,Modal,ModalBody} from 'mdbreact';
import XLSX from 'xlsx';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import EnhancedTable from '../../Forms/CustomTable';
import axios from 'axios';
import AppUrls from '../../../service.config';
import Tooltip from '@material-ui/core/Tooltip';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';



// const rows = [
//     { id: 'name', numeric: false, disablePadding: true, label: 'Dessert (100g serving)' },
//     { id: 'calories', numeric: true, disablePadding: false, label: 'Calories' },
//     { id: 'fat', numeric: true, disablePadding: false, label: 'Fat (g)' },
//     { id: 'carbs', numeric: true, disablePadding: false, label: 'Carbs (g)' },
//     { id: 'protein', numeric: true, disablePadding: false, label: 'Protein (g)' },
//   ];


class CreateDrive extends Component {

    constructor(props){
        super(props);
        this.state={
            // candidateList:[],
            startDate:new Date(),
            candidateData:{
                tBody:[],
                tHead:[]
            },
            selectedCandidates : [],
            panelData:{
                tBody:[],
                tHead:[]
            },
            loading:false,
            fileError:false,
            // skillMatrix : [],
            skill:'',
            // skills:{
            //     id:'',
            //     skill:''
            // },
            open: false,

        }
        this.handleChange = this.handleChange.bind(this);

    }

    componentWillMount(){
        // axios.get(AppUrls.schema.panelist.skills).then((res)=>{
        //     console.log("[skillset] -- ",res.data);
        //     let fType =this.props.location.search;
        //     console.log("%% -- ",fType.slice(1));
        
        //     this.setState({
        //         skillMatrix:res.data,
        //         skill: fType.slice(1)
        //     })
        // }).catch((error)=>{
        //     console.log(error);
        // });

        let fType =this.props.location.search;
            console.log("%% -- ",fType.slice(1));
        
            this.setState({
                // skillMatrix:res.data,
                skill: fType.slice(1)
            })
    }

    // componentDidMount(){
    //     let fType =this.props.location.search;
    //     console.log("%% -- ",fType.slice(1));
    //     this.setState({
    //         skill: fType.slice(1)
    //     });
    // }

    handleChange(date) {
        this.setState({
          startDate: date
        });
      }

    convertToTabelData = (arr) =>{
        let keyArr = arr[0];
        let tableArray = [];
        let tableHeaderArr = [];

        arr.forEach((rowArr,rIndex)=>{
            let tResult ={};
            if(rIndex !== 0){
                rowArr.forEach((tElem,index)=>{
                    
                    tResult[keyArr[index]] = tElem;
                    tResult['id'] = rIndex;
                    
                })
                // console.log("tResult",tResult);
                tableArray.push(tResult);
            }
            else{
                rowArr.forEach((tElem,index)=>{
                    const td={
                        // id:index+"__"+tElem,
                        // label:tElem
                        id:tElem
                    };
                    
                    tableHeaderArr.push(td);
                })
                
            }
            
            // return tResult
        })
        // console.log("tableHeaderArr.push(tResult) -- ",tableHeaderArr);

        return {tBody:tableArray, tHead:tableHeaderArr};
    }

    handleFiles = (e,table) =>{

        console.log("[f] -- ", e.target.files);
        let self =this;

        // if(table === 'candidate' ){
        //     self.setState({
        //         candidateData: []
        //     })
        // }
        // else{
        //     self.setState({
        //         panelData: []
        //     })
        // }

        let result = [];
        let rABS = true;
        let files = e.target.files, f = files[0];
        let fileType = f.name.split('.').pop();
        if(fileType === 'xlsx' || fileType === 'xls'){

            self.setState({
                // candidateList :result,
                candidateData: {
                    tBody:[],
                    tHead:[]
                } 
            })

            let reader = new FileReader();
            reader.onload = function(e) {
                let data = e.target.result;
                if(!rABS) data = new Uint8Array(data);
                let workbook = XLSX.read(data, {type: rABS ? 'binary' : 'array'});

                /* DO SOMETHING WITH workbook HERE */
                let first_worksheet = workbook.Sheets[workbook.SheetNames[0]];
                result = XLSX.utils.sheet_to_json(first_worksheet, {header:1});

                //transform result to table Data
                console.log("[TableMatrix] --",self.convertToTabelData(result) );

                // let table = XLSX.utils.sheet_to_html (first_worksheet);
                // console.log("[HT] -- ",table);

                if(table === 'candidate' ){
                    self.setState({
                        // candidateList :result,
                        candidateData: self.convertToTabelData(result) 
                    })
                }
                else{
                    self.setState({
                        // candidateList :result,
                        panelData: self.convertToTabelData(result) 
                    })
                }
                
            };
            if(rABS) reader.readAsBinaryString(f); else reader.readAsArrayBuffer(f);
        }
        else{
            console.log('[File format not supported!!!! ] ');
            this.setState({fileError:true})
        }
            
       
        // let result = XLSX.utils.sheet_to_json(e.target.files[0], {header:1});

        // const result = transformExcel({
        //     sourceFile: e.target.files[0]
        // });
        // console.log("[res] -- ",result);
    }

    getTableData= (e)=>{
        // console.log("[Drive data] -- ",e) ;
        this.setState({
            selectedCandidates:e,
            open: !this.state.open
        });
    }

    onClick = (e) => {
        // console.log("[ski ] -- ",e.target.value);
        this.setState({
            skill: e.target.value
        });
    }

    handleClickOpen = () => {
        this.setState({ open: true });
      };
    
    handleClose = () => {
    this.setState({ open: false });
    };
    
    scheduleDrive = () =>{
        console.log("[Preparing to Schedule Drive]");
        let dd = this.state.startDate.getDate();
        let mm = this.state.startDate.getMonth()+1; 
        let yyyy = this.state.startDate.getFullYear();
        // if(dd<10) 
        // {
        //     dd='0'+dd;
        // } 

        // if(mm<10) 
        // {
        //     mm='0'+mm;
        // } 
        let driveData={
            scheduledAt:mm+'-'+dd+'-'+yyyy,
            skill: this.state.skill,
            candidates:this.state.selectedCandidates
        }
        this.setState({loading:true,open: false});

        console.log("[scheduleDrive request] -- ",driveData);
        axios.post(AppUrls.drive.create,driveData).then((res)=>{
            this.setState({loading:false});
            this.props.history.push('/drive-candidate-list/1234');
        }).catch((error)=>{
            this.setState({loading:false,open: true});
                console.log(error);
            });

    }


    render(){
        const promptMsg = "You are scheduling " + this.state.skill + " drive on "+this.state.startDate.toDateString()+" with "+ this.state.selectedCandidates.length + " candidates. Do you want proceed?";
        // const promptMsg = <p>You are scheduling  {this.state.skill} drive on {this.state.startDate}  with {this.state.selectedCandidates.length} candidates. Do you want proceed?</p>;
        // console.log(promptMsg);
        return(
        <div>
                                <Modal isOpen={this.state.loading} centered>
                                    <ModalBody>
                                    <div className="loader medium centered"></div>
                                    </ModalBody>
                                    {/* <i class="fa fa-spinner fa-pulse fa-spin spinner"></i> */}
                                     {/* <div className="loader medium"></div> */}
                                </Modal>
            <MDBContainer className="mt-5">
                <MDBRow>
                    <MDBCol size="5"> <span>Drive date </span></MDBCol>
                    <MDBCol size="7">
                        <DatePicker
                        selected={this.state.startDate}
                        onChange={this.handleChange}
                        minDate={new Date()}
                        dateFormat="MMM dd YYYY"
                        customInput={<ExampleCustomInput />}
                        // inline
                        // maxDate={addMonths(new Date(), 5)}
                        showDisabledMonthNavigation />   
                    </MDBCol> 
                </MDBRow>
                <MDBRow className="mt-2">
                    <MDBCol size="3" middle>
                        <span>Drive for </span>
                    </MDBCol>
                    <MDBCol size="9">
                        <select className="browser-default custom-select"  value={this.state.skill} onChange={(e)=>this.onClick(e)}>
                            {this.props.skillMatrix.map(s =>
                                <option id={s.id} key={s.id} value={s.skill}>{s.skill}</option>
                            )}
                        </select>
                    </MDBCol>
                </MDBRow>
                    
                    {this.state.fileError ? <MDBAlert color="danger" dismiss onClosed={()=> this.setState({fileError:false})}>
                        Please upload file with .xlsx or .xls format
                    </MDBAlert> : null}
                <MDBRow>
                    
                    <MDBCol size="3" middle>
                        <Tooltip title="Upload candidate list in Excel format">
                            <span> Add Candidates</span> 
                        </Tooltip>   
                    </MDBCol>   
                    <MDBCol size="9">
                        <FileUpload handleUpload={(e)=>this.handleFiles(e,'candidate')}/>
                    </MDBCol>
                </MDBRow>
                {this.state.candidateData.tBody.length > 0 ?  
                    <EnhancedTable title="List of Candidates"
                                    tHead={this.state.candidateData.tHead}
                                    tableData={this.state.candidateData.tBody}
                                    setTData={this.getTableData}
                                    /> : null }
                
                {/* <MDBRow>
                    <MDBCol size="3" middle><span> Add Panel</span></MDBCol>
                    <MDBCol size="9">
                        <FileUpload handleUpload={(e)=>this.handleFiles(e,'panel')}/>
                    </MDBCol>
                </MDBRow>
                {this.state.panelData.tBody.length > 0?  <EnhancedTable title="Panelist" tHead={this.state.panelData.tHead} tableData={this.state.panelData.tBody} setTData={this.getTableData}/> : null } */}
                 
            </MDBContainer>
               
             {/* (You are scheduling <b> {this.state.skill} </b> drive on {this.state.startDate}  with {this.state.selectedCandidates.length} candidates. Do you want proceed?) */}

                     {/* <Route path="/drive-candidate-list/:driveId" exact 
                        render={()=>(<Suspense fallback={<div>Loading....!!!</div>}>
                        <ScheduleDrive />
                        </Suspense>)} /> */}
            <Dialog
                open={this.state.open}
                onClose={this.handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                >
                <DialogTitle id="alert-dialog-title" onClose={this.handleClose}>{"Schedule Drive?"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                        {promptMsg}
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                        Cancel
                        </Button>
                        <Button onClick={this.scheduleDrive} color="primary" autoFocus>
                        Proceed
                        </Button>
                    </DialogActions>
            </Dialog>

            {/* <div className="table-responsive text-nowrap table-wrapper-scroll-y">
                
                <table className="table">

                    {
                        this.state.candidateList.map((arr,index)=>{
                            let tb = "";
                            if(index === 0){
                                tb = (<thead key={index}><tr >
                                    {
                                        arr.map((t,thIndex)=><th key={thIndex} scope="col">{t}</th>)
                                    }
                                    </tr></thead>)
                            }
                            else{
                                tb = (<tr key={index}>{
                                    arr.map((td,tdIndex)=><td key={tdIndex}>{td}</td>)
                                }
                                  </tr>  
                                );
                            }
                            return tb
                        })
                    }

                    
                </table>

            </div> */}
            {/* <EnhancedTable title="List of Candidates" tHead={this.state.candidateData.tHead} tableData={this.state.candidateData.tBody}/> */}
        </div>
        )
    }
}

class ExampleCustomInput extends React.Component {

    render () {
      return (
        <button
          className="example-custom-input"
          onClick={this.props.onClick}>
          {this.props.value}
        </button>
      )
    }
  }
  

export default withRouter(CreateDrive);