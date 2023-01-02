import { LightningElement} from 'lwc';
import logo from '@salesforce/resourceUrl/SchoolLogo';
import headerIcon from '@salesforce/resourceUrl/headerIcons';
import { NavigationMixin } from 'lightning/navigation';

export default class CandidateHeader extends NavigationMixin (LightningElement){

    schoolLogo = logo ;
    ellipse = headerIcon + '/ISSnew/Ellipse.png';
    profilePhoto = headerIcon + '/ISSnew/Group60.png';
    chat = headerIcon + '/ISSnew/icchat.png';
    notification = headerIcon + '/ISSnew/notification.png';
    rectangle = headerIcon + '/ISSnew/Rectangle25.png';

    handleclick(event){
        console.log('click event' , event);
        //console.log('click in js ', event.currentTarget.dataset.id);
        this[NavigationMixin.Navigate]({
            type: 'comm__namedPage',
            attributes: {
                    name: 'User_Profile'
            },
            
        });
    }

}