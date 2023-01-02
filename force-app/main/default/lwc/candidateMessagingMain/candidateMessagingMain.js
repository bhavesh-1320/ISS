import { LightningElement, track, wire, api } from 'lwc';

export default class CandidateMessagingMain extends LightningElement {
    @track showCandidateMessaging = true;

    count = 0;
    openChat(event) {
        this.template.querySelector('c-candidate-messaging').receiverIds = event.detail[0];
        this.template.querySelector('c-candidate-messaging').getAllMessage();
        this.template.querySelector('c-candidate-messaging').contactName = event.detail[1];
        this.template.querySelector('c-candidate-messaging').contactAddress = event.detail[2];
        this.template.querySelector('c-candidate-messaging').placeHolder = 'Write to ' + event.detail[1];
        this.template.querySelector('c-candidate-messaging').candidateSchool = event.detail[3];
        this.template.querySelector('c-candidate-messaging').candidateId = event.detail[4];

        if (this.count != 0) {
            if (window.innerWidth <= 750) {
                this.template.querySelector('.candidateMessagingScreen').style.display = 'none';
                this.template.querySelector('.candidateMessaging').style.display = 'block';
                this.template.querySelector('.candidateMessaging').style.width = '100%';
            }
        }
        else {
            this.count = 1;
        }
    }

    backToUserList() {
        if (window.innerWidth <= 750) {
            this.template.querySelector('.candidateMessagingScreen').style.display = 'block';
            this.template.querySelector('.candidateMessagingScreen').style.width = '100%';
            this.template.querySelector('.candidateMessaging').style.display = 'none';
        }
    }

    contactPostionChange(event) {
        this.template.querySelector('c-candidate-messaging-screen').changePositionContact(event.detail);
    }

    refreshContacts() {
        this.template.querySelector('c-candidate-messaging-screen').refreshContacts();
    }

    showHideMessagingScreen(event)
    {
        console.log('Checking')
        this.showCandidateMessaging = event.detail;
    }
}