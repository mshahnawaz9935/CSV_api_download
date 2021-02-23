import React, { Component } from 'react';
import DataGrid, { Pager, Paging } from 'devextreme-react/data-grid';
import { Card  } from 'react-bootstrap';
import {CSVLink} from 'react-csv';
import * as csv from 'csvtojson';

var titleStyle= {
    height: '41px',   fontSize: '30px',    fontWeight: '700',
    fontStyle: 'normal',    fontStretch: 'normal',    lineHeight: 'normal',
    letterSpacing: '1.5px',    color:'#0055a5',
};

const RenderRow = (props) =>{
    return props.keys.map((key, index)=>{
      return <td key={props.data[key]}>{props.data[key]}</td>
    })
}

const csvData =[
    ['firstname', 'lastname', 'email'] ,
    ['John', 'Doe' , 'john.doe@xyz.com'] ,
    ['Jane', 'Doe' , 'jane.doe@xyz.com']
  ];
   
class AccountsContainer extends Component {

    state = { 
        users: [], lines : [],  titleCard : 'Accounts API',
       showCsvData: false,  merge : false
    }

    constructor(props) {
     
        super(props);
        this.merge= this.merge.bind(this);
        this.reset= this.reset.bind(this);
    }

    componentDidMount() {
        //  GET request using fetch
        fetch('/data')
            .then(response =>  { 
            
                if(response.status == 200)
                    return response.json();         
                else  throw new Error(response.status);
             })
            .then(data => {
                console.log(data);
                  if(data!=null)
                  this.setState({ apiData : data.results  })
            })
             .catch((error) => {
                  this.setState({ errors : error + ' Error Occured from API ' })
            })
    }

    handleFiles = (files) => {

        // Check for the various File API support.
        if (window.FileReader) {
            // FileReader are supported.
            this.getAsText(files[0]);
        }
    }

    getAsText(fileToRead) {
        var reader = new FileReader();
        // Read file into memory as UTF-8   
        
        fileToRead = document.querySelector('input').files[0];
        reader.readAsText(fileToRead);
 
        // Handle errors load
        reader.onload = this.fileReadingFinished.bind(this);
       
        reader.onerror = this.errorHandler;
    }

    fileReadingFinished(event) {
        var csvData = event.target.result;
        console.log(csvData);
        this.convertCSVToJson(csvData); 
    }

    convertCSVToJson(csvData) {
        csv()
        .fromString(csvData)
        .then((jsonObj)=>{
            console.log(jsonObj);
            this.setState({users : jsonObj ,  showCsvData: !!jsonObj});
        });
    }

    errorHandler(event) {
        if (event.target.error.name === "NotReadableError") {
            alert("Cannot read file!");
        }
    }

    renderTableHeader() {
        let header = Object.keys(this.state.users[0])
        return header.map((key, index) => {
           return <th key={index}>{key.toUpperCase()}</th>
        })
     }

    renderTableData() {
   
        let headers = Object.keys(this.state.users[0]);
        return this.state.users.map((row, index) => {
           return <tr key={index}><RenderRow key={index} data={row} keys={headers}/></tr>
         })
      }

      reset()
      {
        this.setState({ users: [], lines : [], titleCard : 'Accounts API',
            showCsvData: false, merge : false });
            this.componentDidMount();
            alert('File Downloading');
            document.getElementById('fileContainer').value='';

      }

      merge()
      {
          if (this.state.showCsvData) {
            console.log(this.state.users , this.state.apiData);
            const csvData1 =  [...this.state.users];
         
            for(var i= 0 ; i < csvData1.length ; i++)
            {
                var account = csvData1[i];
                for(var j=0;j < this.state.apiData.length;j++)
                {
                    if(account["Account ID"] == this.state.apiData[j].account_id)
                    {
                        let clone = Object.assign({}, account);
                         clone.status = this.state.apiData[j].status;
                         csvData1[i] = clone;
                        break;
                    }
                }
            }
            console.log(csvData1);
          
            this.setState({titleCard : 'Data merged from Csv' , apiData : csvData1 , merge : true });
            console.log(this.state);

          }
           else alert('No Csv uploaded');
      }
     
  render() {
    return (
      <div className="AccountsContainer" style={{ backgroundColor:'#ebf0f4',height:'98vh'}}>
      
      <div class="row" style={{ padding: '2%'}}>
            <div class="col-8">
            <Card style={{borderRadius:'15px',height:'80vh' }}>
            <Card.Body>
                <Card.Title style={titleStyle} onClick={this.handleFiles}>{this.state.titleCard}</Card.Title>
                <Card.Text>
                <DataGrid
                     dataSource={this.state.apiData}
                     selection={{ mode: 'single' }}
                     showBorders={true}
                     hoverStateEnabled={true}
                  //   keyExpr="ID"
                     onSelectionChanged={this.onSelectionChanged}
                    >
                    <Paging defaultPageSize={10} />
                    <Pager
                      showPageSizeSelector={true}
                      allowedPageSizes={[5, 10, 20]}
                      showInfo={true} />
                </DataGrid>
                <div class="row" style={{paddingTop:'7%'}}>
                          <div class="col-12" style={{textAlign : 'left'}}>
                              <span class="card_title" style={{fontSize:'18px',height:'30px'}}><span style={{borderBottom: '2px solid #dfdd07',paddingBottom:'5px'}}>{this.state.errors}</span>
                              </span>
                                </div>
              </div>
                { !this.state.errors && !this.state.merge &&
                    <button onClick = {this.merge} >Merge Api data and the CSV file</button>
                }
     
                {
                    this.state.merge && 
                     <CSVLink filename={"accounts.csv"} data={this.state.apiData}  onClick = {this.reset} >Download CSV</CSVLink>
                }
                                </Card.Text>
            </Card.Body>
            </Card>
            </div>
            <div class="col-4">
            <Card style={{borderRadius:'15px',height:'80vh',overflowY:'scroll' }}>
            <Card.Body>
                <Card.Title className="card_title">Details from CSV</Card.Title>
             
                <Card.Text>
                    <input id="fileContainer" type="file" onChange={ this.handleFiles }
                accept=".csv" 
            />
         <div>
         <br/>
            <p id='title'>Read File</p>
           {
            this.state.showCsvData && <table id='students'>
               <tbody>
                  <tr>{this.renderTableHeader()}</tr>
                  {this.renderTableData()}
               </tbody>
            </table>
            }
         </div>      
                </Card.Text>
            </Card.Body>
            </Card>
            </div>
        </div>
      </div>
    );
  }
}
export default AccountsContainer;
