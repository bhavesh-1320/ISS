import { api, LightningElement, track } from 'lwc';
import star from '@salesforce/resourceUrl/Star';
import basicInfo from '@salesforce/resourceUrl/BasicInformationIcon';
import favouriteCandidate from '@salesforce/apex/favouriteBookmarkController.candidateFavourite';
import removefavouriteCandidate from '@salesforce/apex/favouriteBookmarkController.removeCandidateFavourite';
import checkCandidateFavourite from '@salesforce/apex/favouriteBookmarkController.checkCandidateFavourite';
import getCoverLetter from '@salesforce/apex/candidateSearch.getRelatedFilesByRecordId';
import getContactRecord from '@salesforce/apex/candidateSearch.getContactRecord';
import checkCandidateNotes from '@salesforce/apex/candidateSearch.checkCandidateNotes';
import deleteNote from '@salesforce/apex/candidateSearch.deleteNote';
import editNote from '@salesforce/apex/candidateSearch.editNote';
import createCandidateNotes from '@salesforce/apex/candidateSearch.createCandidateNotes';
import getCareer from '@salesforce/apex/candidateSearch.getCareer';
import MoreFiltersImages from '@salesforce/resourceUrl/CandidateMoreFilter';
import getContactId from '@salesforce/apex/candidateSearch.getContactId';
import getDetailPageLayoutRecord from '@salesforce/apex/candidateSearch.getDetailPageLayoutRecord';
import createDetailPageLayoutRecord from '@salesforce/apex/candidateSearch.createDetailPageLayoutRecord';
import Id from '@salesforce/user/Id';

