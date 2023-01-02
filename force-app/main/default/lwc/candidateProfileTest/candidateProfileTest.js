import { LightningElement,track } from 'lwc';

import editIcon from '@salesforce/resourceUrl/editIcon';
import cancel from '@salesforce/resourceUrl/cancel';
import bellICon from '@salesforce/resourceUrl/bellICon';
import deleteIcon from '@salesforce/resourceUrl/deleteIcon';
import uploadIcon from '@salesforce/resourceUrl/uploadIcon';
import fileIcon from '@salesforce/resourceUrl/fileIcon';
export default class CandidateProfile extends LightningElement {
    editicon  = editIcon;
    cancel =cancel;
    bellICon = bellICon;
    deleteIcon = deleteIcon;
    uploadIcon = uploadIcon;
    fileIcon = fileIcon;

   @track externalProfile=['John Smithson','Video Smithson','John_007'];

test(){
    console.log('button is clicked');
   }

   /*
    [
        {
            "url": "https://xyz.com",
            "username": "username",
            "png-icon": staticResourcePath 
        }
    ]
   */ 
}