import { LightningElement, wire, track, api } from 'lwc';
import userId from '@salesforce/user/Id';
import searchHeading from '@salesforce/resourceUrl/candidateSearchIcon';
import candidateJobs from '@salesforce/apex/candidateJobs.getJobs';
import fatchJobDetails from '@salesforce/apex/candidateJobs.getFullDetails'
import getAccountData from '@salesforce/apex/candidateJobs.getAccountData';
import getDataOnRoles from '@salesforce/apex/candidateJobs.getDataOnRoles';
//import mathTeacherIcon from '@salesforce/resourceUrl/MathTeacherResultIcon';

export default class JobUI extends LightningElement {
        bestMatchJob = ['one', 'two', 'three', 'four', 'five'];
        loader = true;
        initialComponantHide = false;

        //  Retrive Icon from Static Resouce and show on Header of Candidate search 
        inviteButtonIcon = searchHeading + '/ISSV2/Group90.png';
        checked = searchHeading + '/ISSV2/Group76.png';
        query = searchHeading + '/ISSV2/Group89.png';
        question = searchHeading + '/ISSV2/Group88.png'
        groups = searchHeading + '/ISSV2/Group98.png';
        invites = searchHeading + '/ISSV2/Group144.png';
        email = searchHeading + '/ISSV2/Group145.png';
        cancle = searchHeading + '/ISSV2/Group146.png';
        barchart1 = searchHeading + '/ISSV2/Group147.png';
        barchart2 = searchHeading + '/ISSV2/Group148.png';
        addUser = searchHeading + '/ISSV2/Group149.png';

        // reterive Icon from static resource and show on best search on job 
        rectangleImage = searchHeading + '/ISSV2/Rectangle.png';
        hatImage = searchHeading + '/ISSV2/Group66.png';
        locationImage = searchHeading + '/ISSV2/Group65.png';
        noData = false;
        country = ['rome', 'egypt', 'england', 'United State'];
        jobsData = [];
        JobFullDetails = [];
        value = {};
        jobPosition = [];
        sizeOfJobList;
        allusers = [];
        copyOfJobData = [];
        @track usersearch = "";
        showLeftList;
        flagToHideFilter = false;

        connectedCallback() {
                if (window.innerWidth < 768) {
                        this.showLeftList = true;
                }
                else {
                        this.showLeftList = false;
                }
                console.log('Inside connected');
                window.addEventListener('resize', this.getScreenSize);

        }

        getScreenSize = () => {
                if (window.innerWidth < 768) {
                        this.showLeftList = true;
                }
                else {
                        this.showLeftList = false;
                }
                // console.log('ScreenSize: ',this.screenSize);
                // console.log('Size: ',window.innerWidth);
        }
        getClick(event) {

                let getid = event.currentTarget.id;
                let subsgetid = getid.substring(0, 18);
                console.log('get id ', subsgetid);
                fatchJobDetails({ recordId: subsgetid })
                        .then(res => {
                                console.log('res ', res);
                                this.value = res;
                        })

        }
        handleClick(event) {
                console.log('click2', event.currentTarget.id);
                let getid = event.currentTarget.id;
                let subsgetid = getid.substring(0, 18);
                console.log('get id ', subsgetid);
                fatchJobDetails({ recordId: subsgetid })
                        .then(res => {
                                console.log('res ', res);
                                this.value = res;
                        })
                // console.log('click', event.target.dataset.Id);
                console.log('After');
                this.template.querySelector('.mobile-job-dropdown2').style.display = 'none';
                this.template.querySelector('.slds-col.right').style.display = 'block';
                console.log('Before');
        }

        @wire(candidateJobs)
        wiredJobs({ error, data }) {
                if (data) {
                        let Position = [];
                        this.jobsData = data.listOfJobs;
                        this.sizeOfJobList = data.listOfJobs.length;
                        console.log('size  of array ', this.sizeOfJobList);
                        console.log('get array ', this.jobsData[0]);
                        this.value = this.jobsData[0];;
                        console.log('this jobsdata ', this.jobsData);
                        this.copyOfJobData = this.jobsData;
                        //this.template.querySelector('.filter-wrapper').style.display = 'none';
                        console.log('current logging use r' + this.currentLoggingUser);

                        console.log('map', this.mapForApplicant);

                        //this code for open view jobs combobox 
                        data.listOfOpenJobs.forEach(element => {
                                Position.push({ label: element, value: element });
                        });
                        this.jobPosition = Position;
                        this.initialComponantHide = true;

                        this.loader = false;

                } else if (error) {
                        console.log('error ', error);
                        this.loader = false;
                }
        }

        handleKeyUp(evt) {
                //this.queryTerm = evt.target.value;
                //console.log();
                let searchTxt = evt.target.value;
                console.log('search txt => ', searchTxt);
                getAccountData({ searchfields: searchTxt })
                        .then(res => {
                                console.log('res ', res);

                                if (searchTxt == '') {
                                        this.jobsData = this.copyOfJobData;

                                }
                                else {
                                        this.jobsData = res;
                                        this.sizeOfJobList = res.length;


                                }
                        })

        }
        handleJobPosition(event) {
                if (event.detail.value == 'View Open Jobs' || event.target.value == 'None') {
                        this.jobsData = this.copyOfJobData;
                        console.log('copy of jobsDtaa ', this.copyOfJobData);
                        this.value = this.copyOfJobData[0];
                        this.sizeOfJobList = this.copyOfJobData.length;
                        this.noData = false;
                }
                else {
                        getDataOnRoles({ role: event.detail.value })
                                .then(res => {
                                        console.log('res ', res);
                                        if (res.length == 0) {
                                                this.noData = true;
                                                this.sizeOfJobList = res.length;
                                        }
                                        else {
                                                this.jobsData = res;
                                                this.value = this.jobsData[0];
                                                this.sizeOfJobList = res.length;
                                                console.log('value ', this.value);
                                                this.noData = false;
                                        }

                                })
                }

        }
        passToParent(event) {
                console.log('coming from child => ', event.detail);
                this.template.querySelector('.mobile-job-dropdown2').style.display = 'block';
                this.template.querySelector('.slds-col.right').style.display = 'none';
        }
        //     showMoreFilter(event){
        //         console.log('show more filter');
        //         if(this.flagToHideFilter == true) {
        //                 this.template.querySelector('.filter-wrapper').style.display = 'none';
        //                 this.flagToHideFilter = false;
        //         }
        //         else {
        //                 this.template.querySelector('.filter-wrapper').style.display = 'flex';
        //                 this.flagToHideFilter = true;
        //         }

        //     }




}