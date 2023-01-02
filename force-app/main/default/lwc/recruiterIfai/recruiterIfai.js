import { LightningElement, wire, track } from 'lwc';
import searchHeading from '@salesforce/resourceUrl/candidateSearchIcon';
import Id from '@salesforce/user/Id';
import iFairData from '@salesforce/apex/iFairRecordController.getData';
import iFairChildData from '@salesforce/apex/iFairRecordController.getChildData';
import iFairSearch from '@salesforce/apex/iFairRecordController.iFairSearch';

export default class RecruiterIfai extends LightningElement {
  locationImage =searchHeading + '/ISSV2/Group65.png';
        iFair = ['one','two','three','four','five'];
        idString ='';
        childData={};
        
        @track ifairData = [];
  @wire(iFairData)
        wiredJobs({ error, data }) {
            if (data) { 
                console.log('OUTPUT : ',data);
                this.ifairData = data;
                this.childData = data[0];

              }
            else if (error) {
                 console.log('error ' , error );
            }
        }

        getChildData(event){
          console.log({event});
         // console.log('OUTPUT : ',event.currentTarget.id);
            this.idString = event.currentTarget.id;
           this.idString = this.idString.substring(0,18);
           //console.log('OUTPUT : ',idString);
          iFairChildData({childId:this.idString})
          .then((result)=>{
            console.log(result);
            this.childData = result;
        
          })


        }
        

        handlechange(event){
          console.log('event ' , event.target.value);
          //fatchSearchData(value : event.target.value)
          if(event.target.value != null){
            iFairSearch({searchValue : event.target.value})
            .then(res=>{
              console.log('response ' , JSON.stringify(res));
              this.ifairData = res;
                //this.childData = res[0];
            })
          }
        }
}