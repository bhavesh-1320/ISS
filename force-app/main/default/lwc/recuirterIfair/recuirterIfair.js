import { LightningElement, wire, track } from 'lwc';
import searchHeading from '@salesforce/resourceUrl/candidateSearchIcon';
import Id from '@salesforce/user/Id';
import iFairData from '@salesforce/apex/iFairRecordController.getData';
import iFairChildData from '@salesforce/apex/iFairRecordController.getChildData';
export default class CandidateIfair extends LightningElement {
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
}