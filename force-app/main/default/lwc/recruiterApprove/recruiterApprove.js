import {LightningElement} from 'lwc';
import updateRoleField from '@salesforce/apex/candidateHelpers.updateRoleField';
import varifiedImagepng from '@salesforce/resourceUrl/varifiedImage';

export default class RecruiterApprove extends LightningElement {
    varified = varifiedImagepng 
    connectedCallback() {
        let currentURL = window.location.href;
        let encryptedId;


        if (currentURL.includes('?')) {
            let params = currentURL.split('?')[1];
            if (params.includes('&')) {
                params.split('&').forEach(element => {
                    if (element.split('=')[0] == 'key') {
                        encryptedId = element.split('=')[1];
                    }
                });
            } else {
                if (params.split('=')[0] == 'key') {
                    encryptedId = params.split('=')[1];
                }
            }
        } else {
            console.log('Error');
        }

        if(encryptedId == undefined)
        {
            console.log('Error');
        }
        else
        {

            encryptedId = decodeURIComponent(encryptedId);
            encryptedId = encryptedId.replaceAll(' ', '+');
            console.log(encryptedId);
            updateRoleField({encrptedData : encryptedId})
            .then(res=>{
                console.log(res);
            })
        }



    }

}