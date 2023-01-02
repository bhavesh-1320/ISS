import { LightningElement } from 'lwc';
import { loadStyle, loadScript } from 'lightning/platformResourceLoader';
import jscssTabulator from '@salesforce/resourceUrl/jscssTabulator';
import myLib from '@salesforce/resourceUrl/jslib';
import getColumnData from '@salesforce/apex/customTabularClass.getColumnData';
import updateColumnData from '@salesforce/apex/customTabularClass.updateColumnData';
import JigsawContactId from '@salesforce/schema/Contact.JigsawContactId';

export default class CustomTabularComponent extends LightningElement {


    greeting = 'World';
    table;
    columnData= [];
    recordIds;

//     columnData= [
//     {"title":"Name", "field":"name", "width":150 , "headerFilter":"input", "headerFilterType":"search","headerFilterPlaceholder":"⌕ filter..."},
//     {"title":"Age", "field":"age", "hozAlign":"left", "formatter":"progress", "headerFilter":"input", "headerFilterPlaceholder":"⌕ filter..."},
//     {"title":"Favourite Color", "field":"col", "headerFilter":"input", "headerFilterPlaceholder":"⌕ filter..."},
//     {"title":"Date Of Birth", "field":"dob", "hozAlign":"center", "headerFilter":"input", "headerFilterPlaceholder":"⌕ filter..."}
// ];

    tabledata = [
       {id:1, name:"Oli Bob", age:"12", col:"red", dob:""},
       {id:2, name:"Mary May", age:"1", col:"blue", dob:"14/05/1982"},
       {id:3, name:"Christine Lobowski", age:"42", col:"green", dob:"22/05/1982"},
       {id:4, name:"Brendon Philips", age:"125", col:"orange", dob:"01/08/1980"},
       {id:5, name:"Margret Marmajuke", age:"16", col:"yellow", dob:"31/01/1999"},
     {id:6, name:"Oli Bob", age:"12", col:"red", dob:""},
       {id:7, name:"Mary May", age:"1", col:"blue", dob:"14/05/1982"},
       {id:8, name:"Christine Lobowski", age:"42", col:"green", dob:"22/05/1982"},
       {id:9, name:"Brendon Philips", age:"125", col:"orange", dob:"01/08/1980"},
       {id:10, name:"Margret Marmajuke", age:"16", col:"yellow", dob:"31/01/1999"},
     {id:11, name:"Oli Bob", age:"12", col:"red", dob:""},
       {id:12, name:"Mary May", age:"1", col:"blue", dob:"14/05/1982"},
       {id:13, name:"Christine Lobowski", age:"42", col:"green", dob:"22/05/1982"},
       {id:14, name:"Brendon Philips", age:"125", col:"orange", dob:"01/08/1980"},
       {id:15, name:"Margret Marmajuke", age:"16", col:"yellow", dob:"31/01/1999"},
     {id:16, name:"Oli Bob", age:"12", col:"red", dob:""},
       {id:17, name:"Mary May", age:"1", col:"blue", dob:"14/05/1982"},
       {id:18, name:"Christine Lobowski", age:"42", col:"green", dob:"22/05/1982"},
       {id:19, name:"Brendon Philips", age:"125", col:"orange", dob:"01/08/1980"},
       {id:20, name:"Margret Marmajuke", age:"16", col:"yellow", dob:"31/01/1999"},
     {id:21, name:"Oli Bob", age:"12", col:"red", dob:""},
       {id:22, name:"Mary May", age:"1", col:"blue", dob:"14/05/1982"},
       {id:23, name:"Christine Lobowski", age:"42", col:"green", dob:"22/05/1982"},
       {id:24, name:"Brendon Philips", age:"125", col:"orange", dob:"01/08/1980"},
       {id:25, name:"Margret Marmajuke", age:"16", col:"yellow", dob:"31/01/1999"},
     {id:26, name:"Oli Bob", age:"12", col:"red", dob:""},
       {id:27, name:"Mary May", age:"1", col:"blue", dob:"14/05/1982"},
       {id:28, name:"Christine Lobowski", age:"42", col:"green", dob:"22/05/1982"},
       {id:29, name:"Brendon Philips", age:"125", col:"orange", dob:"01/08/1980"},
       {id:30, name:"Margret Marmajuke", age:"16", col:"yellow", dob:"31/01/1999"},
     {id:31, name:"Oli Bob", age:"12", col:"red", dob:""},
       {id:32, name:"Mary May", age:"1", col:"blue", dob:"14/05/1982"},
       {id:33, name:"Christine Lobowski", age:"42", col:"green", dob:"22/05/1982"},
       {id:34, name:"Brendon Philips", age:"125", col:"orange", dob:"01/08/1980"},
       {id:35, name:"Margret Marmajuke", age:"16", col:"yellow", dob:"31/01/1999"},
     {id:36, name:"Oli Bob", age:"12", col:"red", dob:""},
       {id:37, name:"Mary May", age:"1", col:"blue", dob:"14/05/1982"},
       {id:38, name:"Christine Lobowski", age:"42", col:"green", dob:"22/05/1982"},
       {id:39, name:"Brendon Philips", age:"125", col:"orange", dob:"01/08/1980"},
       {id:40, name:"Margret Marmajuke", age:"16", col:"yellow", dob:"31/01/1999"},
     {id:41, name:"Oli Bob", age:"12", col:"red", dob:""},
       {id:42, name:"Mary May", age:"1", col:"blue", dob:"14/05/1982"},
       {id:43, name:"Christine Lobowski", age:"42", col:"green", dob:"22/05/1982"},
       {id:44, name:"Brendon Philips", age:"125", col:"orange", dob:"01/08/1980"},
       {id:45, name:"Margret Marmajuke", age:"16", col:"yellow", dob:"31/01/1999"},
     {id:46, name:"Oli Bob", age:"12", col:"red", dob:""},
       {id:47, name:"Mary May", age:"1", col:"blue", dob:"14/05/1982"},
       {id:48, name:"Christine Lobowski", age:"42", col:"green", dob:"22/05/1982"},
       {id:49, name:"Brendon Philips", age:"125", col:"orange", dob:"01/08/1980"},
       {id:50, name:"Margret Marmajuke", age:"16", col:"yellow", dob:"31/01/1999"},
  
   ];
    changeHandler(event) {
      this.greeting = event.target.value;
    }

