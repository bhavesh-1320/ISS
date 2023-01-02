import { LightningElement, api, track } from 'lwc';
import fetchAllMessage from '@salesforce/apex/candidateMessaging.fetchAllMessage';
import fetchContactsName from '@salesforce/apex/candidateMessaging.fetchContactsName';
import getCurrentUserId from '@salesforce/apex/candidateMessaging.getCurrentUserId';
import createMessage from '@salesforce/apex/candidateMessaging.createMessage';
import fetchSchoolName from '@salesforce/apex/candidateMessaging.fetchSchoolName';

export default class CandidateMessaging extends LightningElement {

    allMessages;
    @api contactName;
    @api placeHolder = 'Write to';
    @api contactAddress;
    currentUserId;
    @api receiverIds; //= '0035g00000mApw6AAC'
    contactObjectNames;

    renderedCallback() {
        this.template.querySelector('.msger-chat').scrollTop = this.template.querySelector('.msger-chat').scrollHeight;
    }

    searchInChat(event) {
        let searchtext = event.target.value;

        if (searchtext == "") {
            this.template.querySelectorAll('.msg-text').forEach(element => {
                element.style.background = 'transparent';
            });
        }
        else {
            this.template.querySelectorAll('.msg-text').forEach(element => {
                element.style.background = 'transparent';
                if (element.innerHTML.toLowerCase().includes(searchtext.toLowerCase())) {
                    element.style.background = 'yellow';
                }
            });
        }

    }

    sendMessageOnEnter(event) {
        if (event.keyCode === 13) {
            this.sendMessage();
        }
    }

    sendMessage() {
        let content = this.template.querySelector('.msger-input').value;
        console.log('Value ', content);
        console.log('RecieverId : ', this.receiverIds);

        if (content != "" && this.receiverIds != null && this.receiverIds != undefined) {
            let dt = new Date();
            let dateTime = {};
            dateTime['year'] = dt.getFullYear();
            dateTime['month'] = (dt.getMonth() + 1);
            dateTime['date'] = dt.getDate();
            dateTime['hour'] = dt.getHours();
            dateTime['minutes'] = dt.getMinutes();
            dateTime['seconds'] = dt.getSeconds();

            const customEvent = new CustomEvent('changecontactposition', { detail: content, bubbles: true });
            console.log('customEvent');
            this.dispatchEvent(customEvent);

            try {
                createMessage({ senderId: this.currentUserId, receiverId: this.receiverIds, content: content, msgDate: dateTime }).then(result => {
                    console.debug('tryResult ', result);
                    this.template.querySelector('.msger-input').value = '';
                    this.getAllMessage();
                })
            } catch (err) {
                console.debug(err);
            }
        }

    }

    @api
    getAllMessage() {

        console.log('getAllMessage');
        console.log('Id ', this.receiverIds);
        if (window.innerWidth > 750) {
            this.template.querySelector('.backBtn').style.display = 'none';
        }
        else {
            this.template.querySelector('.backBtn').style.display = 'block';
        }

        // this.contactName = '';
        // this.placeHolder = 'Write to ' + this.contactName;

        // fetchSchoolName({ userId: this.receiverIds }).then(name => {
        //     this.contactName = name.split(';')[0];
        //     this.placeHolder = 'Write to ' + this.contactName;
        //     this.contactAddress = name.split(';')[1];
        // })

        console.log('Getting All Chats')

        console.log(this.receiverIds + ' - ' + this.currentUserId);

        // this.allMessages = [];
        fetchAllMessage({ currentUserId: this.currentUserId, currentReceiverId: this.receiverIds }).then(messages => {

            console.log('fetchAllMessage');
            console.log('message ' + messages);
            let item = [];
            let contactId = [];
            messages.forEach(element => {
                contactId.push(element.Receiver_IDs__c);
                contactId.push(element.Sender_ID__c);
            });

            fetchContactsName({ contactId: contactId }).then(conName => {
                this.contactObjectNames = conName;
                // this.contactName = conName[this.receiverIds];
                let lastDate = '';

                messages.forEach(msg => {
                    let Dtime = new Date(msg.Message_Time__c);
                    let newDtime = this.subtractHours(12, Dtime);
                    let dtStamp = newDtime.toDateString().split(' ');

                    if (msg.Sender_ID__c == this.currentUserId) {
                        if (lastDate != `${dtStamp[2]} ${dtStamp[1]} ${dtStamp[3]}, ${dtStamp[0]}`) {
                            item.push({
                                id: msg.Id,
                                name: this.contactObjectNames[msg.Sender_ID__c],
                                time: newDtime.toLocaleTimeString(),
                                content: msg.Content__c,
                                class: 'msg right-msg',
                                datestamp: `${dtStamp[2]} ${dtStamp[1]} ${dtStamp[3]}, ${dtStamp[0]}`,
                                dateStampClass: 'dateStamp'

                            })

                            lastDate = `${dtStamp[2]} ${dtStamp[1]} ${dtStamp[3]}, ${dtStamp[0]}`;
                        }
                        else {
                            item.push({
                                id: msg.Id,
                                name: this.contactObjectNames[msg.Sender_ID__c],
                                time: newDtime.toLocaleTimeString(),
                                content: msg.Content__c,
                                class: 'msg right-msg',
                                datestamp: '',
                                dateStampClass: 'noDateStamp'
                            })
                        }
                    }
                    else {
                        if (lastDate != `${dtStamp[2]} ${dtStamp[1]} ${dtStamp[3]}, ${dtStamp[0]}`) {
                            item.push({
                                id: msg.Id,
                                name: this.contactObjectNames[msg.Sender_ID__c],
                                time: newDtime.toLocaleTimeString(),
                                content: msg.Content__c,
                                class: 'msg left-msg',
                                datestamp: `${dtStamp[2]} ${dtStamp[1]} ${dtStamp[3]}, ${dtStamp[0]}`,
                                dateStampClass: 'dateStamp'
                            })

                            lastDate = `${dtStamp[2]} ${dtStamp[1]} ${dtStamp[3]}, ${dtStamp[0]}`;
                        }
                        else {
                            item.push({
                                id: msg.Id,
                                name: this.contactObjectNames[msg.Sender_ID__c],
                                time: newDtime.toLocaleTimeString(),
                                content: msg.Content__c,
                                class: 'msg left-msg',
                                datestamp: '',
                                dateStampClass: 'noDateStamp'
                            })
                        }
                    }

                });

                //after for each loop
                this.allMessages = item;

            })

        })
    }

    connectedCallback() {
        getCurrentUserId().then(userId => {
            this.currentUserId = userId;
        })
        //this.getAllMessage();
    }

    subtractHours(numOfHours, date = new Date()) {
        date.setMinutes(date.getMinutes() - 30);
        date.setHours(date.getHours() - numOfHours);
        return date;
    }


    backToUserList() {
        const customEvent = new CustomEvent('backtouserlist', { detail: true, bubbles: true });
        this.dispatchEvent(customEvent);
    }


}