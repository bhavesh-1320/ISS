import { LightningElement, track, wire } from 'lwc';
import searchHeading from '@salesforce/resourceUrl/candidateSearchIcon';
export default class adminCadidates extends LightningElement {
    nodata = false;
    jobsData = ['one','two','two','two','two','two'];
    rectangleImage =searchHeading + '/ISSV2/Rectangle.png';
    hatImage =searchHeading + '/ISSV2/Group66.png';
    groups = searchHeading + '/ISSV2/Group98.png';
    Id = '0001'
    getClick(event){
        console.log('id ' ,event.currentTarget.id);
        this.template.querySelector('.mobile-view').style.display = 'none';
        this.template.querySelector('.mobile-child-display').style.display = 'block';
        
    }
}