import { LightningElement , api  } from 'lwc';
import basepath from '@salesforce/community/basePath';
export default class JobUIChildComponent extends LightningElement {
      communityPath = basepath;
      addjob =  this.communityPath+'/recruiter-add-job';
    teacherdata = ['one' , 'two ' , 'three' , 'four'];
    @api getValue ;
    goBack(event){
        const custEvent = new CustomEvent(
            'callpasstoparent', {
                detail: 'goBack'
            });
        this.dispatchEvent(custEvent);
    }
}