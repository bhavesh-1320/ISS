import { LightningElement, api } from 'lwc';
import uploadIcon from '@salesforce/resourceUrl/UploadImg';
import submitJobApplication from '@salesforce/apex/candidateJobSearchReview.submitJobApplication';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class applyJob extends LightningElement {
    uploadIcon = uploadIcon;
    CantOpenModal = false;
    @api jobdetails;
    filesUploaded = [];
    childJobDetails
    info=false;
    connectedCallback() {
        console.log('childjobDetails', this.childJobDetails);
        console.log('jobdetails', JSON.stringify(this.jobdetails));
        this.childJobDetails = this.jobdetails;
    }
    CloseIcon() {
        console.log('Close');
        let customevent = new CustomEvent('closepopup', {
            detail: {
                closePopup: false
            }
        })
        this.dispatchEvent(customevent);
    }
    // infoIcon(){
    //     let customevent = new CustomEvent('nameofeventofchild',{
    //         detail: {
    //             'Event': 'InfoIcon',
    //         }
    //     })
    //     this.dispatchEvent(customevent);
    // }
    // infoText(){
    //     let customevent = new CustomEvent('nameofeventofchild',{
    //         detail: {
    //             'Event': 'InfoText',
    //         }
    //     })
    //     this.dispatchEvent(customevent);
    // }
    SubmitApplicationButton() {
        let customevent = new CustomEvent('submitapplication', {
            detail: {
                submitApplication: true,
            }
        });
        var status = 'Applied';
        console.log(status, this.childJobDetails);
        console.log('jobdetails', this.jobdetails);
        var job = JSON.stringify(this.jobdetails.Id);
        console.log(job);
        console.log(job);
        console.log(JSON.stringify(this.filesUploaded));
        submitJobApplication({ Jobappliedstr: job, Status: status, docDatas: JSON.stringify(this.filesUploaded) })
            .then((result) => {
                console.log('resultData',result);
                if (result == 'Applied Successfully!') {
                    const customEventVar = new CustomEvent('toastmsgfromchild', { detail: ['Applied Successfully', 'success'], bubbles: true });
                    this.dispatchEvent(customEventVar);
                }
                else if (result == 'Please Update Your Account to Premium') {
                    const customEventVar = new CustomEvent('toastmsgfromchild', { detail: ['You have Exceed apply limit. Upgrade to Premium to apply for more jobs.', 'error'], bubbles: true });
                    this.dispatchEvent(customEventVar);
                }
            })
            .catch((err) => {
                console.log(err, 'submitJobApplication');
            })
        this.dispatchEvent(customevent);
    }
     get acceptedFormats() {
        return ['.pdf', '.jpg', '.jpeg', '.png'];
    }
    SaveAsDraftButton() {
        let customevent = new CustomEvent('savedraft', {
            detail: {
                saveDraft: true
            }
        });
        var status = 'Save As Draft';
        submitJobApplication({ Jobapplied: this.jobDetails, Status: status, docDatas: JSON.stringify(this.filesUploaded) });
        this.dispatchEvent(customevent);
    }
    infoIcon(){
        this.CantOpenModal=true
    }
    CancelButton() {
        let customevent = new CustomEvent('closepopup', {
            detail: {
                closePopup: false,
            }
        })
        this.dispatchEvent(customevent);
    }
    handleOnFileUpload(event) {
        let files = event.target.files;
        console.log('files', files);
        this.template.querySelector('.infoFileChoosen').innerText = String(event.target.value).split('\\')[String(event.target.value).split('\\').length - 1];
        this.template.querySelector(".disableButtonClass").style.opacity = 1;
        this.template.querySelector(".disableButtonClass").disabled =false;
        this.template.querySelector(".lineButtonClass").style.opacity = 1;
        this.filesUploaded = [];
        for (let i = 0; i < files.length; i++) {
            let freader = new FileReader();
            freader.onload = f => {
                let base64 = 'base64,';
                let content = freader.result.indexOf(base64) + base64.length;
                let fileContents = freader.result.substring(content);
                // console.log(fileContents);
                this.filesUploaded.push({ ID: i, Title: files[i].name, VersionData: fileContents });
                // this.uploadFiles.push({ ID: i, Title: files[i].name, VersionData: fileContents })
                // this.uploadedFileNames.push({ ID: i, Name: files[i].name, VersionData: fileContents });
            };
            freader.readAsDataURL(files[i]);
        }
        console.log('uploadFiles', this.filesUploaded);
    }
    FileUploaded(event) {
    }
    showToastError() {
        console.log('toast is called');
        console.log('OUTPUT : ', '');
        const event = new ShowToastEvent({
            title: 'Error!',
            message: 'Please Update Your Account to Premium',
            variant: 'error'
        });
        this.dispatchEvent(event);
    }
    showToast() {
        const event = new ShowToastEvent({
            title: 'Success',
            message: 'Applied Successfully',
            variant: 'success',
        });
        this.dispatchEvent(event);
    }
    infoText(){
        this.CantOpenModal = true;
    }
    CloseCantOpenModal(){
        this.template.querySelector('.CantOpenModal').style.top = '-150vh';
        setTimeout(() => {
            this.CantOpenModal = false;
        }, 500);
    }
}