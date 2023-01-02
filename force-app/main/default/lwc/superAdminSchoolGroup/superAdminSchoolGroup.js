import { LightningElement ,track} from 'lwc';
import testFileJSON from './testData.js';
import schoolGroupData from '@salesforce/apex/getSchoolGroupData.getSchoolData';
import getPickListValues from '@salesforce/apex/getStatusPickListValues.getPickListValuesIntoList';
export default class IssSchoolGroups extends LightningElement {

     active = [];
    @track terFileData = testFileJSON();

    renderedCallback(){
        let lastId = this.terFileData.schoolData[this.terFileData.schoolData.length-1].id;
        this.template.querySelector(`[data-id = '${lastId}' ]`).className = "last-border-remove"; 
    }


connectedCallback() {
    getPickListValues()
      .then((data) => {
          console.log(data);
          let temp = [];
          for(var key in data){
                temp.push({label:data[key], value:key}); 
          }
          this.active = [...temp];

          console.log(this.active);
      })

schoolGroupData()
.then((data1) => {
  console.log('school Data in js' ,data1);
})

}
}