export default class PillContainerExample extends LightningElement {
    @track noteshere = [];
    @api currentJobid;
    @track checked = false;
    careerHistoryBoolean = false;
    relationshipInformation = false;
    referenceBoolean = false;
    mediaLinkBoolean = false;
    keyRelationships = false;
    extraCurricularBoolean = false;
    certificateBoolean = false;
    degreeBoolean = false;
    currentLoggingUser = Id;
    coverLetterName = '';
    childData = '';
    candidateId = '';
    jobApplied = false;
    noteText = ''
    absenceBoolean = false;
    seekingPosition = false;
    star = star;
    careerAbsenceData = [];
    seekingPositionData = [];
    positionHeldData = [];
    InviteButtonIcon = MoreFiltersImages + '/filterIcons/Group135.png';
    userIcon = MoreFiltersImages + '/filterIcons/Group874.png';
    messageIcon = MoreFiltersImages + '/filterIcons/Group153.png';
    barIcon = MoreFiltersImages + '/filterIcons/Group875.png';
    multipleIcon = MoreFiltersImages + '/filterIcons/Group798.png';
    clock = MoreFiltersImages + '/filterIcons/Group877.png';
    gridData = MoreFiltersImages + '/filterIcons/Group134.png';
    months = ['Jan', 'Feb', 'March', 'April', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
    @api getJobId(value) {
        this.currentJobid = value
        console.log('currentJobId', this.currentJobid);
        console.log('contactId', this.visibleContact.Id);
        this.showCoverLetter();

    }
    items = [
        {
            label: 'Jim Bob',
            name: 'Jim Bob',
        },
        {
            label: 'Jim Bob',
            name: 'Jim Bob',
        },
        {
            label: 'Jim Bob',
            name: 'Jim Bob',
        },


    ];
    data = [
        { 'DepartMent': 'Social Studies  ', 'Subject': 'Assistent / Assistent Principal', 'Education': 'Elementry', 'Curriclum': 'NA' },
        { 'DepartMent': 'Social Studies  ', 'Subject': 'Assistent / Assistent Principal', 'Education': 'Elementry', 'Curriclum': 'NA' },
        { 'DepartMent': 'Social Studies  ', 'Subject': 'Assistent / Assistent Principal', 'Education': 'Elementry', 'Curriclum': 'NA' }
    ];
    careerHistoryData = [
        { 'startDate': 'Aug 01 2018 - Current', 'jobTitle': 'School Counselor', 'Organization': 'Jefferson Elementary School', 'jobType': 'Full Time', 'Curriculum': 'United States of America', 'Country, State': 'United States, Wisconsin' }

    ]

    starChecked = MoreFiltersImages + '/filterIcons/starChecked.png';
    starUnchecked = MoreFiltersImages + '/filterIcons/starUnchecked.png';


    candidateInfo = true;
    candidateChat = false;
    candidateApplicationHistory = false;
    notesArea = false;
    threeDotOptionsVisibility = false;




    showThreeDotOptions(event) {
        this.template.querySelector('.threeDots').iconName = 'utility:close';
        this.threeDotOptionsVisibility = true;
    }

    hideThreeDotOptions() {
        this.template.querySelector('.threeDots').iconName = 'utility:threedots';
        this.threeDotOptionsVisibility = false;
    }
    CollapseDropDown(event) {
        console.log('inside dropdown');
        if (event.currentTarget.querySelector('.dropdownData').style.height == '0px') {
            //this.dropDownIcon = "utility:up";
            event.currentTarget.querySelector('lightning-icon').iconName = "utility:up"
            event.currentTarget.parentElement.querySelector('.dropdownData').style.height = 'auto';
        }
        else {
            event.currentTarget.parentElement.querySelector('.dropdownData').style.height = '0px';
            event.currentTarget.querySelector('lightning-icon').iconName = "utility:down"
        }
    }


    contactIdFromUrl;
    @track currentLoggingUserContactId;
    connectedCallback() {
        //console.log('Connected Callback !!!');

        getContactId({ userId: this.currentLoggingUser }).then(result => {
            this.currentLoggingUserContactId = result;
        }).catch(error => {
            console.log(error);
        })

        getDetailPageLayoutRecord({ userId: this.currentLoggingUser, layoutName: 'Detail Page' }).then(result => {
            let res = result;
            console.log('getDetailPageLayoutRecord : ' + res);
            if (res.length > 0) {
                console.log('Has Records');
                this.currentFieldsOptions = JSON.parse(res[0].Value__c);
                this.reorderComponents();
                this.currentFieldsOptions.forEach(element => {
                    console.log(element);
                })
            }
            else {
                console.log('no Records');
                this.currentFieldsOptions = this.allFieldsOptions;
                this.reorderComponents();
            }
        }).catch(error => {
            console.log(error);
        })


        let currentURL = window.location.href;
        if (currentURL.includes('?')) {
            let params = currentURL.split('?')[1];
            if (params.includes('&')) {
                // console.log('Contains & :');
                params.split('&').forEach(element => {
                    if (element.split('=')[0] == 'cid') {
                        this.contactIdFromUrl = element.split('=')[1];
                    }
                });
            }
            else {
                //  console.log('Did Not Contains & :');
                if (params.split('=')[0] == 'cid') {
                    this.contactIdFromUrl = params.split('=')[1];
                }
            }
        }

        //  console.log('contactIdFromUrl : ' + this.contactIdFromUrl);

        if (this.contactIdFromUrl != undefined) {
            //  console.log('Sending Request : ')
            getContactRecord({ contactId: this.contactIdFromUrl }).then(result => {
                console.log('Result from child : ', result);
                this.visibleContact = result;
                //console.log('OUTPUT : ',this.visibleContact.Degree_Qualifications__r);
                this.childData = result;
                this.mainchildbodyVisibility = false;
                this.template.querySelector('.mainScreen').style.padding = '20px 15%';
                this.template.querySelector('.mainScreen').style.background = '#eef6f5';
                this.checkApplied();

            }).catch(error => {
                console.log(error);
            })
        }


    }

    changeTab(event) {
        console.log('Switching Tab...');
        // this.showUserDetail();

        console.log(event.target.nodeName);
        switch (event.target.nodeName) {
            case 'LI':
                this.template.querySelectorAll('.contactTab').forEach(element => {
                    element.classList.remove('active');
                });
                event.target.classList.add('active');
                this.allContacts.forEach(element => {
                    if (element.Id == event.target.dataset.id) {
                        this.visibleContact = element;
                    }
                });
                this.checkApplied();
                this.checkBookmark();


                break;
            case 'P':
                this.template.querySelectorAll('.contactTab').forEach(element => {
                    element.classList.remove('active');
                });
                event.target.parentElement.classList.add('active');
                this.allContacts.forEach(element => {
                    if (element.Id == event.target.parentElement.dataset.id) {
                        this.visibleContact = element;
                    }
                });
                this.checkApplied();
                this.checkBookmark();

                break;
            case 'LIGHTNING-ICON':
                if (this.recentChats.length > 1) {

                    if (event.target.parentElement.dataset.index == 0 && event.target.parentElement.classList.contains('active')) {
                        this.visibleContact = this.recentChats[1];
                        this.recentChats.splice(event.target.dataset.index, 1);
                        setTimeout(() => {
                            this.template.querySelector('.contactTab').classList.add('active');
                        }, 100)
                    }
                    else {
                        if (event.target.parentElement.classList.contains('active')) {
                            this.template.querySelectorAll('.contactTab').forEach(element => {
                                if ((event.target.parentElement.dataset.index - 1) == element.dataset.index) {
                                    element.classList.add('active');
                                    this.allContacts.forEach(ele => {
                                        if (ele.Id == element.dataset.id) {
                                            this.visibleContact = ele;
                                        }
                                    });
                                }
                            });
                            this.recentChats.splice(event.target.dataset.index, 1);
                        }
                        else {
                            this.recentChats.splice(event.target.dataset.index, 1);
                        }
                    }
                }
                else {
                    const customEvent = new CustomEvent('hidecomponent', { detail: false, bubbles: true });
                    this.dispatchEvent(customEvent);
                }
                this.checkApplied();
                this.checkBookmark();


                break;
        }
    }
    showCoverLetter() {
        //         if(this.visibleContact.Notes__r){
        //             this.noteshere= [];
        //  this.noteshere = JSON.parse(JSON.stringify(this.visibleContact.Notes__r));
        //         }
        //         this.noteshere = [];

        console.log('OUTPUT : ', this.noteshere);
        console.log('jobId line 235 coverletter', this.currentJobid);
        console.log('contactId coverletter', this.visibleContact.Id);
        getCoverLetter({ jobid: this.currentJobid, contactId: this.visibleContact.Id }).then((result) => {
            // let getMapValue={};
            //getMapValue=result;

            let simpleMap = [];
            for (var key in result) {
                simpleMap.push({ key: key, value: result[key] });
                console.log('key', key, result[key]);
                this.coverLetterName = key;
            }

            console.log('result to show current job id', result);
            console.log(JSON.stringify(result));
            if (JSON.stringify(result) === '{}') {
                this.jobApplied = false;
            }
            else {

                this.jobApplied = true;
                //let v = JSON.parse(result);
                // console.log('OUTPUT : ',v['Graham_Rob_ISS Full Dossier_2022 11 30.pdf']);

                // console.log('coverlettername : ',result.key());

                //this.coverLetterName = result.key();

            }
        }).catch((err) => {
            console.log('Error 258 : ', err);
        })
    }


    @api favouriteCandiddate(event) {

        // console.log(event.currentTarget.dataset.id);
        this.candidateId = event.currentTarget.dataset.id;
        console.log(this.candidateId);
        if (this.checked == false) {
            console.log('inside if', event.currentTarget.dataset.id);
            console.log(this.currentLoggingUser);
            favouriteCandidate({ candidate: event.currentTarget.dataset.id, userId: this.currentLoggingUser }).then((result) => {
                console.log('result', result);
            }).catch((err) => {
                console.log('err', err);
                this.template.querySelector('.fav').src = this.starUnchecked;
                this.checked = false;
                const selectEvent = new CustomEvent('removefavourite', {
                    detail: this.candidateId
                });
                this.dispatchEvent(selectEvent);
            })
            this.template.querySelector('.fav').src = this.starChecked;
            this.checked = true;
            const selectEvent = new CustomEvent('showfavourite', {
                detail: this.candidateId
            });
            this.dispatchEvent(selectEvent);
        }
        else {
            removefavouriteCandidate({ candidate: event.currentTarget.dataset.id, userId: this.currentLoggingUser }).then(result => {
                console.log(result);
            }).catch(error => {
                console.log(error);
                this.template.querySelector('.fav').src = this.starChecked;
                this.checked = true;
                const selectEvent = new CustomEvent('showfavourite', {
                    detail: this.candidateId
                });
                this.dispatchEvent(selectEvent);
            })
            this.template.querySelector('.fav').src = this.starUnchecked;
            this.checked = false;
            const selectEvent = new CustomEvent('removefavourite', {
                detail: this.candidateId
            });
            this.dispatchEvent(selectEvent);
        }

    }

    @api bookmarkCheckValueCheckFromParent(contactId, val) {
        if (contactId == this.visibleContact.Id) {
            console.log('Contact Is Open');
            this.checked = val;
        }
    }


    @track recentChats = [{
        label: 'Jim Bob',
        name: 'Jim Bob',
    }];
    @api visibleContact = '';
    @api allContacts;
    mainchildbodyVisibility = true;

    @api showChat(recordId) {
        let tabFoundAndSet = false;
        this.template.querySelectorAll('.contactTab').forEach(element => {
            element.classList.remove('active');
            if (element.dataset.id == recordId) {
                console.log(' 339 Found');
                element.classList.add('active');
                this.allContacts.forEach(ele => {
                    if (ele.Id == recordId) {
                        this.visibleContact = ele;
                    }
                });
                tabFoundAndSet = true;
            }
        });
        console.log('line 349', tabFoundAndSet);
        if (tabFoundAndSet == false) {
            this.allContacts.forEach(element => {
                if (element.Id == recordId) {
                    this.visibleContact = element;
                    this.recentChats.push(element);
                }
            });
            setTimeout(() => {
                this.template.querySelector('.conInfoTabs').lastChild.classList.add('active');
            }, 100)
        }
        this.checkApplied();
        this.showCoverLetter();
        console.log('Checking Bookmark Status !');
        this.checkBookmark();



    }
    count = 0;
    renderedCallback() {
        console.log('inside render');
        if (this.currentFieldsOptions != undefined) {
            this.reorderComponents();
        }
        // this.template.querySelectorAll('.preferencesValue').forEach(ele => {
        //     console.log('392', ele.innerHTML);
        //     ele.innerHTML = ele.innerHTML.replaceAll(";", ", ");
        // })

        this.template.querySelectorAll('.textCss').forEach(currentItem => {
            if (currentItem.innerHTML == 'true') {
                currentItem.innerHTML = 'Yes';
            } else if (currentItem.innerHTML == 'false') {
                currentItem.innerHTML = 'No';
            }
        });
        if (this.count == 0) {
            this.recentChats = [this.visibleContact];
            this.template.querySelector('.conInfoTabs').style.display = 'flex';
            setTimeout(() => {
                this.template.querySelector('.contactTab').classList.add('active');
            }, 100)
            this.count = 1;
        }
        this.SetValueToConlistScroller();

    }

    @api resetRecentChat(rec) {
        // console.log('data=>',JSON.stringify(rec));
        // this.recentChats = rec;
    }

    @api controllFromParent() {
        this.template.querySelector('.backBtn').style.display = 'block';
        this.checkApplied();
    }

    showParentInfo() {
        const selectEvent = new CustomEvent('toggle', {
            detail: true
        });
        this.dispatchEvent(selectEvent);
    }

    @api getOpenTabsFromCompactView(ids) {
        // this.recentChats = [];
        // ids.forEach(element => {
        //     this.allContacts.forEach(ele => {
        //         if (ele.Id == element) {
        //             this.recentChats.push(ele);
        //         }
        //     });
        // });
        if (ids.length == 0) {
            this.visibleContact = this.allContacts[0];
            this.checkApplied();
            this.showCoverLetter();
        }
        else {
            this.recentChats = ids;
        }
    }

    inviteBtn = false;
    invitedBtn = false;
    hiredBtn = false;
    AcceptedBtn = false;
    DeclinedBtn = false;
    ContactedBtn = false;

    checkApplied() {

        this.getCareerRecords();
        this.showUserDetail();
        this.showCoverLetter();
        this.checkNotes();

        console.log('Checking Application Status :413 ');

        // console.log(JSON.stringify(this.visibleContact.Notes__r));
        //  this.visibleContact.Notes__r.forEach((element)=>{
        //   if (element.CreatedDate != undefined) {
        //          this.months[parseInt(element.CreatedDate.split('T')[0].split('-')[1]) - 1] + ' ' + element.CreatedDate.split('T')[0].split('-')[2] + ', ' + element.CreatedDate.split('T')[0].split('-')[0];
        //      }
        //  })


        this.candidateInfo = true;
        this.candidateChat = false;
        this.candidateApplicationHistory = false;


        if (this.visibleContact.Notes__r != undefined) {


        }
        if (this.visibleContact.Candidate_Jobs__r == undefined) {
            this.inviteBtn = true;
            this.invitedBtn = false;
            this.hiredBtn = false;
            this.AcceptedBtn = false;
            this.DeclinedBtn = false;
            this.ContactedBtn = false;
        }
        else {
            console.log('Checking Application Status : ');
            switch (this.visibleContact.Candidate_Jobs__r[0].Status__c) {
                case 'Invited':
                    this.inviteBtn = false;
                    this.invitedBtn = true;
                    this.hiredBtn = false;
                    this.AcceptedBtn = false;
                    this.DeclinedBtn = false;
                    this.ContactedBtn = false;
                    break;
                case 'Hired':
                    this.inviteBtn = false;
                    this.invitedBtn = false;
                    this.hiredBtn = true;
                    this.AcceptedBtn = false;
                    this.DeclinedBtn = false;
                    this.ContactedBtn = false;
                    break;
                case 'Contacted':
                    this.inviteBtn = false;
                    this.invitedBtn = false;
                    this.hiredBtn = false;
                    this.AcceptedBtn = false;
                    this.DeclinedBtn = false;
                    this.ContactedBtn = true;
                    break;
                case 'Invitation Accepted':
                    this.inviteBtn = false;
                    this.invitedBtn = false;
                    this.hiredBtn = false;
                    this.AcceptedBtn = true;
                    this.DeclinedBtn = false;
                    this.ContactedBtn = false;
                    break;
                case 'Invitation Declined':
                    this.inviteBtn = false;
                    this.invitedBtn = false;
                    this.hiredBtn = false;
                    this.AcceptedBtn = false;
                    this.DeclinedBtn = true;
                    this.ContactedBtn = false;
                    break;
                default:
                    this.inviteBtn = true;
                    this.invitedBtn = false;
                    this.hiredBtn = false;
                    this.AcceptedBtn = false;
                    this.DeclinedBtn = false;
                    this.ContactedBtn = false;
                    break;
            }
        }

        console.log('certificate boolean', this.certificateBoolean);



        if (this.visibleContact.Certificates__r) {
            this.certificateBoolean = true;
        }
        else {
            this.certificateBoolean = false;
        }
        if (this.visibleContact.Degree_Qualifications__r) {
            this.degreeBoolean = true;
        }
        else {
            this.degreeBoolean = false;
        }
        if (this.visibleContact.Relationship_Status__c) {
            this.relationshipInformation = true;
        }
        else {
            this.relationshipInformation = false;
        }
        if (this.visibleContact.Career_Activities__r) {
            this.extraCurricularBoolean = true;

        }
        else {
            this.extraCurricularBoolean = false;
        }
        if (tihs.visibleContact.Refereee__r) {
            this.referenceBoolean = true
        }
        else {
            this.referenceBoolean = false;
        }

    }
    checkNotes() {
        this.noteshere = [];
        checkCandidateNotes({ candidateId: this.visibleContact.Id })
            .then((result) => {
                console.log('line 567 : ', result);
                this.noteshere = result
                console.log('NoetsREsuts : ');
                result.map((element) => {

                })


                console.log(this.currentLoggingUserContactId);
                this.noteshere.forEach(element => {
                    if (element.CreatedDate != undefined) {

                        element.CreatedDate = this.months[parseInt(element.CreatedDate.split('T')[0].split('-')[1]) - 1] + ' ' + element.CreatedDate.split('T')[0].split('-')[2] + ', ' + element.CreatedDate.split('T')[0].split('-')[0];
                    }
                    console.log(element.CreatedDate);
                    console.log('element.Recruiter__c : ' + element.Recruiter__c);
                    if (element.Recruiter__c == this.currentLoggingUserContactId) {
                        console.log('True');
                        element.showActions = true;
                    }
                    else {
                        console.log('False');
                        element.showActions = false;
                    }
                })
            })
            .catch((err) => {
                console.log('Error 626 notes : ', err);
            })
        //         if(this.visibleContact.Notes__r){
        // this.noteshere = JSON.parse(JSON.stringify(this.visibleContact.Notes__r))
        //         }
        //         else{
        //             this.noteshere = [];
        //         }

    }

    getCareerRecords() {

        //console.log(this.visibleContact);
        console.log('contactId', this.visibleContact.Id);
        getCareer({ contactId: this.visibleContact.Id })
            .then((result) => {
                console.log('RESULT LINE 562 : ', result);
                if (result.careerAbsence) {
                    this.careerAbsenceData = result.careerAbsence;
                    if (result.careerAbsence.length > 0) {
                        this.absenceBoolean = true;
                    }
                    else {
                        this.absenceBoolean = false;
                    }
                }
                if (result.positionHeld) {
                    this.positionHeldData = result.positionHeld;
                    if (result.positionHeld.length > 0) {
                        this.careerHistoryBoolean = true;
                    }
                    else {
                        this.careerHistoryBoolean = false;
                    }


                }
                if (result.seekingPosition) {
                    this.seekingPositionData = result.seekingPosition;
                    if (result.seekingPosition.length > 0) {
                        this.seekingPosition = true
                    }
                    else {
                        this.seekingPosition = false;
                    }
                }
            })
            .catch((err) => {
                console.log('Error : ', err);
            })
    }
    backBtnClicked() {
        const customEvent = new CustomEvent('togglecomponents', { detail: false, bubbles: true });
        this.dispatchEvent(customEvent);
    }
    showUserDetail() {
        this.candidateInfo = true;
        this.candidateChat = false;
        this.candidateApplicationHistory = false;
        this.notesArea = false;
    }

    showChatArea() {
        this.candidateInfo = false;
        this.candidateChat = true;
        this.candidateApplicationHistory = false;
        this.notesArea = false;
    }

    showcandidateApplicationHistory() {
        this.candidateInfo = false;
        this.candidateChat = false;
        this.candidateApplicationHistory = true;
        this.notesArea = false;
    }

    showNotesArea() {
        this.candidateInfo = false;
        this.candidateChat = false;
        this.candidateApplicationHistory = false;
        this.notesArea = true;
    }

    SetValueToConlistScroller() {
        if (window.innerWidth > 700) {
            const customEvent = new CustomEvent('setconlistheight', { detail: this.template.querySelector('.innerScroller').offsetHeight, bubbles: true });
            this.dispatchEvent(customEvent);
        }
    }
    @api clearAllTabs() {
        this.recentChats = [];
    }
    @api addFirstTab(element) {
        this.recentChats = [];
        this.recentChats.push(element);
        console.log('Setting Fiest Active');
        console.log(this.template.querySelector('.contactTab'));
        setTimeout(() => {
            this.template.querySelector('.contactTab').classList.add('active');
        }, 0)
    }
    handleNotes(event) {
        console.log('inside handlenotes');
        // console.log( ‘Updated Value is ‘ + event.detail.value );
        this.noteText = event.detail.value;
    }
    createNotes() {
        this.noteText = this.template.querySelector('.addnote').value;
        console.log(this.noteText);
        if (this.actionType == 'Create') {
            console.log(this.noteText);
            createCandidateNotes({ candidateId: this.visibleContact.Id, recruiterId: this.currentLoggingUser, noteText: this.noteText })
                .then((result) => {
                    console.log('notesresult', result);
                    let note = result;
                    note.CreatedDate = note.CreatedDate = this.months[parseInt(note.CreatedDate.split('T')[0].split('-')[1]) - 1] + ' ' + note.CreatedDate.split('T')[0].split('-')[2] + ', ' + note.CreatedDate.split('T')[0].split('-')[0];
                    note.showActions = true;
                    console.log(this.noteshere);
                    this.noteshere.unshift(note);
                    this.hideAddNoteComponent();
                })
                .catch((err) => {
                    console.log('errcreate notes', err);
                })

        }
        if (this.actionType == 'Edit') {
            console.log('inside edit')
            editNote({ noteId: this.noteId, noteText: this.noteText, })
                .then((result) => {
                    console.log('success : ', result);
                    this.currentEditElement.parentElement.parentElement.querySelector('.noteText').innerHTML = this.noteText;
                    this.hideAddNoteComponent();
                })
                .catch((err) => {
                    console.log('failure : ', err);
                })
        }
    }

    actionType;

    showAddNoteComponent() {
        this.actionType = 'Create';
        this.noteText = '';
        this.template.querySelector('.addNotecomponent').style.display = 'block';
    }

    hideAddNoteComponent() {

        this.template.querySelector('.addNotecomponent').style.width = '0px';
        setTimeout(() => {
            this.template.querySelector('.addNotecomponent').style.display = 'none';
            this.template.querySelector('.addNotecomponent').style.width = '100%';
        }, 600);
    }
    deleteNote(event) {
        let elm = event.currentTarget.parentElement.parentElement;
        let id = event.currentTarget.dataset.id;
        console.log('delete : ', elm);
        let count = 0;
        let index;
        this.noteshere.forEach((element) => {
            if (element.Id == id) {
                index = count;
            }
            count++;
        })
        this.noteshere.splice(index,1);


        deleteNote({ noteId: id })
            .then((result) => {
                console.log(result);
                // this.noteshere.pop();
                elm.style.opacity = '0';

                setTimeout(() => {
                    elm.remove();
                }, 500);

            })
            .catch((err) => {
                console.log('line 750', err);
            })

    }

    currentEditElement;

    editNote(event) {
        this.actionType = 'Edit';
        this.currentEditElement = event.currentTarget;
        this.noteId = event.currentTarget.dataset.id;
        let editText = event.currentTarget.parentElement.parentElement.querySelector('.noteText').innerHTML;
        console.log(editText);
        this.noteText = editText
        this.template.querySelector('.addNotecomponent').style.display = 'block';
    }



    @track allFieldsAvailable = [
        { label: 'BASIC INFORMATION SUMMARY & EDUCATIONAL SUMMARY', value: 'basicInfoEduDetail' },
        { label: 'SEEKING POSITIONS', value: 'seekingPosition' },
        { label: 'JOB PREFERENCES', value: 'jobPreference' },
        { label: 'CAREER HISTORY', value: 'careerhistory' },
        { label: 'CAREER ABSENCES', value: 'careerAbsense' },
        { label: 'REFERENCES', value: 'reference' },
        { label: 'DEGREES/QUALIFICATIONS', value: 'degreeQualification' },
        { label: 'REGISTRATIONS/CERTIFICATE', value: 'registrationCertificate' },
        { label: 'CONTACT DETAILS & EMERGENCY CONTACT INFORMATION', value: 'contactDetails' },
        { label: 'MEDIA LINKS', value: 'mediaLinks' },
        { label: 'RELATIONSHIP INFORMATION', value: 'relationInfo' },
        { label: 'EXTRA CURRICULAR ACTIVITIES', value: 'extraCurricular' },
        { label: 'KEY RELATIONSHIPS AND FAMILY MEMBERS', value: 'keyRelationship' }
    ];


    @track currentFieldsOptions;
    @track allFieldsOptions = ['basicInfoEduDetail', 'seekingPosition', 'jobPreference', 'careerhistory', 'careerAbsense', 'reference', 'degreeQualification', 'registrationCertificate', 'contactDetails', 'mediaLinks', 'relationInfo', 'keyRelationship', 'extraCurricular'];

    @track tempSelectedValues = [];
    handleAddRemoveListOptionChanged(e) {
        this.tempSelectedValues = e.detail.value;
        console.log('SEL:', JSON.stringify(this.tempSelectedValues));
    }


    ReordeOptions = false;

    showReordeOptions() {
        this.tempSelectedValues = this.currentFieldsOptions;
        this.ReordeOptions = true;
    }

    closeReorderOptions() {
        this.ReordeOptions = false;
    }

    SubmitReorderOptions() {
        console.log('Submiting Data');
        this.currentFieldsOptions = this.tempSelectedValues;
        createDetailPageLayoutRecord({ userId: this.currentLoggingUser, values: JSON.stringify(this.currentFieldsOptions), layoutName: 'Detail Page' }).then(result => {
            console.log('RecordCreated');
        }).catch(error => {
            console.log(error);
        })
        this.reorderComponents();
        this.closeReorderOptions();
    }

    resetReorderOptions() {
        console.log('currentFieldsOptions : ' + this.currentFieldsOptions.length);
        console.log('allFieldsOptions : ' + this.allFieldsOptions.length);
        console.log('tempSelectedValues : ' + this.tempSelectedValues.length);
        this.currentFieldsOptions = this.allFieldsOptions;
        this.tempSelectedValues = this.currentFieldsOptions;
        console.log('currentFieldsOptions : ' + this.currentFieldsOptions.length);
        console.log('allFieldsOptions : ' + this.allFieldsOptions.length);
        console.log('tempSelectedValues : ' + this.tempSelectedValues.length);
    }

    reorderComponents() {
        for (let ind = 0; ind < this.currentFieldsOptions.length; ind++) {
            var ele = this.template.querySelector('.' + this.currentFieldsOptions[ind]);
            var parentElem = ele.parentElement;
            parentElem.insertBefore(ele, parentElem.children[ind]);
        }

        for (let ind = 0; ind < this.allFieldsOptions.length; ind++) {
            var ele = this.template.querySelector('.' + this.allFieldsOptions[ind]);
            if (this.currentFieldsOptions.includes(ele.dataset.class)) {
                ele.style.display = 'flex';
            }
            else {
                ele.style.display = 'none';
            }
        }


    }

}