    createTabulatorDataTable(){
        var test =  Promise.all([
            loadScript(this,myLib) ,
            loadStyle(this,jscssTabulator)
          ]).then(() => {
           
            console.log('render',this.template.querySelector('.example-table1'));
            var abc = this.template.querySelector('.example-table1');
      console.log('render',abc.id);
       var t = '#'+ abc.id;
            this.table = new Tabulator(abc, {
              height:205, // set height of table (in CSS or here), this enables the Virtual DOM and improves render speed dramatically (can be any valid css height value)
           data:this.tabledata, //assign data to table
           layout:"fitColumns", //fit columns to width of table (optional)
           columns:this.columnData,
              });

              this.table.setData(this.tableData);
             
      
          })
    }
  
  
   connectedCallback(){

    /*getColumnData().then(result=>{
        let dataIS = result;
        console.log('column data from apex in get record=> ', dataIS);
        this.recordIds= dataIS.Id;
        this.columnData.push(...JSON.parse(dataIS.Column_Data__c));
        console.log('column Data==> ', this.columnData);
        this.createTabulatorDataTable();  

     }).catch(error=>{

      console.error(error); 
});*/

     }

     addColumns(){
        console.log('hello from add column');
        this.columnData.push({title:"Hello", field:"hello"});
        console.log('columns=> ', this.columnData);

        updateColumnData({updatedColumnData:JSON.stringify(this.columnData), recordsIds:this.recordIds }).then(result=>{
            let datass= result;
            console.log('column data from apex in update record=> ', datass.Column_Data__c);
         }).catch(error=>{
    
          console.error(error); 
    });

        var abc = this.template.querySelector('.example-table1');
      console.log('render',abc.id);
       var t = '#'+ abc.id;
            this.table = new Tabulator(abc, {
              height:205, // set height of table (in CSS or here), this enables the Virtual DOM and improves render speed dramatically (can be any valid css height value)
           data:this.tabledata, //assign data to table
           layout:"fitColumns", //fit columns to width of table (optional)
           columns:this.columnData,
              });

        
        // this.table.addColumn({title:"Hello", field:"hello"}, true, "name")
        // .then(function(column){

        //     console.log('column created');
        //     console.log('===>', column);
        //     //column - the component for the newly created column
        
        //     //run code after column has been added
        // })
        // .catch(function(error){
        //     console.error('===>', error);
        //     //handle error adding column
        // });
        console.log('hello from add column last');
     }

    //  renderedCallback(){
    //     this.template
    //     .querySelector("tabulator-col-title")
    //     .addEventListener("click", (e) => console.log("eventss=> ", e), false);
    //  }


}