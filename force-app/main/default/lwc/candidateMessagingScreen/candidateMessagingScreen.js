import { LightningElement, track, wire, api } from 'lwc';
import fetchSchools from '@salesforce/apex/candidateMessaging.fetchSchools';
import fetchInboxContacts from '@salesforce/apex/candidateMessaging.fetchInboxContacts';
import getRecentContacts from '@salesforce/apex/candidateMessaging.getRecentContacts';
import getCurrentUserId from '@salesforce/apex/candidateMessaging.getCurrentUserId';
import getGroups from '@salesforce/apex/candidateMessaging.getGroups';

export default class CandidateMessagingScreen extends LightningElement {
    @track selectedSchool = '';
    @track schoolOptionList = [];
    @track options = [];
    @track showSpinner = true;
    @track inboxContacts = [];
    @track currentUserId;
    @track selectedContact = 0;
    noContacts = false;


    connectedCallback() {
        getCurrentUserId().then(result => {
            console.log('Current User Id : ', result);
            this.currentUserId = result;

            fetchSchools({ currentUserId: this.currentUserId }).then(result => {
                console.log('result', result);
                let schoolList = [];
                result.forEach(element => {
                    schoolList.push({ label: element.Name, value: element.Id });
                });
                this.schoolOptionList = schoolList;
                console.log('schoolList' + JSON.stringify(this.schoolOptionList));
                this.showSpinner = false;
            }).catch(error => {
                this.showSpinner = false;
                console.log(error)
            });

            console.log('Getting Recent Chats : ' + this.currentUserId);
            this.getRecentContactsFunction();


        })
    }


    getRecentContactsFunction() {
        getRecentContacts({ currentUserId: this.currentUserId }).then(data => {
            console.log('result ss', data);
            let item = [];
            let firstContact;
            let count = 0;
            data.forEach(element => {

                console.log('Inside ForEach');
                // if (count == 0) {
                //     firstContact = JSON.parse(element[0]).Id;
                //     count++;
                // }
                if (JSON.parse(element[0]).Id != this.currentUserId) {
                    let schoolName;
                    if (JSON.parse(element[0]).Account == undefined) {
                        this.continue;
                    }
                    else {
                        schoolName = JSON.parse(element[0]).Account.Name;
                    }

                    let className;

                    if (element[5] == this.currentUserId) {
                        // if (element[5] == '0035g00000kqtEAAAY') {
                        console.log('Reciever Id Matched : ');
                        console.log('Read Unread is : ' + element[4]);
                        if (element[4] == 'false') {
                            className = 'fontBold slds-m-horizontal_x-small slds-m-top_small';
                        }
                        else {
                            className = 'slds-m-horizontal_x-small slds-m-top_small';
                        }
                    }
                    else {
                        className = 'slds-m-horizontal_x-small slds-m-top_small';
                    }



                    item.push({
                        Id: JSON.parse(element[0]).Id,
                        Name: JSON.parse(element[0]).Name,
                        schoolName: schoolName,
                        message: element[1],
                        msgTime: element[2].split(' ')[0],
                        class: className
                    })
                }
            });


            let itemShortReaded = [];
            let itemShortUneaded = [];

            item.forEach(element => {

                if (element.class.includes('fontBold')) {
                    itemShortUneaded.push(element);
                }
                else {
                    console.log('Font not Bold');
                    itemShortReaded.push(element);
                }

            })

            let groups = [];
            getGroups({ currentUserId: this.currentUserId }).then(result => {
                console.log('Groups: ', result);
                result.forEach(element => {
                    let className;

                    if (element[5] == this.currentUserId) {
                        if (element[4] == 'false') {
                            className = 'fontBold slds-m-horizontal_x-small slds-m-top_small';
                        }
                        else {
                            className = 'slds-m-horizontal_x-small slds-m-top_small';
                        }
                    }
                    else {
                        className = 'slds-m-horizontal_x-small slds-m-top_small';
                    }

                    groups.push({
                        Id: JSON.parse(element[0]).Id,
                        Name: JSON.parse(element[0]).Name,
                        schoolName: 'schoolName',
                        message: element[1],
                        msgTime: element[2].split(' ')[0],
                        class: className,
                        schoolId: JSON.parse(element[0]).school__c
                    })
                });


                this.inboxContacts = groups.concat(itemShortUneaded.concat(itemShortReaded));
                firstContact = this.inboxContacts[0].Id;
                this.showSpinner = false;
                if (window.innerWidth > 750) {
                    console.log('Hello');
                    let contactName;
                    let contactAddress;
                    let candidateSchool;
                    let candidateId;
                    this.inboxContacts.forEach(element => {
                        if (element.Id == firstContact) {
                            contactName = element.Name;
                            contactAddress = element.schoolName;
                            candidateSchool = element.schoolId;
                            candidateId = element.Id;
                        }
                    });

                    console.log('Contact name : ' + contactName);
                    console.log('Contact Address : ' + contactAddress);
                    const customEvent = new CustomEvent('openchat', { detail: [firstContact, contactName, contactAddress, candidateSchool, candidateId], bubbles: true });
                    this.dispatchEvent(customEvent);
                }
                if (this.inboxContacts.length == 0) {
                    this.noContacts = true;
                }


            }).catch(error => {
                console.log(error);
            })
        }).catch(error => {
            this.showSpinner = false;
            console.log(error)
        });
    }

