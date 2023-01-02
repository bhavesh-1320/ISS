import { api , LightningElement , track } from 'lwc';
import logo from '@salesforce/resourceUrl/SchoolLogo';
import headerIcon from '@salesforce/resourceUrl/headerIcons';
export default class MainHeader extends LightningElement {
    schoolLogo = logo ;
    ellipse = headerIcon + '/ISSnew/Ellipse.png';
    profilePhoto = headerIcon + '/ISSnew/Group60.png';
    chat = headerIcon + '/ISSnew/icchat.png';
    notification = headerIcon + '/ISSnew/notification.png';
    rectangle = headerIcon + '/ISSnew/Rectangle25.png';

}