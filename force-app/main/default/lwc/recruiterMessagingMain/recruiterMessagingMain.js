import { api, LightningElement, track } from 'lwc';

export default class RecruiterMessagingMain extends LightningElement {
    @track showrecruiterMessaging = true;
    count = 0;
    openChat(event) {
        console.log('Event Catched');
        console.log(event.detail);
        this.template.querySelector('c-recruitment-messaging-chat-area').receiverIds = event.detail[0];
        this.template.querySelector('c-recruitment-messaging-chat-area').getAllMessage();
        this.template.querySelector('c-recruitment-messaging-chat-area').contactName = event.detail[1];
        this.template.querySelector('c-recruitment-messaging-chat-area').contactAddress = event.detail[2];
        this.template.querySelector('c-recruitment-messaging-chat-area').placeHolder = 'Write to ' + event.detail[1];
        this.template.querySelector('c-recruitment-messaging-chat-area').candidateSchool = event.detail[3];
        this.template.querySelector('c-recruitment-messaging-chat-area').candidateId = event.detail[4];

        if (this.count != 0) {
            if (window.innerWidth <= 750) {
                this.template.querySelector('.recruiterMessagingScreen').style.display = 'none';
                this.template.querySelector('.recruiterMessaging').style.display = 'block';
                this.template.querySelector('.recruiterMessaging').style.width = '100%';
            }
        }
        else {
            this.count = 1;
        }
    }

    backToUserList() {
        if (window.innerWidth <= 750) {
            this.template.querySelector('.recruiterMessagingScreen').style.display = 'block';
            this.template.querySelector('.recruiterMessagingScreen').style.width = '100%';
            this.template.querySelector('.recruiterMessaging').style.display = 'none';
        }
    }
    contactPostionChange(event) {
        this.template.querySelector('c-recruiter-messaging-contacts').changePositionContact(event.detail);
    }
    refreshContacts()
    {
        this.template.querySelector('c-recruiter-messaging-contacts').refreshContacts();
    }
}