    fetchAllContactsFunction() {
        fetchInboxContacts({ relatedSchool: this.selectedSchool }).then(result => {
            console.log('Result on Scool Change', result);
            let item = [];
            let firstContact;
            let count = 0;
            result.forEach(element => {
                if (JSON.parse(element[0]).Id != this.currentUserId) {

                    let schoolName;
                    if (JSON.parse(element[0]).Account == undefined) {
                        this.continue;
                    }
                    else {
                        schoolName = JSON.parse(element[0]).Account.Name;
                    }


                    let className;

                    if (element[5] == this.currentUserId) {
                        // if (element[5] == '0035g00000kqtEAAAY') {
                        console.log('Reciever Id Matched : ');
                        console.log('Read Unread is : ' + element[4]);
                        if (element[4] == 'false') {
                            className = 'fontBold slds-m-horizontal_x-small slds-m-top_small';
                        }
                        else {
                            className = 'slds-m-horizontal_x-small slds-m-top_small';
                        }
                    }
                    else {
                        className = 'slds-m-horizontal_x-small slds-m-top_small';
                    }



                    item.push({
                        Id: JSON.parse(element[0]).Id,
                        Name: JSON.parse(element[0]).Name,
                        schoolName: schoolName,
                        message: element[1],
                        msgTime: element[2].split(' ')[0],
                        class: className
                    })
                }
            });

            let itemShortReaded = [];
            let itemShortUneaded = [];

            item.forEach(element => {

                if (element.class.includes('fontBold')) {
                    itemShortUneaded.push(element);
                }
                else {
                    console.log('Font not Bold');
                    itemShortReaded.push(element);
                }

            })

            let groups = [];
            getGroups({ currentUserId: this.currentUserId }).then(result => {
                console.log('Groups: ', result);
                result.forEach(element => {
                    let className;

                    if (element[5] == this.currentUserId) {
                        if (element[4] == 'false') {
                            className = 'fontBold slds-m-horizontal_x-small slds-m-top_small';
                        }
                        else {
                            className = 'slds-m-horizontal_x-small slds-m-top_small';
                        }
                    }
                    else {
                        className = 'slds-m-horizontal_x-small slds-m-top_small';
                    }

                    groups.push({
                        Id: JSON.parse(element[0]).Id,
                        Name: JSON.parse(element[0]).Name,
                        schoolName: 'schoolName',
                        message: element[1],
                        msgTime: element[2].split(' ')[0],
                        class: className,
                        schoolId: JSON.parse(element[0]).school__c
                    })
                });


                this.inboxContacts = groups.concat(itemShortUneaded.concat(itemShortReaded));
                if (this.inboxContacts.length > 0) {
                    const customEvent = new CustomEvent('showhidemessagingscreen', { detail: true, bubbles: true });
                    this.dispatchEvent(customEvent);
                    firstContact = this.inboxContacts[0].Id;
                }
                else {
                    const customEvent = new CustomEvent('showhidemessagingscreen', { detail: false, bubbles: true });
                    this.dispatchEvent(customEvent);
                }
                this.showSpinner = false;
                if (window.innerWidth > 750) {
                    console.log('Hello');
                    let contactName;
                    let contactAddress;
                    let candidateSchool;
                    let candidateId;
                    this.inboxContacts.forEach(element => {
                        if (element.Id == firstContact) {
                            contactName = element.Name;
                            contactAddress = element.schoolName;
                            candidateSchool = element.schoolId;
                            candidateId = element.Id;
                        }
                    });

                    console.log('Contact name : ' + contactName);
                    console.log('Contact Address : ' + contactAddress);
                    const customEvent = new CustomEvent('openchat', { detail: [firstContact, contactName, contactAddress, candidateSchool, candidateId], bubbles: true });
                    this.dispatchEvent(customEvent);
                }
                if (this.inboxContacts.length == 0) {
                    this.noContacts = true;
                }


            }).catch(error => {
                console.log(error);
            })
        }).catch(error => {
            this.showSpinner = false;
        });
    }



