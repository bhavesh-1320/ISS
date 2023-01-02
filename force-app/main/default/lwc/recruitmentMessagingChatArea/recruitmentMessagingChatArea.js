import { api, LightningElement, track } from 'lwc';
import fetchAllMessage from '@salesforce/apex/candidateMessaging.fetchAllMessage';
import fetchContactsName from '@salesforce/apex/candidateMessaging.fetchContactsName';
import getCurrentUserId from '@salesforce/apex/candidateMessaging.getCurrentUserId';
import createMessage from '@salesforce/apex/candidateMessaging.createMessage';
import getRecruitersFromSameSchool from '@salesforce/apex/candidateMessaging.getRecruitersFromSameSchool';
import createGroup from '@salesforce/apex/candidateMessaging.createGroup';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class RecruitmentMessagingChatArea extends LightningElement {

    allMessages;
    @api contactName;
    @api placeHolder = 'Write to';
    @api contactAddress;
    currentUserId = '0038M00000HA3ZXQA1';
    @api receiverIds;
    contactObjectNames;
    @track recruiterInSameSchool;
    @api candidateSchool;
    noRecruiterFound = false;
    @api candidateId;
    loader = false;

    renderedCallback() {
        document.querySelector('html').style.overflow = 'hidden';
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

    @api getAllMessage() {

        console.log('getAllMessage');
        console.log('Id ', this.receiverIds);
        if (window.innerWidth > 750) {
            this.template.querySelector('.backBtn').style.display = 'none';
        }
        else {
            this.template.querySelector('.backBtn').style.display = 'block';
        }

        console.log('Getting All Chats')

        console.log(this.receiverIds + ' - ' + this.currentUserId);

        // this.allMessages = [];
        fetchAllMessage({ currentUserId: this.currentUserId, currentReceiverId: this.receiverIds }).then(messages => {

            console.log('fetchAllMessage');
            console.log('message ', messages);
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

    // connectedCallback() {
    //     getCurrentUserId().then(userId => {
    //         this.currentUserId = userId;
    //     })
    //     //this.getAllMessage();
    // }

    subtractHours(numOfHours, date = new Date()) {
        date.setMinutes(date.getMinutes() - 30);
        date.setHours(date.getHours() - numOfHours);
        return date;
    }


    backToUserList() {
        const customEvent = new CustomEvent('backtouserlist', { detail: true, bubbles: true });
        this.dispatchEvent(customEvent);
    }

    showAddRecruiterModal(event) {
        this.noRecruiterFound = false;
        this.loader = true;
        console.log('School Id : ', this.candidateSchool);
        getRecruitersFromSameSchool({ relatedSchool: this.candidateSchool }).then(result => {
            console.log(result);
            this.recruiterInSameSchool = result;
            if (this.recruiterInSameSchool.length == 0) {
                this.noRecruiterFound = true;
            }
            this.loader = false;
            this.template.querySelector('.addRecruiterOverlay').style.display = 'block';
            this.template.querySelector('.addRecruiterModal').style.display = 'block';
        }).catch(error => {
            this.loader = false;
            console.log(error);
        })

    }

    createGroup(event) {
        this.loader = true;
        console.log(this.candidateId + ' - ' + this.currentUserId + ' - ' + event.target.dataset.id);
        if (this.candidateId != null && this.candidateId != undefined && this.candidateId != '' && this.currentUserId != null && this.currentUserId != undefined && this.currentUserId != '' && event.target.dataset.id != null && event.target.dataset.id != undefined && event.target.dataset.id != '') {
            createGroup({ candidateId: this.candidateId, currentUserId: this.currentUserId, newRecruiterId: event.target.dataset.id }).then(result => {
                let result1 = result
                this.template.querySelector('.addRecruiterOverlay').style.display = 'none';
                this.template.querySelector('.addRecruiterModal').style.display = 'none';
                console.log(result1);
                this.loader = false;
                if (result1 == 'true') {
                    const event = new ShowToastEvent({
                        message: 'Recruiter Added SuccessFully.',
                        variant: 'success'
                    });
                    this.dispatchEvent(event);
                    const customEvent = new CustomEvent('refreshcontacts', { detail: true, bubbles: true });
                    this.dispatchEvent(customEvent);
                }
                else {
                    const event = new ShowToastEvent({
                        message: 'Group Already Exist',
                        variant: 'warning'
                    });
                    this.dispatchEvent(event);
                }

            }).catch(error => {
                this.loader = false;
                console.log(error);
            })
        }
    }

    hideAddRecruiterModal() {
        this.template.querySelector('.addRecruiterOverlay').style.display = 'none';
        this.template.querySelector('.addRecruiterModal').style.display = 'none';
    }


}