import { LightningElement } from 'lwc';
import issLogo from '@salesforce/resourceUrl/issLogo';
import issUser from '@salesforce/resourceUrl/issUser';
import basepath from '@salesforce/community/basePath';

export default class LoginScreenHeader extends LightningElement {
    issLogo = issLogo;
    issUser = issUser; 
    loginPage = basepath;
}