    refreshUsersList() {
        console.log(this.template.querySelector('.schoolCombobox').value);

        this.noContacts = false;
        if (this.template.querySelector('.schoolCombobox').value == '' || this.template.querySelector('.schoolCombobox').value == null) {
            this.getRecentContactsFunction();
        }
        else {
            this.template.querySelector('.schoolCombobox').value = this.selectedSchool;
            this.fetchAllContactsFunction();
        }
    }

    searchContact(event) {
        if (event.target.value == "") {
            this.template.querySelectorAll('.con-bubble').forEach(element => {
                element.style.visibility = 'visible';
                element.style.position = 'relative';
            });
        }
        else {
            this.template.querySelectorAll('.con-bubble').forEach(element => {
                element.style.visibility = 'visible';
                element.style.position = 'relative';
                if (!(element.querySelector('.conatactName').innerHTML.toLowerCase().includes(event.target.value.toLowerCase()))) {
                    // console.log('Matched ! : ' + element.querySelector('.conatactName').innerHTML.toLowerCase() );
                    element.style.visibility = 'hidden';
                    element.style.position = 'absolute';
                }
            });
        }
    }
    handleChange(event) {
        this.selectedSchool = event.detail.value;
        this.showSpinner = true;
        this.noContacts = false;
        this.fetchAllContactsFunction();
    }

    @api changePositionContact(currentMessage) {

        let temp = this.inboxContacts[this.selectedContact];
        temp.message = currentMessage;
        this.inboxContacts.splice(this.selectedContact, 1);
        this.inboxContacts.unshift(temp);
        this.selectedContact = 0;

        this.template.querySelector('.con-bubble').querySelector('p').classList.remove('fontBold');
    }

    openChat(event) {
        let contactName;
        let contactAddress;
        this.inboxContacts.forEach(element => {
            if (element.Id == event.currentTarget.dataset.id) {
                contactName = element.Name;
                contactAddress = element.schoolName;
            }
        });

        console.log('Contact name : ' + contactName);
        console.log('Contact Address : ' + contactAddress);

        const customEvent = new CustomEvent('openchat', { detail: [event.currentTarget.dataset.id, contactName, contactAddress], bubbles: true });
        this.dispatchEvent(customEvent);
        this.selectedContact = event.currentTarget.dataset.index;
        event.currentTarget.querySelector('p').classList.remove('fontBold');
    }

}