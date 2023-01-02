import { LightningElement, wire, track } from 'lwc';
import filterIcon from '@salesforce/resourceUrl/FilterIcon';
import teacherBoard from '@salesforce/resourceUrl/teacherBoardData';
import searchHeading from '@salesforce/resourceUrl/candidateSearchIcon';
import Id from '@salesforce/user/Id';
import getAllCount from '@salesforce/apex/candidateSchoolSearch.getAllUserCount';
import getuserdetails from '@salesforce/apex/candidateSchoolSearch.getUserDetails';
import searchSchoolData from '@salesforce/apex/candidateSchoolSearch.searchSchoolData';
import getFilterData from '@salesforce/apex/candidateSchoolSearch.getFilterData';
import fatchAccountDetails from '@salesforce/apex/candidateSchoolSearch.fatchAccountDetails';
import getJOBFilters from '@salesforce/apex/candidateSchoolSearch.getJOBFilters';

export default class SchoolSearch extends LightningElement {
    modalFiltersForPillsView = [];
    notVisatype = false;
    copyofAllcount;
    primaryCount = 0;
    morefilterCount = 0;
    regionFilterList = []
    regionOrgFilterList = [];
    regionPlaceHolder = 'Region';
    regionOrgPlaceHolder = 'Regional Organization'
    visaPlaceholder = 'Visa Type';
    visaRestrictionString = ''
    visaTypeString = '';
    countryPlaceHolder = 'Country';
    schoolTypePlaceHolder = 'School Type';
    classSizePlaceHolder = 'Class-Size'
    schoolNamePlaceHolder = 'School Name'
    loader = true;
    moreFiltersVisibility = true;
    userId = Id;
    firstAccountId;
    filterIcons = filterIcon;
    board = teacherBoard;
    rectangleImage = searchHeading + '/ISSV2/Rectangle.png';
    groups = searchHeading + '/ISSV2/Group98.png';
    hatImage = searchHeading + '/ISSV2/Group66.png';
    locationImage = searchHeading + '/ISSV2/location.png';
    bestMatchJob = ['one', 'two', 'three', 'three', 'three', 'three', 'three'];
    value = [];
    contryvalue = {};
    listOfJobs = [];
    seechildCompo = false;
    classId = 'Class_Size__c';
    countryId = 'Country__c';
    schoolId = 'School_Type__c';
    mainString = ''
    countryString = ''
    schoolNameString = ''
    schoolTypeString = ''
    countSelectedFilter = 0
    regionalOrganizationString = ''
    months = ['Jan', 'Feb', 'March', 'April', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
    limitSize = 50;
    offset = 0;
    loaderInner = false;
    seeClear = false;

    schoolList = [];
    Schoolname = '';
    accountData = [];
    sizeOfSchool;
    listOfCountry = [];
    listOfClassSize = [];
    idofclass = '';
    valueofclass = '';
    idofcountry = '';
    valueofCountry = '';
    filterData = [];
    copyOfAccountData = [];
    seeError = false;
    copyOfCountryList = [];
    copyOfSchoolView = [];
    schoolViewType = [];
    region = []
    regionalOrg = [];
    countryListFilter = [];
    schoolNameListFilter = [];
    schoolTypeListFilter = [];
    countryViewList = this.copyOfCountryList;
    totalList = [];
    classSizeListFilter = []
    showmoredata = true;
    checkChildListSize = false;
    bookmarks = '';
    schoolName = []
    regionString = '';
    regionOrgString = '';
    maintainOrderList = [];
    get selectedValues() {
        return this.value.join(',');
    }
    handleChange(e) {
        this.value = e.detail.value;
    }
    sortingOption = [
        { label: 'BEST MATCHES', value: 'BEST MATCHES' },
        { label: 'Alphabetical A-Z', value: 'Alphabetical A-Z' },
        { label: 'Alphabetical Z-A', value: 'Alphabetical Z-A' },

    ];

    visaType = [{
        label: 'No Preference',
        value: 'No Preference'
    },
    {
        label: 'Yes',
        value: 'Yes'
    },
    {
        label: 'No',
        value: 'No'
    }
    ];
    // regionalOrg = [
    //     { label: 'lolani School Edited By Admin', value: 'lolani School Edited By Admin' },
    //     { label: '3e International School', value: '3e International School' },
    //     { label: 'ACG School Jakarta', value: 'ACG School Jakarta' },
    //     { label: 'AISVN', value: 'AISVN' },
    //     { label: 'Abaarso School', value: 'Abaarso School' }
    // ]



    handleChange(e) {
        this.value = e.detail.value;
    }


    handleCmpHeight(event) {
        // // console.log('OUTPUT : 129', this.template.querySelector('.schoollist').style.height = (event.detail - 70) + 'px');
        this.template.querySelector('.schoollist').style.height = (event.detail - 80) + 'px';
    }

    loadmoredata() {

        let temp1 = this.template.querySelector('.schoollist');
        let totalscrollHeight = temp1.scrollHeight;
        let offSetHeight = temp1.parentNode.offsetHeight;

        var scrollbarheight = temp1.parentNode.offsetHeight - temp1.offsetHeight;
        let scrollY = temp1.scrollTop
        if (this.mainString != '') {
            this.offset = 0;
        }

        if (totalscrollHeight < temp1.offsetHeight + scrollY + 1) {
            this.loaderInner = true;
            // // console.log('into the if', this.limitSize, this.offset)
            this.offset = this.offset + this.limitSize;
            getFilterData({
                mainStringValues: this.mainString,
                limitsize: this.limitSize,
                offset: this.offset
            })
                .then(res => {
                    // // console.log('OUTPUT ---->>>1124: ', res);

                    this.accountData = this.accountData.concat(res);
                    //this.sizeOfSchool = this.accountData.length ;
                    this.sizeOfSchool = this.mainString != '' ? this.accountData.length : this.AllCount;

                    // // console.log('OUTPUT : ',this.sizeOfSchool);
                    if (this.sizeOfSchool == 0) {
                          this.seechildCompo = false;
                          this.seeError = true;
                        this.loaderInner = false;
                    }

                    else {
                        this.loaderInner = false;
                        this.seechildCompo = true;
                        this.seeError = false;
                    }
                   
                }).catch(err => {
                    // // console.log('ERROR-->', JSON.stringify(err.message))
                    // thisseeError = true;
                })
        }
    }
    @wire(getAllCount)
    wireAllCount({
        data, error
    }) {
        if (data) {
            // // console.log('All Count => '+data);
            this.AllCount = data;
            //this.copyofAllcount = data ;
            this.sizeOfSchool = this.AllCount;

        }
    }

    @wire(getuserdetails)
    wiredAccount({
        data,
        error
    }) {
        if (data) {
            // // console.log('data => ', data);
            // // console.log('OUTPUT data : ', data);
            this.accountData = data.getSchool;

            // // console.log('accountData', this.accountData);
            this.copyOfAccountData = this.accountData;
            this.copyOfSchoolView = this.copyOfAccountData;
            //this.sizeOfSchool = this.accountData.length;
            this.value = this.accountData[0];
            this.firstAccountId = this.accountData[0].Id;
            if (this.accountData[0].length != 0) {
                this.seechildCompo = true;
            }


            this.listOfJobs = data.getSchoolJob;
            //this.getClick1();   




            if (data.getSchoolJob.length > 0) {
                //  try{
                // console.log('OUTPUT : list is ', data.getSchoolJob);
                this.checkChildListSize = false
            } else {
                this.checkChildListSize = true;
            }



            data.getSchool.forEach(element => {
                this.schoolName.push({
                    label: element.Name,
                    value: element.Name
                });
            });
            this.schoolName = JSON.parse(JSON.stringify(this.schoolName));
            // // console.log('OUTPUT :school name  ', this.schoolName);

            data.getCountry.forEach(element => {
                this.listOfCountry.push({
                    label: element,
                    value: element
                });
                this.copyOfCountryList.push({
                    label: element,
                    value: element,
                    checked: 'unchecked'
                });
            });
            data.getClassSize.forEach(element => {
                this.listOfClassSize.push({
                    label: element,
                    value: element
                });
            });
            this.listOfClassSize = JSON.parse(JSON.stringify(this.listOfClassSize));

            data.getSchoolType.forEach(element => {
                this.schoolList.push({
                    label: element,
                    value: element
                });
            });
            this.schoolList = JSON.parse(JSON.stringify(this.schoolList));
            this.schoolViewType = this.schoolList;

            data.getRegion.forEach(element => {
                this.region.push({
                    label: element,
                    value: element
                });
            });
            this.region = JSON.parse(JSON.stringify(this.region));

            data.getRegionOrg.forEach(element => {
                this.regionalOrg.push({
                    label: element,
                    value: element
                });
            });
            this.regionalOrg = JSON.parse(JSON.stringify(this.regionalOrg));
            this.loader = false;




        } else {
            // // console.log('error ', error);
            //this.loader = false;
        }
    }
    // connectedCallback() {
    //     //code
    //      // console.log('OUTPUT : connected call back',this.listOfJobs);
    //      //this.loader = false;   
    //      var jobList = this.listOfJobs;
    //     //  jobList.forEach(element => {
    //     //         //var mydate = new Date(element.Job_Role_Start_Date__c);
    //     //         // // console.log(element.Job_Role_Start_Date__c);
    //     //         element.Job_Role_Start_Date__c = this.months[parseInt(element.Job_Role_Start_Date__c.split('T')[0].split('-')[1]) - 1] + ' ' + element.Job_Role_Start_Date__c.split('T')[0].split('-')[2] + ', ' + element.Job_Role_Start_Date__c.split('T')[0].split('-')[0];
    //     //         // // console.log(element.Job_Role_Start_Date__c);
    //     //         element.CreatedDate = 'Posted: ' + this.months[parseInt(element.CreatedDate.split('T')[0].split('-')[1]) - 1] + ' ' + element.CreatedDate.split('T')[0].split('-')[2] + ', ' + element.CreatedDate.split('T')[0].split('-')[0];
    //     //     });   

    //     //      // console.log('OUTPUT : connected call back',jobList)
    //     // this.listOfJobs =  jobList;
    // }

    getClick(event) {
        // // console.log('get id called');
        let getid = event.currentTarget.id;
        this.subsgetid = getid.substring(0, 18);
        // // console.log('get id ', subsgetid);
        fatchAccountDetails({
            recordId: this.subsgetid
        })
            .then(res => {
                try {

                    // // console.log('res ', res);
                    this.value = res.getSchoolDetail;
                    // // console.log('OUTPUT 142: ', res.getSchoolDetail.Activity_Tracker__r);
                    if (res.getSchoolDetail.Activity_Tracker__r == undefined) {
                        //this.bookmarks = '' ;
                        this.bookmarks = '';
                        // // console.log('OUTPUT tracker: ', this.bookmarks);
                    } else {
                        this.bookmarks = res.getSchoolDetail.Activity_Tracker__r;
                        // // console.log('OUTPUT in else 145 : ', this.bookmarks);
                    }
                    // // console.log('OUTPUT 150: ', );
                    res.getSchoolJob.forEach(element => {
                        //var mydate = new Date(element.Job_Role_Start_Date__c);
                        // // console.log(element.Job_Role_Start_Date__c);
                        element.Job_Role_Start_Date__c = this.months[parseInt(element.Job_Role_Start_Date__c.split('T')[0].split('-')[1]) - 1] + ' ' + element.Job_Role_Start_Date__c.split('T')[0].split('-')[2] + ', ' + element.Job_Role_Start_Date__c.split('T')[0].split('-')[0];
                        // // console.log(element.Job_Role_Start_Date__c);
                        element.CreatedDate = 'Posted: ' + this.months[parseInt(element.CreatedDate.split('T')[0].split('-')[1]) - 1] + ' ' + element.CreatedDate.split('T')[0].split('-')[2] + ', ' + element.CreatedDate.split('T')[0].split('-')[0];


                    });
                    // // console.log('OUTPUT :157  ', res.getSchoolJob);
                    if (res.getSchoolJob.length == 0) {
                        this.checkChildListSize = true;
                        this.listOfJobs = res.getSchoolJob;
                        const objChild = this.template.querySelector('c-school-Searchchild');
                        objChild.processParentData(this.listOfJobs, this.bookmarks);
                    } else {
                        // // console.log('OUTPUT : ', this.listOfJobs);
                        this.checkChildListSize = false;
                        this.listOfJobs = res.getSchoolJob;
                        const objChild = this.template.querySelector('c-school-Searchchild');
                        objChild.processParentData(this.listOfJobs, this.bookmarks);

                    }
                } catch (err) {
                    // // console.log('OUTPUTerr  : ', err);
                }

            })

        this.template.querySelector('.show-childCmp').style.display = 'block';
    }



    getClick1(subsId) {
        // // console.log('get id called');
        //let getid = event.currentTarget.id;
        // console.log('OUTPUT : 367', subsId);
        fatchAccountDetails({
            recordId: subsId
        })
            .then(res => {
                try {

                    // // console.log('res ', res);
                    this.value = res.getSchoolDetail;
                    // // console.log('OUTPUT 142: ', res.getSchoolDetail.Activity_Tracker__r);
                    if (res.getSchoolDetail.Activity_Tracker__r == undefined) {
                        //this.bookmarks = '' ;
                        this.bookmarks = '';
                        // // console.log('OUTPUT tracker: ', this.bookmarks);
                    } else {
                        this.bookmarks = res.getSchoolDetail.Activity_Tracker__r;
                        // // console.log('OUTPUT in else 145 : ', this.bookmarks);
                    }
                    // console.log('OUTPUT 150: ');
                    res.getSchoolJob.forEach(element => {
                        //var mydate = new Date(element.Job_Role_Start_Date__c);
                        // // console.log(element.Job_Role_Start_Date__c);
                        element.Job_Role_Start_Date__c = this.months[parseInt(element.Job_Role_Start_Date__c.split('T')[0].split('-')[1]) - 1] + ' ' + element.Job_Role_Start_Date__c.split('T')[0].split('-')[2] + ', ' + element.Job_Role_Start_Date__c.split('T')[0].split('-')[0];
                        // // console.log(element.Job_Role_Start_Date__c);
                        element.CreatedDate = 'Posted: ' + this.months[parseInt(element.CreatedDate.split('T')[0].split('-')[1]) - 1] + ' ' + element.CreatedDate.split('T')[0].split('-')[2] + ', ' + element.CreatedDate.split('T')[0].split('-')[0];


                    });
                    // console.log('OUTPUT :157  ', res.getSchoolJob);
                    if (res.getSchoolJob.length == 0) {
                        // console.log('OUTPUT : when their no jobs');
                        this.checkChildListSize = true;
                        this.listOfJobs = res.getSchoolJob;
                        const objChild = this.template.querySelector('c-school-Searchchild');
                        objChild.processParentData(this.listOfJobs, this.bookmarks);
                    } else {
                        // // console.log('OUTPUT : ', this.listOfJobs);
                        // console.log('OUTPUT : in else');
                        this.checkChildListSize = false;
                        this.listOfJobs = res.getSchoolJob;
                        const objChild = this.template.querySelector('c-school-Searchchild');
                        objChild.processParentData(this.listOfJobs, this.bookmarks);
                        // console.log('OUTPUT : end of else');
                    }
                    this.loader = false;
                } catch (err) {
                    // console.log('OUTPUTerr  : ', err);
                }

            })

        this.template.querySelector('.show-childCmp').style.display = 'block';
    }

    passToParent(event) {
        // // console.log('coming from child => ', event.detail);
        this.template.querySelector('.child-show-dropdown').style.display = 'block';
        this.template.querySelector('.show-childCmp').style.display = 'None';
    }

    // showFilter1Option = false;
    // showFilter2Option = false;
    // showFilter3Option = false;

    showOption1() {
        // // console.log('OUTPUT : clicked show optin 1');
        this.template.querySelector('.optionsOverlay').style.height = '100%';
        this.template.querySelector('.optionsOverlay').style.width = `${(window.innerWidth) - 20}px`;
        this.template.querySelector('.optionsOverlay').style.zIndex = '10';
        this.template.querySelector('.optionsFields').style.zIndex = '11';


        this.template.querySelector('.options1').style.display = 'block';
        this.template.querySelector('.options2').style.display = 'none';
        this.template.querySelector('.options3').style.display = 'none';

    }
    closeShowOption1() {
        this.showFilter1Option = false;
    }
    showOption2() {
        // // console.log('class size = > ', this.template.querySelector('.schoolTypefilter').value);
        this.template.querySelector('.optionsOverlay').style.height = '100%';
        this.template.querySelector('.optionsOverlay').style.width = `${(window.innerWidth) - 20}px`;
        this.template.querySelector('.optionsOverlay').style.zIndex = '10';
        this.template.querySelector('.optionsFields').style.zIndex = '11';

        this.template.querySelector('.options1').style.display = 'none';
        this.template.querySelector('.options2').style.display = 'block';
        this.template.querySelector('.options3').style.display = 'none';
        // this.template.querySelector('.options4').style.display = 'none';
        // this.template.querySelector('.options5').style.display = 'none';
    }
    showOption3() {
        // // console.log('showOption3', this.template.querySelector('.classSizefilter').value);
        this.template.querySelector('.optionsOverlay').style.height = '100%';
        this.template.querySelector('.optionsOverlay').style.width = `${(window.innerWidth) - 20}px`;
        this.template.querySelector('.optionsOverlay').style.zIndex = '10';
        this.template.querySelector('.optionsFields').style.zIndex = '11';
        this.template.querySelector('.options1').style.display = 'none';
        this.template.querySelector('.options2').style.display = 'none';
        this.template.querySelector('.options3').style.display = 'block';
    }
    showOption(event) {
        this.template.querySelector('.optionsOverlay').style.height = '100%';
        this.template.querySelector('.optionsOverlay').style.width = `${(window.innerWidth) - 20}px`;
        this.template.querySelector('.optionsOverlay').style.zIndex = '10';
        this.template.querySelector('.optionsFields').style.zIndex = '11';
        let options = this.template.querySelectorAll('.cmbOptions');
        // // console.log('OUTPUT : ', options);
        options.forEach(ele => {
            // // console.log(ele.parentElement.classList + ' == ' + event.currentTarget.parentElement.parentElement.parentElement.classList);
            if (ele.parentElement.classList == event.currentTarget.parentElement.parentElement.parentElement.classList) {
                if (ele.style.display == 'none') {
                    this.template.querySelector('.optionsOverlay').style.display = 'block';
                    ele.style.display = 'block';
                } else {
                    this.template.querySelector('.optionsOverlay').style.display = 'none';
                    ele.style.display = 'none';
                }
            } else {
                ele.style.display = 'none';
            }
        })
    }

    modalOptionsOverlayClicked() {
        this.template.querySelectorAll('.moreFilterOptions').forEach(ele => {
            ele.style.display = 'none';
        })
        this.template.querySelector('.modalOptionsOverlay').style.display = 'none';
    }
    showOptionMoreFilter(event) {
        let optionsSelected = [];

        this.template.querySelector('.modalOptionsOverlay').style.display = 'block';
        this.template.querySelector('.optionsOverlay').style.height = '100%';
        this.template.querySelector('.optionsOverlay').style.width = `${(window.innerWidth) - 20}px`;
        this.template.querySelector('.optionsFields').style.zIndex = '11';
         this.template.querySelector('.optionsOverlay').style.zIndex = '10';
        this.template.querySelector('.morefiltersModalOverlay').style.display = 'none';
        

        switch (event.currentTarget.parentElement.parentElement.parentElement.querySelector('.inputBar').placeholder) {
            case 'School Name':
             
             console.log('OUTPUT : coming in swithc');
                optionsSelected = this.schoolNameListFilter;
                break;
            case 'Visa Type':

                optionsSelected = this.visaTypeString;
                // // console.log('OUTPUT : coming in switch case');
                break;
            case 'Region':
                optionsSelected = this.regionFilterList
                break;
            case 'Regional Organization':
                optionsSelected = this.regionOrgFilterList;
                break;
            default:
                break;
        }
        if (event.currentTarget.parentElement.parentElement.parentElement.querySelector('.inputBar').placeholder.includes('School Name')) {

            console.log('OUTPUT : coming in if');
            optionsSelected = this.schoolNameListFilter;
        }
        if (event.currentTarget.parentElement.parentElement.parentElement.querySelector('.inputBar').placeholder.includes('Visa Type')) {
            optionsSelected = this.visaTypeString;
            // // console.log('OUTPUT 339: ', this.visaPerference);
        }
        if (event.currentTarget.parentElement.parentElement.parentElement.querySelector('.inputBar').placeholder.includes('Region')) {
            optionsSelected = this.regionFilterList;
        }
        if (event.currentTarget.parentElement.parentElement.parentElement.querySelector('.inputBar').placeholder.includes('Regional Organization')) {
            optionsSelected = this.regionOrgFilterList;
        }
        if (event.currentTarget.parentElement.parentElement.parentElement.querySelector('.inputBar').placeholder.includes('Country')) {
            optionsSelected = this.countryListFilter;

        }
        if (event.currentTarget.parentElement.parentElement.parentElement.querySelector('.inputBar').placeholder.includes('School Type')) {
            optionsSelected = this.schoolTypeListFilter;
        }

        // console.log('checkOptions', typeof optionsSelected, JSON.stringify(optionsSelected))
        optionsSelected = typeof optionsSelected == 'string' ? optionsSelected.split(',') : optionsSelected;
        // console.log('OUTPUT 331: ', optionsSelected);

        let options = this.template.querySelectorAll('.moreFilterOptions');
        options.forEach(ele => {
            // // console.log('OUTPUT ----  : ',ele.parentElement.classList);
            if (ele.parentElement.classList == event.currentTarget.parentElement.parentElement.parentElement.classList) {
                if (ele.style.display == 'none') {
                    try {
                        // console.log('OUTPUT :498 ', ele.parentElement.classList);
                        ele.style.display = 'block';
                        
                        ele.querySelectorAll('span').forEach(element => {
                            
                            if(element.parentElement.querySelector('input').value  == 'Yes' || element.parentElement.querySelector('input').value  == 'No' || element.parentElement.querySelector('input').value  == 'No Preference'){
                                element.parentElement.querySelector('input').type = "radio";
                                element.parentElement.querySelector('input').name = "visaType";
                             } 
                            

                            // console.log('OUTPUT : check 596');
                            var opStr = optionsSelected.join();
                            opStr = opStr.trim();

                            var elementData = element.innerHTML;
                            // console.log(opStr);
                            // console.log('elementData-->', elementData);

                            // console.log(optionsSelected.includes(elementData.trim()));
                            if (optionsSelected.includes(elementData.trim())) {
                                element.parentElement.querySelector('input').checked = true;
                            } else {
                                element.parentElement.querySelector('input').checked = false;
                            }


                        })

                        //  }
                    } catch (err) {
                        // // console.log('OUTPUT : err', err);
                    }
                } else {
                    ele.style.display = 'none';
                }
            } else {
                ele.style.display = 'none';
            }
        })
        // this.template.querySelector('.optionsOverlay').style.zIndex = '-1';
    }

    optionsOverlayClicked() {

        this.template.querySelector('.options1').style.display = 'none';
        this.template.querySelector('.options2').style.display = 'none';
        this.template.querySelector('.options3').style.display = 'none';
        this.template.querySelector('.optionsOverlay').style.zIndex = '-1';
        this.template.querySelector('.bestmatchSorting').style.display = 'none';
        this.template.querySelector('.innerBox').style.display = 'none';
        // // console.log('line 426')
        // this.template.querySelector('.extraPills').style.display = 'none';



    }
    handleChangeFilter() {
        // // // console.log('class type ' , this.template.querySelector('.classSizefilter').value , 'school type ' ,  this.template.querySelector('.schoolTypefilter').value  , 'country => ' , this.template.querySelector('.couuntryfilter').value );
        getJOBFilters({
            class_size: this.template.querySelector('.classSizefilter').value,
            school_type: this.template.querySelector('.schoolTypefilter').value,
            Country: this.template.querySelector('.countryPrimaryFilter').value
        }).then(result => {
            // // console.log('filter result==>', result);
            // // console.log('handle change result==>', result.length);
            if (result.length == 0) {
                 this.seechildCompo = false;
                 this.seeError = true;
            } else {
                this.seeError = false;
                this.seechildCompo = true;
            }
            this.dataJobs = [];
            this.dataJobs = JSON.parse(JSON.stringify(result));
            this.accountData = JSON.parse(JSON.stringify(result));
            this.bestMatchJob = JSON.parse(JSON.stringify(this.dataJobs));
            this.sizeOfSchool = this.accountData.length;
            // // // console.log('this.bestMatchJob=>',JSON.stringify(this.bestMatchJob));
            if (this.bestMatchJob == [] || this.bestMatchJob == null || this.bestMatchJob.length == 0 || this.bestMatchJob == 'undefined') {
                this.value = 'undefined';
                // // console.log('ifCondition value send===>', JSON.stringify(this.value));
                this.template.querySelector('school-Searchchild').checkGetRecord(this.value);

            } else {

                this.value = JSON.parse(JSON.stringify(this.bestMatchJob[0]));
                // // console.log('elseCondition value send===>', JSON.stringify(this.value));
                this.template.querySelector('school-Searchchild').checkGetRecord(this.value);
            }

            // // console.log('this.value=>', JSON.stringify(this.value));
        }).catch(error => {
            // // console.log(error);
        })
    }
    showMoreFilters() {
        this.template.querySelector('.morefiltersModal').style.display = 'block';
        this.template.querySelector('.morefiltersModalOverlay').style.display = 'block';
        // this.template.querySelector('.optionsOverlay').style.zIndex = '-1';
        // this.moreFiltersVisibility = true;

    }
    hideMoreFilter() {
        this.template.querySelector('.morefiltersModal').style.top = '-60vh';
        this.template.querySelector('.morefiltersModalOverlay').style.opacity = '0';
        setTimeout(() => {
            this.template.querySelector('.morefiltersModal').style.display = 'none';
            this.template.querySelector('.morefiltersModalOverlay').style.display = 'none';
            this.template.querySelector('.morefiltersModal').style.top = '10vh';
            this.template.querySelector('.morefiltersModalOverlay').style.opacity = '0.5';
        }, 600);
    }




    //variables for more filter 



    // functionality for more filter 

    //  Country Filter working 

    searchCountry(event) {

        let total;
        let removed = 0;
        try {
            // console.log('OUTPUT : ', event.currentTarget.value);

            this.template.querySelectorAll('.countrycheck').forEach(element => {
                element.style.visibility = 'visible';
                element.style.position = 'relative';
                if (!(element.querySelector('.checkCountry').innerHTML.toLowerCase().includes(event.target.value.toLowerCase()))) {
                    // // // console.log('Matched ! : ' + element.querySelector('.conatactName').innerHTML.toLowerCase() );
                    element.style.visibility = 'hidden';
                    element.style.position = 'absolute';
                }

            });
            // this.template.querySelector('.hideDiv').style.display= 'block';
        } catch (err) {
            // // console.log('OUTPUT : ', err);
        }
    }
    selectedCheck(evt) {
        var checkBoolean = evt.target.checked
        var checkValue = evt.target.value;

        if (checkBoolean == true) {
            this.countryListFilter.push(checkValue);
        }
        if (checkBoolean == false) {
            let count;
            let index = 0;
            this.countryListFilter.forEach(element => {
                if (element == checkValue) {
                    // // console.log('OUTPUT : element => ', element, 'uncheck => ', checkValue);
                    // index = count ;
                    // // // console.log('OUTPUT : ', this.countryListFilter.indexOf(checkValue));
                    // // console.log('OUTPUT : ', this.countryListFilter);
                    this.countryListFilter.splice(this.countryListFilter.indexOf(checkValue), 1);
                    // // console.log('OUTPUT :after splice  ', this.countryListFilter);
                }
                // count ++ ; 
            })
        }
    }
    classSizeSelected(evt) {
        var checkBoolean = evt.target.checked
        var checkValue = evt.target.value;
        if (checkBoolean == true) {
            this.classSizeListFilter.push(checkValue);
        }
        if (checkBoolean == false) {
            let count;
            let index = 0;
            this.classSizeListFilter.forEach(element => {
                if (element == checkValue) {
                    index = count;
                }
                count++;
            })
            this.classSizeListFilter.splice(index, 1);
        }
        // this.totalList.push(this.countryListFilter);

    }

    // School Name  More filter functionality 

    searchSchoolMorefilter(event) {
        this.template.querySelectorAll('.schoolNamecss').forEach(element => {
            element.style.visibility = 'visible';
            element.style.position = 'relative';
            // // console.log('= > : ', element.querySelector('.schoolNameCheckbox').innerHTML.toLowerCase(), '= ', event.target.value.toLowerCase());
            if (!(element.querySelector('.schoolNameCheckbox').innerHTML.toLowerCase().includes(event.target.value.toLowerCase()))) {
                // // // console.log('Matched ! : ' + element.querySelector('.conatactName').innerHTML.toLowerCase() );
                element.style.visibility = 'hidden';
                element.style.position = 'absolute';
            }
        });
    }
    selectcheckFormorefilter(evt) {
        try {



            // // // console.log('OUTPUT : school condition ' ,this.template.querySelector('.schoolNameModalFilter').classList != null);
            // // // console.log('OUTPUT : visa condition ' ,this.template.querySelector('.visaTypeModalFilter').classList.contains('visaTypeModalFilter'));

            if (this.template.querySelector('.schoolNameModalFilter') && this.template.querySelector('.schoolNameModalFilter').classList.contains('schoolNameModalFilter')) {
                // // console.log('OUTPUT :called from selectchekcforfilter ');
                var checkBoolean = evt.target.checked
                var checkValue = evt.target.value;

                if (checkBoolean == true) {
                    this.schoolNameListFilter.push(checkValue);
                }
                if (checkBoolean == false) {
                    this.schoolNameListFilter.forEach(element => {
                        if (element == checkValue) {
                            // // console.log('OUTPUT : element => ', element, 'uncheck => ', checkValue);
                            // index = count ;
                            // // // console.log('OUTPUT : ', this.countryListFilter.indexOf(checkValue));
                            // // console.log('OUTPUT : ', this.schoolNameListFilter);
                            let copyofschoolname = this.schoolNameListFilter;
                            let removeElement = copyofschoolname.splice(copyofschoolname.indexOf(checkValue), 1);
                            this.schoolNameListFilter = copyofschoolname;
                            // // console.log('OUTPUT :after splice  ', this.schoolNameListFilter);

                            // // console.log('OUTPUT 601: ', removeElement);
                        }
                        // count ++ ; 
                    })
                }
            } else if (this.template.querySelector('.visaTypeModalFilter') && this.template.querySelector('.visaTypeModalFilter').classList.contains('visaTypeModalFilter')) {
                
              
                try {
                    //this.template.querySelector('.visaTypeModalFilter').type =  "radio";
                    // console.log('test1: ', evt.currentTarget.dataset.id);
                    this.visaTypeString = evt.target.value;

                    // console.log('OUTPUT Yes: ',this.template.querySelector('[data-id="Yes"]'));
                    // console.log('vStr : ',this.visaTypeString);
                    // console.log('OUTPUT 3: ', this.template.querySelector('[data-id="No Preference"]').checked);
                    if (this.visaTypeString == 'Yes') {
                        this.template.querySelector('[data-id="No Preference"]').checked = false;
                        this.template.querySelector('[data-id="No"]').checked = false;
                        // console.log('OUTPUT 3 Yes: ', this.template.querySelector('[data-id="No Preference"]').checked);
                    }
                    if (this.visaTypeString == 'No') {
                        this.template.querySelector('[data-id="Yes"]').checked = false;
                        this.template.querySelector('[data-id="No Preference"]').checked = false;
                        // console.log('OUTPUT 3 NO: ', this.template.querySelector('[data-id="No Preference"]').checked);
                    }
                    if (this.visaTypeString == 'No Preference') {
                        this.template.querySelector('[data-id="No"]').checked = false;
                        this.template.querySelector('[data-id="Yes"]').checked = false;
                        // console.log('OUTPUT 3 Pref: ', this.template.querySelector('[data-id="No Preference"]').checked);
                    }
                }
                catch (err) {
                    // console.log('OUTPUT : ', JSON.stringify(err.message));
                }




            } else if (this.template.querySelector('.regionModalFilter') && this.template.querySelector('.regionModalFilter').classList.contains('regionModalFilter')) {
                // // console.log('OUTPUT : coming in visa ');
                var checkBoolean = evt.target.checked
                var checkValue = evt.target.value;
                if (checkBoolean == true) {
                    this.regionFilterList.push(checkValue);
                    // // console.log('OUTPUT :visa added  ', this.visaPerference);
                }
                if (checkBoolean == false) {
                    this.regionFilterList.forEach(element => {
                        if (element == checkValue) {
                            // // console.log('OUTPUT : element => ', element, 'uncheck => ', checkValue);
                            let copyofschoolname = this.regionFilterList;
                            let removeElement = copyofschoolname.splice(copyofschoolname.indexOf(checkValue), 1);
                            this.regionFilterList = copyofschoolname;
                            // // console.log('OUTPUT :after splice  ', this.regionFilterList);

                            // // console.log('OUTPUT 601: ', removeElement);
                        }
                        // count ++ ; 
                    })
                }
            } else if (this.template.querySelector('.regionOrgModalFilter') && this.template.querySelector('.regionOrgModalFilter').classList.contains('regionOrgModalFilter')) {
                // // console.log('OUTPUT : coming in visa ');
                var checkBoolean = evt.target.checked
                var checkValue = evt.target.value;
                if (checkBoolean == true) {
                    this.regionOrgFilterList.push(checkValue);
                    // // console.log('OUTPUT :visa added  ', this.regionOrgFilterList);
                }
                if (checkBoolean == false) {
                    this.regionOrgFilterList.forEach(element => {
                        if (element == checkValue) {
                            // // console.log('OUTPUT : element => ', element, 'uncheck => ', checkValue);
                            let copyofschoolname = this.regionOrgFilterList;
                            let removeElement = copyofschoolname.splice(copyofschoolname.indexOf(checkValue), 1);
                            this.regionOrgFilterList = copyofschoolname;
                            // // console.log('OUTPUT :after splice  ', this.regionOrgFilterList);

                            // // console.log('OUTPUT 601: ', removeElement);
                        }
                        // count ++ ; 
                    })
                }
            }
        } catch (err) {
            // // console.log('OUTPUT : ', err);
        }

    }


    selectedCheckSchool(evt) {
        var checkBoolean = evt.target.checked
        var checkValue = evt.target.value;
        if (checkBoolean == true) {
            this.schoolNameListFilter.push(checkValue);
        }
        if (checkBoolean == false) {
            this.schoolNameListFilter.forEach(element => {
                if (element == checkValue) {
                    // // console.log('OUTPUT : element => ', element, 'uncheck => ', checkValue);
                    // index = count ;
                    // // // console.log('OUTPUT : ', this.countryListFilter.indexOf(checkValue));
                    // // console.log('OUTPUT : ', this.schoolNameListFilter);
                    let copyofschoolname = this.schoolNameListFilter;
                    let removeElement = copyofschoolname.splice(copyofschoolname.indexOf(checkValue), 1);
                    // // console.log('OUTPUT :after splice  ', this.schoolNameListFilter);
                    // // console.log('OUTPUT 601: ', removeElement);
                }
                // count ++ ; 
            });
        }
        // // console.log('OUTPUT final : ', this.schoolNameListFilter);
    }
    searchSchoolType(event) {
        try {
            this.template.querySelectorAll('.schoolTypeData').forEach(element => {
                element.style.visibility = 'visible';
                element.style.position = 'relative';
                if (!(element.querySelector('.scholTypeDataCss').innerHTML.toLowerCase().includes(event.target.value.toLowerCase()))) {
                    // // // console.log('Matched ! : ' + element.querySelector('.conatactName').innerHTML.toLowerCase() );
                    element.style.visibility = 'hidden';
                    element.style.position = 'absolute';
                }
            });
        } catch (err) {
            // // console.log('OUTPUT : ', err);
        }

    }


    selectedSchoolType(evt) {
        var checkBoolean = evt.target.checked;
        var checkValue = evt.target.value;
        if (checkBoolean == true) {
            this.schoolTypeListFilter.push(checkValue);
        }
        if (checkBoolean == false) {
            this.schoolTypeListFilter.forEach(element => {
                if (element == checkValue) {
                    this.schoolTypeListFilter.splice(this.schoolTypeListFilter.indexOf(checkValue), 1);
                }
            })
        }
    }
    selectedRegion(evt) {
        var checkBoolean = evt.target.checked;
        var checkValue = evt.target.value;
        if (checkBoolean == true) {
            this.regionFilterList.push(checkValue);
        }
        if (checkBoolean == false) {
            this.regionFilterList.forEach(element => {
                if (element == checkValue) {
                    this.regionFilterList.splice(this.regionFilterList.indexOf(checkValue), 1);
                }
            })
        }
        // // console.log('OUTPUT 750 check uncheck: ', JSON.parse(JSON.stringify(this.regionFilterList)));
    }
    selectedRegionOrg(evt) {
        var checkBoolean = evt.target.checked;
        var checkValue = evt.target.value;
        if (checkBoolean == true) {
            this.regionOrgFilterList.push(checkValue);
            // // console.log('OUTPUT : 866 ',this.template.querySelector('.optvalVisa'));
            // // console.log('OUTPUT : 867 ',this.template.querySelector('span'));
        }
        if (checkBoolean == false) {
            this.regionOrgFilterList.forEach(element => {
                if (element == checkValue) {
                    this.regionOrgFilterList.splice(this.regionOrgFilterList.indexOf(checkValue), 1);
                }
            })
        }
    }
    visaPerference = [];
    getVisa(evt) {
        // // console.log('OUTPUT : 877 ');
        //var checkBoolean = evt.target.checked;
        // var checkValue = evt.target.value;
        //if (checkBoolean == true) {
        // this.visaTypeString = checkValue;
        // // // console.log('OUTPUT : ', $(".chb").prop('checked', false));
        // // // console.log('OUTPUT : ',$(this).prop('checked', true));
        //}
        // if (checkBoolean == false) {
        //     this.visaPerference.forEach(element => {
        //         if (element == checkValue) {
        //             let copyofvisatype = this.visaPerference;
        //             let removeElement = copyofvisatype.splice(copyofvisatype.indexOf(checkValue), 1);
        //             this.visaPerference = copyofvisatype;
        //         }
        //     });
        // }
        // // console.log('OUTPUT : visa => ', JSON.stringify(this.visaPerference));
        this.visaTypeString = evt.target.value;
        // if(this.visaTypeString == 'Yes'){
        //     this.template.querySelector('[data-id="Yes"]').checked = true;
        //     this.template.querySelector('[data-id="No Preference"]').checked = false;
        //     this.template.querySelector('[data-id="No"]').checked = false;
        //     }
        // if(this.visaTypeString == 'No'){
        //     this.template.querySelector('[data-id="No"]').checked = true;
        //     this.template.querySelector('[data-id="Yes"]').checked = false;
        //     this.template.querySelector('[data-id="No Preference"]').checked = false;
        //     }
        // if(this.visaTypeString == 'No Preference'){
        //     this.template.querySelector('[data-id="No Preference"]').checked = true;
        //     this.template.querySelector('[data-id="No"]').checked = false;
        //     this.template.querySelector('[data-id="Yes"]').checked = false;
        //     }
    }
    radioValueChange(evt) {
        // console.log('OUTPUT 1: radio', evt.target.value);
        // console.log('OUTPUT 2: ', evt.target.dataset.id);
        this.visaTypeString = evt.target.value;
        // console.log('OUTPUT Yes: ',this.template.querySelector('[data-id="Yes"]'));
        // console.log('OUTPUT 3: ', this.template.querySelector('[data-id="No Preference"]').checked);
        if (this.visaTypeString == 'Yes') {
            this.template.querySelector('[data-id="No Preference"]').checked = false;
            this.template.querySelector('[data-id="No"]').checked = false;
            // console.log('OUTPUT 3: ', this.template.querySelector('[data-id="No Preference"]').checked);
        }
        if (this.visaTypeString == 'No') {
            this.template.querySelector('[data-id="Yes"]').checked = false;
            this.template.querySelector('[data-id="No Preference"]').checked = false;
            // console.log('OUTPUT 3: ', this.template.querySelector('[data-id="No Preference"]').checked);
        }
        if (this.visaTypeString == 'No Preference') {
            this.template.querySelector('[data-id="No"]').checked = false;
            this.template.querySelector('[data-id="Yes"]').checked = false;
            // console.log('OUTPUT 3: ', this.template.querySelector('[data-id="No Preference"]').checked);
        }








    }

    applyfilters(evt) {
        this.seeClear = true;
        this.loader = true;
        this.mainString = ''
        this.countryString = ''
        this.schoolNameString = ''
        this.schoolTypeString = ''
        this.visaRestrictionString = ''
        this.classSizeString = ''
        this.regionOrgString = '';
        this.regionString = '';




        try {
            let allFieldsValue = [{
                label: 'Country',
                value: this.countryPlaceHolder,
                optionValues: this.listOfCountry,
                classname: 'countryModalFilter',
                datatype : 'checkbox'
            },
            {
                label: 'Class-Size',
                value: this.classSizePlaceHolder,
                optionValues: this.classSizeListFilter,
                classname: 'classSizeModalFilter',
                datatype : 'checkbox'
            },
            {
                label: 'School Type',
                value: this.schoolTypePlaceHolder,
                optionValues: this.schoolTypeListFilter,
                classname: 'schoolTypeModalFilter',
                datatype : 'checkbox'
            },
            {
                label: 'Region',
                value: this.regionPlaceHolder,
                optionValues: this.region,
                classname: 'regionModalFilter',
                datatype : 'checkbox'
            },
            {
                label: 'School Name',
                value: this.schoolNamePlaceHolder,
                optionValues: this.schoolName,
                classname: 'schoolNameModalFilter',
                datatype : 'checkbox'
            },
            {
                label: 'Visa Type',
                value: this.visaPlaceholder,
                optionValues: this.visaType,
                classname: 'visaTypeModalFilter',
                datatype : 'radio'
            },
            {
                label: 'Regional Organization',
                value: this.regionOrgPlaceHolder,
                optionValues: this.regionalOrg,
                classname: 'regionOrgModalFilter',
                datatype : 'checkbox'
            }
            ];
            this.modalFiltersForPillsView = [];
            allFieldsValue.forEach(element => {
                if (element.label != 'Country' && element.label != '' && element.label != 'Class-Size' && element.label != 'School Type') {
                    if (element.value.includes(':')) {
                        this.modalFiltersForPillsView.push({
                            placeholder: element.label,
                            value: element.value,
                            classes: "slds-input inputBar " + element.classname,
                            classData: "extraPills " + element.classname,
                            optionValues: element.optionValues , 
                            datatypes : element.datatype

                        });
                    }
                    
                }
                // if (this.maintainOrderList[i] != 'countryOuter' || this.maintainOrderList[i] != 'schoolTypeOuter') {
                            //this.template.querySelector('.addCustomCss').style.background = '#174581';
                            // this.template.querySelector('.addCustomCss').classList.add('activeFilter');
                            // this.template.querySelector('.newfilter').classList.add('icons');
               // }

            })

            
            // console.log('OUTPUT : maintainorder list 1134 ', JSON.stringify(this.maintainOrderList));
            setTimeout(() => {
                if (this.maintainOrderList.length != 0) {
                    try{

                    for (let i = 0; i < this.maintainOrderList.length; i++) {
                        // console.log('OUTPUT :1138 ', this.maintainOrderList[i]);
                        let test = this.template.querySelector('.' + this.maintainOrderList[i]);
                        this.template.querySelector('.mainDiv').prepend(test);
                        // console.log('OUTPUT 1140: ',this.maintainOrderList[i]);
                    }
                    }catch(err){
                        // console.log('OUTPUT : ',JSON.stringify(err.message));
                    }  
                    
                }
            }, 800)

           



            if (this.countryListFilter.length > 1) {
                this.countryString = ''
                this.countSelectedFilter += 1
                for (let i = 0; i < this.countryListFilter.length; i++) {



                    if (this.countryListFilter.length == i + 1) {
                        let s = `country__c =  \'${this.countryListFilter[i]}\'`
                        this.countryString += s;
                    } else {
                        let s = `country__c =\'${this.countryListFilter[i]}\' OR `
                        this.countryString += s;
                    }
                    if (!this.totalList.includes(this.countryListFilter[i])) {
                        this.totalList.push(this.countryListFilter[i]);
                    }
                }
                this.template.querySelector('.countryPrimaryFilter').style.background = '#174581';
                this.template.querySelector('.countryPrimaryFilter').classList.add('activeFilter');
                this.template.querySelector('.downIconCountry').classList.add('icons');

            } else if (this.countryListFilter.length == 1) {

                this.countSelectedFilter += 1

                this.countryString = ''
                this.totalList.push(this.countryListFilter[0]);
                let s = "country__c=\'" + this.countryListFilter[0] + "\'"
                this.countryString += s;

                this.template.querySelector('.countryPrimaryFilter').style.background = '#174581';
                this.template.querySelector('.countryPrimaryFilter').classList.add('activeFilter');
                this.template.querySelector('.downIconCountry').classList.add('icons');
            }

            if (this.classSizeListFilter.length > 1) {
                this.classSizeString = ''
                this.countSelectedFilter += 1
                for (let i = 0; i < this.classSizeListFilter.length; i++) {
                    if (this.classSizeListFilter.length == i + 1) {
                        let s = `Class_Size__c =  \'${this.classSizeListFilter[i]}\'`
                        this.classSizeString += s;
                    } else {
                        let s = `Class_Size__c =\'${this.classSizeListFilter[i]}\' OR `
                        this.classSizeString += s;
                    }
                    if (!this.totalList.includes(this.classSizeListFilter[i])) {
                        this.totalList.push(this.classSizeListFilter[i]);
                    }
                }
            } else if (this.classSizeListFilter.length == 1) {
                this.countSelectedFilter += 1

                this.classSizeString = ''
                this.totalList.push(this.classSizeListFilter[0]);
                let s = "Class_Size__c=\'" + this.classSizeListFilter[0] + "\'"
                this.classSizeString += s;
            }


            if (this.schoolNameListFilter.length > 1) {
                this.schoolNameString = ''
                this.countSelectedFilter += 1
                for (let i = 0; i < this.schoolNameListFilter.length; i++) {
                    if (this.schoolNameListFilter.length == i + 1) {
                        let s = `Name =  \'${this.schoolNameListFilter[i]}\'`
                        this.schoolNameString += s;
                    } else {
                        let s = `Name =\'${this.schoolNameListFilter[i]}\' OR `

                        this.schoolNameString += s;
                    }
                    if (!this.totalList.includes(this.schoolNameListFilter[i])) {
                        this.totalList.push(this.schoolNameListFilter[i]);
                    }
                }
                // this.template.querySelector('.countryPrimaryFilter').style.background = '#174581';
                // this.template.querySelector('.countryPrimaryFilter').classList.add('activeFilter');
                // this.template.querySelector('.downIconCountry').classList.add('icons');

            } else if (this.schoolNameListFilter.length == 1) {
                this.countSelectedFilter += 1
                this.schoolNameString = ''
                // let s = 'Name=' + this.schoolNameListFilter[0] 
                let s = "Name=\'" + this.schoolNameListFilter[0] + "\'"

                this.schoolNameString += s;
                this.totalList.push(this.schoolNameListFilter[0]);
            }

            if (this.regionFilterList.length > 1) {
                this.regionString = ''
                this.countSelectedFilter += 1
                for (let i = 0; i < this.regionFilterList.length; i++) {
                    if (this.regionFilterList.length == i + 1) {
                        // let s = 'School_Type__c=' + this.schoolTypeListFilter[i] 
                        let s = `Region__c =\'${this.regionFilterList[i]}\'`
                        this.regionString += s;

                    } else {
                        // let s = 'School_Type__c=' + this.schoolTypeListFilter[i] + ' OR '
                        let s = `Region__c =\'${this.regionFilterList[i]}\' OR `
                        this.regionString += s;
                    }
                    //  this.template.querySelector('.schoolTypefilter').value = this.template.querySelector('.schoolTypefilter').placeholder + ': ' +this.schoolTypeListFilter.length;

                }

            } else if (this.regionFilterList.length == 1) {
                this.countSelectedFilter += 1

                this.regionString
                // let s = 'School_Type__c=' + this.schoolTypeListFilter[0] 
                let s = "Region__c=\'" + this.regionFilterList[0] + "\'"

                this.regionString += s;

                // this.template.querySelector('.schoolTypefilter').value = this.template.querySelector('.schoolTypefilter').placeholder + ': ' +this.schoolTypeListFilter[0];
            }



            if (this.visaTypeString != '') {
                this.countSelectedFilter += 1
                let s;
                // if (this.visaPerference == 'No Preference') {
                //     let s = `hasVisaRestrictions__c =  \'${this.visaPerference}\'`
                // }
                if (this.visaTypeString == 'Yes') {
                    s = `hasVisaRestrictions__c = ` + true;

                } else if (this.visaTypeString == 'No Preference' || this.visaTypeString == 'No') {
                    s = `hasVisaRestrictions__c = ` + false;
                }
                this.visaRestrictionString += s;

            }
            // // console.log('OUTPUT : count seleted ater filter value',this.countSelectedFilter);
            // // console.log('visaRestrictionString-->', this.visaRestrictionString);

            if (this.regionOrgFilterList.length > 1) {
                this.regionOrgString = ''
                this.countSelectedFilter += 1
                for (let i = 0; i < this.regionOrgFilterList.length; i++) {



                    if (this.regionOrgFilterList.length == i + 1) {
                        // let s = 'School_Type__c=' + this.schoolTypeListFilter[i] 
                        let s = `Regional_Organization__c =\'${this.regionOrgFilterList[i]}\'`

                        this.regionOrgString += s;
                    } else {
                        // let s = 'School_Type__c=' + this.schoolTypeListFilter[i] + ' OR '
                        let s = `Regional_Organization__c =\'${this.regionOrgFilterList[i]}\' OR `

                        this.regionOrgString += s;
                    }
                    //  this.template.querySelector('.schoolTypefilter').value = this.template.querySelector('.schoolTypefilter').placeholder + ': ' +this.schoolTypeListFilter.length;
                    // if (!this.totalList.includes(this.schoolTypeListFilter[i])) {
                    //     this.totalList.push(this.schoolTypeListFilter[i]);
                    // }
                }

            } else if (this.regionOrgFilterList.length == 1) {
                this.countSelectedFilter += 1

                this.regionOrgString = '';
                // let s = 'School_Type__c=' + this.schoolTypeListFilter[0] 
                let s = "Regional_Organization__c=\'" + this.regionOrgFilterList[0] + "\'"

                this.regionOrgString += s;
                this.totalList.push(this.schoolTypeListFilter[0]);
                // this.template.querySelector('.schoolTypefilter').value = this.template.querySelector('.schoolTypefilter').placeholder + ': ' +this.schoolTypeListFilter[0];
            }
            // // console.log('region org list -->', this.regionOrgFilterList[0]);

            if (this.schoolTypeListFilter.length > 1) {

                this.countSelectedFilter += 1
                for (let i = 0; i < this.schoolTypeListFilter.length; i++) {
                    if (this.schoolTypeListFilter.length == i + 1) {
                        // let s = 'School_Type__c=' + this.schoolTypeListFilter[i] 
                        let s = `School_Type__c =\'${this.schoolTypeListFilter[i]}\'`

                        this.schoolTypeString += s;
                    } else {
                        // let s = 'School_Type__c=' + this.schoolTypeListFilter[i] + ' OR '
                        let s = `School_Type__c =\'${this.schoolTypeListFilter[i]}\' OR `

                        this.schoolTypeString += s;
                    }
                    //  this.template.querySelector('.schoolTypefilter').value = this.template.querySelector('.schoolTypefilter').placeholder + ': ' +this.schoolTypeListFilter.length;
                    if (!this.totalList.includes(this.schoolTypeListFilter[i])) {
                        this.totalList.push(this.schoolTypeListFilter[i]);
                    }
                }
                this.template.querySelector('.schoolTypefilter').style.background = '#174581';
                this.template.querySelector('.schoolTypefilter').classList.add('activeFilter');
                this.template.querySelector('.downIconSchool').classList.add('icons');



            } else if (this.schoolTypeListFilter.length == 1) {
                this.countSelectedFilter += 1

                this.schoolTypeString = '';
                // let s = 'School_Type__c=' + this.schoolTypeListFilter[0] 
                //let s = `School_Type__c =\'${this.schoolTypeListFilter[0]}\' OR `
                // // console.log('OUTPUT : zero index of school type ==> ');
                let s = `School_Type__c =\'${this.schoolTypeListFilter[0]}\' `

                this.schoolTypeString += s;
                this.template.querySelector('.schoolTypefilter').style.background = '#174581';
                this.template.querySelector('.schoolTypefilter').classList.add('activeFilter');
                this.template.querySelector('.downIconSchool').classList.add('icons');

                // this.template.querySelector('.schoolTypefilter').value = this.template.querySelector('.schoolTypefilter').placeholder + ': ' +this.schoolTypeListFilter[0];
            }

            // // console.log('countSelectedFilter-->', this.countSelectedFilter);
            if (this.countSelectedFilter > 1) {
                // // console.log('OUTPUT 738 : ', this.classSizeString);
                let totalString = [this.schoolNameString, this.countryString, this.schoolTypeString, this.visaRestrictionString, this.classSizeString, this.regionString, this.regionOrgString];
                // // console.log('OUTPUT : ', JSON.stringify(totalString));
                for (let i = 0; i < totalString.length; i++) {
                    // // console.log('OUTPUT :in loop main  ', this.mainString);
                    if (totalString[i] != '') {
                        this.mainString += '(' + totalString[i] + ') AND '
                    } else {
                        if (totalString[i] != '') { }
                    }
                }
                this.mainString = this.mainString.substring(0, this.mainString.length - 5)


            } else if (this.countSelectedFilter == 1) {
                // // console.log('line 549')
                let totalString = [this.schoolNameString, this.countryString, this.schoolTypeString, this.visaRestrictionString, this.classSizeString, this.regionString, this.regionOrgString];
                for (let i = 0; i < totalString.length; i++) {
                    // // console.log('this.totalString[i]-->', totalString[i]);
                    if (totalString[i] != '') {
                        // // console.log('line 552')
                        this.mainString += totalString[i]
                        // // console.log('check main-->', this.mainString);
                    } else {
                        // // console.log('line 553')

                    }
                }
            }

            // console.log('main string-=->', this.mainString);
            // // // console.log('total list values : ', this.totalList);
            if (this.mainString == '') {
                // // console.log('OUTPUT : coming in the 1299');
                this.seeClear = false;
                this.clearAllData();

            }
            else if (this.mainString != '') {
                // // console.log('OUTPUT : coming in the 1304');
                this.seeClear = true;
                // this.seechildCompo = true;
            }
            this.offset = 0;
            // // console.log('OUTPUT : sending parameter == > ', this.mainString ,'----' , this.limitSize ,'-----' , this.offset);    

            getFilterData({
                mainStringValues: this.mainString,
                limitsize: this.limitSize,
                offset: this.offset
            })
                .then(res => {
                    // console.log('OUTPUT ---->>>1124: ', res);

                    this.accountData = res;
                    this.loaderInner = false;
                    this.loader = false;
                    if (res.length == 0) {
                        this.sizeOfSchool = 0;
                         this.seechildCompo = false;
                         // console.log('OUTPUT : coming in res if ');
                         this.seeError = true;
                    } else {
                        // console.log('OUTPUT : res apply ', JSON.stringify(this.mainString));
                        this.sizeOfSchool = this.mainString == '' ? this.AllCount : res.length;
                        this.value = res[0];
                        this.getClick1(res[0].Id);
                        this.seechildCompo = true;
                        this.seeError = false;
                        // console.log('OUTPUT : coming in else res');
                    }



                }).catch(err => {
                    // // console.log('ERROR-->', err)
                    // thisseeError = true;
                })

            if (evt.target.dataset.id == 'searchMorefilter') {
                this.hideMoreFilter();

            }


        } catch (err) {
            // // console.log('OUTPUT ---> : ', err);
            //// // console.log('line no.--> ',err.stack);
            //// // console.log('line no.--> ',err.line);

        }

    }
    submitOptionsPrimary(event) {
        try {
            let i = 0;
            let tempcountry = [];
            // // console.log('OUTPUT : event', event);
            //  // // console.log('OUTPUT : parent element => ',this.countryListFilter );
            // // console.log('OUTPUT : length of submit option => ', this.countryListFilter.length, 'id of country', event.target.dataset.id);

            if (event.target.dataset.id == 'countrySubmit') {

                this.template.querySelectorAll('.optvalCountry').forEach(element => {
                    this.countryListFilter.forEach(data => {
                        if (data == element.querySelector('input').value && element.querySelector('input').checked == false) {
                            // // console.log('OUTPUT in if : ', element.querySelector('input').value, ' with their value ', element.querySelector('input').checked);
                            element.querySelector('input').checked = true;
                            tempcountry.push(element.querySelector('input').value);
                        }
                    })
                    if (this.countryListFilter.includes(element.querySelector('input').value) == false) {
                        if (element.querySelector('input').checked == true) {
                            // // console.log('OUTPUT :includes ', JSON.stringify(element.querySelector('input').value));
                            element.querySelector('input').checked = false;
                        }
                    }

                });


                if (this.countryListFilter.length == 0) {
                    // // console.log('OUTPUT :placeholder null ');
                    this.countryPlaceHolder = 'Country';
                }
                if (this.countryListFilter.length > 1) {
                    this.countryPlaceHolder = 'Country: (' + this.countryListFilter.length + ')';
                }
                if (this.countryListFilter.length == 1) {
                    this.countryPlaceHolder = 'Country: ' + this.countryListFilter[0];
                }


                //  let test = this.template.querySelector('.countryOuter');
                // // // console.log('OUTPUT : dynamic values ',test);
                // this.template.querySelector('.mainDiv').prepend(test); 
                if (this.maintainOrderList.includes('countryOuter')) {
                    let index = this.maintainOrderList.indexOf('countryOuter')
                    this.maintainOrderList.splice(index, 1);
                    this.maintainOrderList.push('countryOuter');
                }
                else {
                    this.maintainOrderList.push('countryOuter');
                }

                // this.template.querySelector('.countryPrimaryFilter').style.background = '#174581';
                // console.log('OUTPUT : 1390--- ', JSON.stringify(this.maintainOrderList));
                // this.template.querySelector('.countryPrimaryFilter').classList.add('activeFilter');
                // this.template.querySelector('.downIconCountry').classList.add('icons');   
                event.currentTarget.parentElement.parentElement.style.display = 'none';
                this.primaryCount++;


                // this.applyfilters();
            }

            if (event.target.dataset.id == 'schoolTypeSubmit') {
                // // console.log('OUTPUT : schoolTypeSubmit called ');
                this.template.querySelectorAll('.optvalSchoolType').forEach(element => {
                    this.schoolTypeListFilter.forEach(data => {
                        if (data == element.querySelector('input').value && element.querySelector('input').checked == false) {
                            // // console.log('OUTPUT in if : ', element.querySelector('input').value, ' with their value ', element.querySelector('input').checked);
                            element.querySelector('input').checked = true;
                            //tempcountry.push(element.querySelector('input').value);
                        }
                    })
                    if (this.schoolTypeListFilter.includes(element.querySelector('input').value) == false) {
                        if (element.querySelector('input').checked == true) {
                            // // console.log('OUTPUT :includes ', JSON.stringify(element.querySelector('input').value));
                            element.querySelector('input').checked = false;
                        }
                    }
                });
                if (this.schoolTypeListFilter.length == 0) {
                    // // console.log('OUTPUT :placeholder null ');
                    this.schoolTypePlaceHolder = 'School Type';
                }
                if (this.schoolTypeListFilter.length > 1) {
                    this.schoolTypePlaceHolder = 'School Type: (' + this.schoolTypeListFilter.length + ')';
                }
                if (this.schoolTypeListFilter.length == 1) {
                    this.schoolTypePlaceHolder = 'School Type: ' + this.schoolTypeListFilter[0];
                }
                event.currentTarget.parentElement.parentElement.style.display = 'none';
                this.primaryCount++;

                if (this.maintainOrderList.includes('schoolTypeOuter')) {
                    let index = this.maintainOrderList.indexOf('schoolTypeOuter')
                    this.maintainOrderList.splice(index, 1);
                    this.maintainOrderList.push('schoolTypeOuter');
                }
                else {
                    this.maintainOrderList.push('schoolTypeOuter');
                }
                // let test = this.template.querySelector('.schoolTypeOuter');
                // console.log('maintain order list school type ', JSON.stringify(this.maintainOrderList));
                // this.template.querySelector('.mainDiv').prepend(test); 



            }

            if (event.target.dataset.id == 'classSizeSubmit') {
                // // console.log('OUTPUT :classSize =?> ', this.classSizeListFilter);
                this.template.querySelectorAll('.optvalClassSize').forEach(element => {
                    this.schoolTypeListFilter.forEach(data => {
                        if (data == element.querySelector('input').value && element.querySelector('input').checked == false) {
                            // // console.log('OUTPUT in if : ', element.querySelector('input').value, ' with their value ', element.querySelector('input').checked);
                            element.querySelector('input').checked = true;
                            //tempcountry.push(element.querySelector('input').value);
                        }
                    })
                    if (this.classSizeListFilter.includes(element.querySelector('input').value) == false) {
                        if (element.querySelector('input').checked == true) {
                            // // console.log('OUTPUT :includes ', JSON.stringify(element.querySelector('input').value));
                            element.querySelector('input').checked = false;
                        }
                    }
                });
                if (this.classSizeListFilter.length == 0) {
                    // // console.log('OUTPUT :placeholder null ');
                    this.classSizePlaceHolder = 'Class Size';
                }
                if (this.classSizeListFilter.length > 1) {
                    this.classSizePlaceHolder = 'Class-Size: (' + this.classSizeListFilter.length + ')';
                }
                if (this.classSizeListFilter.length == 1) {
                    this.classSizePlaceHolder = 'Class-Size: ' + this.classSizeListFilter[0];
                }
                event.currentTarget.parentElement.parentElement.style.display = 'none';
                this.primaryCount++;
                if (this.maintainOrderList.includes('classSizeOuter')) {
                    let index = this.maintainOrderList.indexOf('classSizeOuter')
                    this.maintainOrderList.splice(index, 1);
                    this.maintainOrderList.push('classSizeOuter');
                }
                else {
                    this.maintainOrderList.push('classSizeOuter');
                }
                // console.log('maintain order list school type ', JSON.stringify(this.maintainOrderList));

                this.template.querySelector('.classSizefilter').style.background = '#174581';
                // // // console.log('OUTPUT : 1390--- ',this.template.querySelector('.countryPrimaryFilter').classList);
                this.template.querySelector('.classSizefilter').classList.add('activeFilter');
                this.template.querySelector('.downIconClass').classList.add('icons');
            }

            this.template.querySelector('.optionsOverlay').style.zIndex = '-1';
            this.seeClear = true;
            this.applyfilters();




            // // console.log('OUTPUT :1444 ',this.primaryCount);
        } catch (err) {
            // // console.log('OUTPUT : err in submit options => ', err);
        }
    }
    submitOptions(event) {
        try {
            let i = 0;
            let tempcountry = [];
            // // console.log('OUTPUT : parent element in submit option => ', event.target.dataset.id);

            if (event.target.dataset.id == 'countrySubmit') {

                this.template.querySelectorAll('.countrycheck').forEach(element => {
                    element.style.visibility = 'visible';
                    element.style.position = 'relative';
                });
                this.template.querySelectorAll('.optvalCountry').forEach(element => {
                    this.countryListFilter.forEach(data => {
                        if (data == element.querySelector('input').value && element.querySelector('input').checked == false) {
                            element.querySelector('input').checked = true;
                            tempcountry.push(element.querySelector('input').value);
                        }
                    })
                    if (this.countryListFilter.includes(element.querySelector('input').value) == false) {
                        if (element.querySelector('input').checked == true) {
                            element.querySelector('input').checked = false;
                        }
                    }


                });


                if (this.countryListFilter.length == 0) {
                    // // console.log('OUTPUT :placeholder null ');
                    this.countryPlaceHolder = 'Country';
                }
                if (this.countryListFilter.length > 1) {
                    this.countryPlaceHolder = 'Country: (' + this.countryListFilter.length + ')';
                }
                if (this.countryListFilter.length == 1) {
                    this.countryPlaceHolder = 'Country: ' + this.countryListFilter[0];
                }
                this.morefilterCount++;
                event.currentTarget.parentElement.parentElement.style.display = 'none';

                // this.maintainOrderList.push({label: 'countryInner' , value : this.maintainOrderList.length});
                // this.maintainOrderList.push('countryInner');
                if (this.maintainOrderList.includes('countryOuter')) {
                    let index = this.maintainOrderList.indexOf('countryOuter')
                    this.maintainOrderList.splice(index, 1);
                    this.maintainOrderList.push('countryOuter');
                }
                else {
                    this.maintainOrderList.push('countryOuter');
                }

                // // console.log('OUTPUT 1680  : ',this.template.querySelector('.modalFilterCountry').value);
                //  this.template.querySelector('.modalFilterCountry').value = ''
                this.template.querySelector('.countrysearch').value = ''

                // // console.log('OUTPUT :in country 1527 ', JSON.stringify(this.maintainOrderList));

            }

            if (event.target.dataset.id == 'schoolTypeSubmit') {
                this.template.querySelectorAll('.optvalSchoolType').forEach(element => {
                    this.schoolTypeListFilter.forEach(data => {
                        if (data == element.querySelector('input').value && element.querySelector('input').checked == false) {
                            element.querySelector('input').checked = true;
                        }
                    })
                });

                this.template.querySelector('.schoolTypeSearch').value = '';
                if (event.target.dataset.id == 'schoolTypeSubmit') {
                    this.template.querySelectorAll('.schoolTypeData').forEach(element => {
                        element.style.visibility = 'visible';
                        element.style.position = 'relative';
                    });
                }
                if (this.schoolTypeListFilter.length == 0) {
                    // // console.log('OUTPUT :placeholder null ');
                    this.schoolTypePlaceHolder = 'School Type';
                }
                if (this.schoolTypeListFilter.length > 1) {
                    this.schoolTypePlaceHolder = 'School Type: (' + this.schoolTypeListFilter.length + ')';
                }
                if (this.schoolTypeListFilter.length == 1) {
                    this.schoolTypePlaceHolder = 'School Type: (' + this.schoolTypeListFilter[0] + ')';
                }
                this.morefilterCount++;

                // this.maintainOrderList.push('schoolTypeInner');
                //this.maintainOrderList.push({label: 'schoolTypeInner' , value : this.maintainOrderList.length});

                if (this.maintainOrderList.includes('schoolTypeOuter')) {
                    let index = this.maintainOrderList.indexOf('schoolTypeOuter')
                    this.maintainOrderList.splice(index, 1);
                    this.maintainOrderList.push('schoolTypeOuter');
                } else {
                    this.maintainOrderList.push('schoolTypeOuter');
                }
                event.currentTarget.parentElement.parentElement.style.display = 'none';
            }


            if (event.target.dataset.id == 'morefiltersubmit') {
                // // console.log('OUTPUT : more filter called 1573');
                if (this.template.querySelector('.visaTypeModalFilter') && this.template.querySelector('.visaTypeModalFilter').classList.contains('visaTypeModalFilter')) {
                    // // console.log('OUTPUT : visaa toype called in submit option');

                    try {

                        if (this.visaPerference.length == 0) {
                            this.visaPlaceholder = 'Visa Type';
                        }

                        if (this.visaTypeString != '') {
                            this.visaPlaceholder = 'Visa Type' + ': ' + this.visaTypeString;
                        }

                        this.modalFiltersForPillsView.forEach(item => {
                            if (item.placeholder == 'Visa Type') {
                                item.placeholder = this.visaPlaceholder;
                            }
                        })

                        // // console.log('value-->',this.template.querySelector('.optvalVisa').value)

                        event.currentTarget.parentElement.parentElement.style.display = 'none';

                        if (this.maintainOrderList.includes('visaTypeModalFilter')) {
                            let index = this.maintainOrderList.indexOf('visaTypeModalFilter')
                            this.maintainOrderList.splice(index, 1);
                            this.maintainOrderList.push('visaTypeModalFilter');
                        }
                        // this.notVisatype = true;
                    }
                    //     else{
                    //         this.maintainOrderList.push('visaTypeModalFilter');
                    //     }   
                    //     // // console.log('OUTPUT :in visa type  1602  ', JSON.stringify(this.maintainOrderList));
                    //    }
                    catch (err) {
                        // // console.log('OUTPUT :err in visa type  ',err );
                    }


                }

                else if (this.template.querySelector('.schoolNameModalFilter') && this.template.querySelector('.schoolNameModalFilter').classList.contains('schoolNameModalFilter')) {
                    if (this.schoolNameListFilter.length == 0) {
                        // // console.log('OUTPUT :placeholder null ');
                        this.schoolNamePlaceHolder = 'School Name';
                    }
                    if (this.schoolNameListFilter.length > 1) {
                        this.schoolNamePlaceHolder = 'School Name' + ': (' + this.schoolNameListFilter.length + ')';
                    }
                    if (this.schoolNameListFilter.length == 1) {
                        this.schoolNamePlaceHolder = 'School Name' + ': ' + this.schoolNameListFilter[0];
                    }
                    event.currentTarget.parentElement.parentElement.style.display = 'none';
                    this.modalFiltersForPillsView.forEach(item => {
                        if (item.placeholder == 'School Name') {
                            item.value = this.schoolNamePlaceHolder;
                        }
                    })
                    if (this.maintainOrderList.includes('schoolNameModalFilter')) {
                        let index = this.maintainOrderList.indexOf('schoolNameModalFilter')
                        this.maintainOrderList.splice(index, 1);
                        this.maintainOrderList.push('schoolNameModalFilter');
                    }
                    else {
                        this.maintainOrderList.push('schoolNameModalFilter');
                    }
                    // this.notVisatype = false;
                    // // console.log('OUTPUT :in schoolNameModalFilter   1602  ', JSON.stringify(this.maintainOrderList));



                } else if (this.template.querySelector('.regionModalFilter') && this.template.querySelector('.regionModalFilter').classList.contains('regionModalFilter')) {
                    if (this.regionFilterList.length == 0) {
                        // // console.log('OUTPUT :placeholder null ');
                        this.regionPlaceHolder = 'Region';
                    }
                    if (this.regionFilterList.length > 1) {
                        this.regionPlaceHolder = 'Region' + ': (' + this.regionFilterList.length + ')';
                    }
                    if (this.regionFilterList.length == 1) {
                        this.regionPlaceHolder = 'Region' + ': ' + this.regionFilterList[0];
                    }
                    event.currentTarget.parentElement.parentElement.style.display = 'none';
                    this.modalFiltersForPillsView.forEach(item => {
                        if (item.placeholder == 'Region') {
                            item.value = this.regionPlaceHolder
                        }
                    })
                    // this.applyfilters()
                    if (this.maintainOrderList.includes('regionModalFilter')) {
                        let index = this.maintainOrderList.indexOf('regionModalFilter')
                        this.maintainOrderList.splice(index, 1);
                        this.maintainOrderList.push('regionModalFilter');
                    }
                    else {
                        this.maintainOrderList.push('regionModalFilter');
                    }

                    this.template.querySelector('.regioninput').style.background = '#174581';
                    // // // console.log('OUTPUT : 1390--- ',this.template.querySelector('.countryPrimaryFilter').classList);
                    this.template.querySelector('.regioninput').classList.add('activeFilter');
                    this.template.querySelector('.regionDown').classList.add('icons');
                    // this.notVisatype = false;


                    // // console.log('OUTPUT :in regionModalFilter   1602  ', JSON.stringify(this.maintainOrderList));

                    // // console.log('OUTPUT : 1395 ---> ', JSON.stringify(this.regionFilterList));
                } else if (this.template.querySelector('.regionOrgModalFilter') && this.template.querySelector('.regionOrgModalFilter').classList.contains('regionOrgModalFilter')) {
                    if (this.regionOrgFilterList.length == 0) {
                        // // console.log('OUTPUT :placeholder null ');
                        this.regionOrgPlaceHolder = 'Regional Organization';
                    }
                    if (this.regionOrgFilterList.length > 1) {
                        this.regionOrgPlaceHolder = 'Regional Organization' + ': (' + this.regionOrgFilterList.length + ')';
                    }
                    if (this.regionOrgFilterList.length == 1) {
                        this.regionOrgPlaceHolder = 'Regional Organization' + ': ' + this.regionOrgFilterList[0];
                    }
                    event.currentTarget.parentElement.parentElement.style.display = 'none';
                    this.modalFiltersForPillsView.forEach(item => {
                        if (item.placeholder == 'Regional Organization') {
                            item.value = this.regionOrgPlaceHolder
                        }
                    })
                    if (this.maintainOrderList.includes('regionOrgModalFilter')) {
                        let index = this.maintainOrderList.indexOf('regionOrgModalFilter')
                        this.maintainOrderList.splice(index, 1);
                        this.maintainOrderList.push('regionOrgModalFilter');
                    }
                    else {
                        this.maintainOrderList.push('regionOrgModalFilter');
                    }

                    // this.notVisatype = false;
                }
                this.template.querySelector('.modalOptionsOverlay').style.display = 'none';
                this.morefilterCount++;
                this.applyfilters();
                // // console.log('OUTPUT : inside the more filter if ');

                // }
            }


            if (event.target.dataset.id == 'schoolNameSubmit') {
                if (this.schoolNameListFilter.length == 0) {
                    // // console.log('OUTPUT :placeholder null ');
                    this.schoolNamePlaceHolder = 'School Name';
                }
                if (this.schoolNameListFilter.length > 1) {
                    this.schoolNamePlaceHolder = 'School Name' + ': (' + this.schoolNameListFilter.length + ')';
                }
                if (this.schoolNameListFilter.length == 1) {
                    this.schoolNamePlaceHolder = 'School Name' + ': ' + this.schoolNameListFilter[0];
                }
                this.morefilterCount++;
                if (this.maintainOrderList.includes('schoolNameModalFilter')) {
                    let index = this.maintainOrderList.indexOf('schoolNameModalFilter')
                    this.maintainOrderList.splice(index, 1);
                    this.maintainOrderList.push('schoolNameModalFilter');
                }
                else {
                    this.maintainOrderList.push('schoolNameModalFilter');
                }

                this.template.querySelector('.schoolnameSearch').value = '';
                // console.log('OUTPUT : coming in school search');
                if (event.target.dataset.id == 'schoolNameSubmit') {
                    // // console.log('OUTPUT : schoolTypeSubmit called ');
                    this.template.querySelectorAll('.schoolNamecss').forEach(element => {
                        element.style.visibility = 'visible';
                        element.style.position = 'relative';
                    });
                }
                // this.notVisatype = false;
                // console.log('OUTPUT :in schoolNameModalFilter   1602  ', JSON.stringify(this.maintainOrderList));
                event.currentTarget.parentElement.parentElement.style.display = 'none';
            }


            if (event.target.dataset.id == 'visaSubmit') {
                // this.notVisatype = true;
                // console.log('OUTPUT : visa type ', this.visaTypeString);
                if (this.visaTypeString) {
                    this.visaPlaceholder = 'Visa Type';
                }

                if (this.visaTypeString) {
                    this.visaPlaceholder = 'Visa Type' + ': ' + this.visaTypeString;
                }
                this.morefilterCount++;
                if (this.maintainOrderList.includes('visaTypeModalFilter')) {
                    let index = this.maintainOrderList.indexOf('visaTypeModalFilter')
                    this.maintainOrderList.splice(index, 1);
                    this.maintainOrderList.push('visaTypeModalFilter');
                }
                else {
                    this.maintainOrderList.push('visaTypeModalFilter');
                }
                // // console.log('OUTPUT :in visa type  1602  ', JSON.stringify(this.maintainOrderList));
                // this.notVisatype = true;
                event.currentTarget.parentElement.parentElement.style.display = 'none';
            }
            if (event.target.dataset.id == 'regionSubmit') {
                if (this.regionFilterList.length == 0) {
                    this.regionPlaceHolder = 'Region';
                }
                if (this.regionFilterList.length > 1) {
                    this.regionPlaceHolder = 'Region' + ': (' + this.regionFilterList.length + ')';
                }
                if (this.regionFilterList.length == 1) {

                    this.regionPlaceHolder = 'Region' + ': ' + this.regionFilterList[0];
                }
                // // console.log('OUTPUT :1462 --> ', JSON.stringify(this.regionFilterList));
                this.morefilterCount++;
                if (this.maintainOrderList.includes('regionModalFilter')) {
                    let index = this.maintainOrderList.indexOf('regionModalFilter')
                    this.maintainOrderList.splice(index, 1);
                    this.maintainOrderList.push('regionModalFilter');
                }
                else {
                    this.maintainOrderList.push('regionModalFilter');
                }

                // this.notVisatype = false;

                // // console.log('OUTPUT :in regionModalFilter   1602  ', JSON.stringify(this.maintainOrderList));
                event.currentTarget.parentElement.parentElement.style.display = 'none';
            }
            if (event.target.dataset.id == 'regionalOrgSubmit') {
                if (this.regionOrgFilterList.length == 0) {
                    this.regionOrgPlaceHolder = 'Regional Organization';
                }
                if (this.regionOrgFilterList.length > 1) {
                    this.regionOrgPlaceHolder = 'Regional Organization' + ': (' + this.regionOrgFilterList.length + ')';
                }
                if (this.regionOrgFilterList.length == 1) {

                    this.regionOrgPlaceHolder = 'Regional Organization' + ': ' + this.regionOrgFilterList[0];
                }
                if (this.maintainOrderList.includes('regionOrgModalFilter')) {
                    let index = this.maintainOrderList.indexOf('regionOrgModalFilter')
                    this.maintainOrderList.splice(index, 1);
                    this.maintainOrderList.push('regionOrgModalFilter');
                }
                else {
                    this.maintainOrderList.push('regionOrgModalFilter');
                }
                // // console.log('OUTPUT :in regionOrgModalFilter    1602  ', JSON.stringify(this.maintainOrderList));
                this.morefilterCount++;
                // this.notVisatype = false;
                event.currentTarget.parentElement.parentElement.style.display = 'none';
            }

        }

        catch (err) {
            // console.log('OUTPUT : err in submit options => ', err);
        }
    }

    clearAllData(event) {
        // placeHolders
        this.countryPlaceHolder = 'Country';
        this.classSizePlaceHolder = 'Class-Size';
        this.schoolTypePlaceHolder = 'School Type';
        this.regionPlaceHolder = 'Region';
        this.schoolNamePlaceHolder = 'School Name';
        this.visaPlaceholder = 'Visa Type';
        this.regionOrgPlaceHolder = 'Regional Organization';
        // lists 
        this.countryListFilter = [];
        this.classSizeListFilter = [];
        this.schoolTypeListFilter = [];
        this.regionFilterList = [];
        this.regionOrgFilterList = [];
        this.schoolNameListFilter = [];
        this.visaTypeString = '';
        this.modalFiltersForPillsView = [];
        this.maintainOrderList = [];
        //String 
        this.countryString = '';
        this.classSizeString = '';
        this.schoolTypeString = '';
        this.regionString = '';
        this.schoolNameString = '';
        this.visaRestrictionString = '';
        this.regionOrgString = '';
        this.mainString = '';
        this.countSelectedFilter = 0;
        this.offset = 0;
        this.seeClear = false;
        this.sizeOfSchool = this.copyofAllcount;

        // // console.log('OUTPUT : starting reorder');

        //school type reset 

        this.template.querySelectorAll('.optvalSchoolType').forEach(element => {
            if (element.querySelector('input').checked) {
                // // console.log('OUTPUT : ', JSON.stringify(element.querySelector('input').checked));
                element.querySelector('input').checked = false;
            }
        });

        this.template.querySelector('.schoolTypefilter').style.background = 'transparent';
        this.template.querySelector('.schoolTypefilter').classList.remove('activeFilter');
        this.template.querySelector('.downIconSchool').classList.remove('icons');

        //country reset
        this.template.querySelectorAll('.optvalCountry').forEach(element => {
            if (element.querySelector('input').checked) {
                // // console.log('OUTPUT : ', element.querySelector('input').checked);
                element.querySelector('input').checked = false;
            }
        });
        this.template.querySelector('.countryPrimaryFilter').style.background = 'transparent';
        this.template.querySelector('.countryPrimaryFilter').classList.remove('activeFilter');
        this.template.querySelector('.downIconCountry').classList.remove('icons');

        //class size reset 
        this.template.querySelectorAll('.optvalClassSize').forEach(element => {
            if (element.querySelector('input').checked) {
                // // console.log('OUTPUT : ', element.querySelector('input').checked);
                element.querySelector('input').checked = false;
            }
        });
        this.template.querySelector('.classSizefilter').style.background = 'transparent';
        this.template.querySelector('.classSizefilter').classList.remove('activeFilter');
        this.template.querySelector('.downIconClass').classList.remove('icons');


        //visa type 
        this.template.querySelectorAll('.optvalVisa').forEach(element => {
            if (element.querySelector('input').checked) {
                // // console.log('OUTPUT : ', element.querySelector('input').checked);
                element.querySelector('input').checked = false;

            }
        });



        //reorder the data 

        let reorderList = ['countryOuter', 'classSizeOuter', 'schoolTypeOuter'];
        reorderList = reorderList.reverse();
        reorderList.forEach(currentItem => {
            //TODO : currentItem
            let test = this.template.querySelector('.' + currentItem);
            // // console.log('OUTPUT : dynamic values ',test);
            this.template.querySelector('.mainDiv').prepend(test);
        });


        this.loadmoredata();

    }

    resetOptions(event) {
        try {
            // // console.log('OUTPUT 947 : ', event.target.dataset.id);

            // code of country Reset Primary filter

            if (event.target.dataset.id == 'countryReset') {
                this.template.querySelectorAll('.optvalCountry').forEach(element => {
                    if (element.querySelector('input').checked) {
                        // // console.log('OUTPUT : ', element.querySelector('input').checked);
                        element.querySelector('input').checked = false;
                    }
                });
                //event.currentTarget.parentElement.parentElement.parentElement.querySelector('.countryPrimaryFilter').value = '';
                event.currentTarget.parentElement.parentElement.style.display = 'none';
                this.countryListFilter = [];
                this.countryPlaceHolder = 'Country';
                this.primaryCount--;
                // append child in last 
                let test = this.template.querySelector('.countryOuter');
                // // console.log('OUTPUT : dynamic values ',test);
                this.template.querySelector('.mainDiv').appendChild(test);

                if (this.maintainOrderList.includes('countryOuter')) {
                    // // console.log('OUTPUT : before splice', this.maintainOrderList);
                    let index = this.maintainOrderList.indexOf('countryOuter');
                    this.maintainOrderList.splice(index, 1);
                }
                //  // console.log('OUTPUT : before splice', this.maintainOrderList);


                this.template.querySelectorAll('.countrycheck').forEach(element => {
                    element.style.visibility = 'visible';
                    element.style.position = 'relative';
                });
                this.template.querySelector('.countrysearch').value = ''


                this.template.querySelector('.countryPrimaryFilter').style.background = 'transparent';
                this.template.querySelector('.countryPrimaryFilter').classList.remove('activeFilter');
                this.template.querySelector('.downIconCountry').classList.remove('icons');

                // // // console.log('OUTPUT : 1904',this.template.querySelector('.downIcon').classList);


                // this.applyfilters();
            }

            // code of class size reset primary filter

            if (event.target.dataset.id == 'classSizereset') {
                this.template.querySelectorAll('.optvalClassSize').forEach(element => {
                    if (element.querySelector('input').checked) {
                        // // console.log('OUTPUT : ', element.querySelector('input').checked);
                        element.querySelector('input').checked = false;
                    }
                });
                //  event.currentTarget.parentElement.parentElement.parentElement.querySelector('.classSizefilter').value = '';
                event.currentTarget.parentElement.parentElement.style.display = 'none';
                this.classSizePlaceHolder = 'Class-Size';
                this.classSizeListFilter = [];

                // append the child in last     
                let test = this.template.querySelector('.classSizeOuter');
                // // console.log('OUTPUT : dynamic values ',test);
                this.template.querySelector('.mainDiv').appendChild(test);

                if (this.maintainOrderList.includes('classSizeOuter')) {
                    let index = this.maintainOrderList.indexOf('classSizeOuter');
                    this.maintainOrderList.splice(index, 1);
                }

                this.primaryCount--;
                this.template.querySelector('.classSizefilter').style.background = 'transparent';
                this.template.querySelector('.classSizefilter').classList.remove('activeFilter');
                this.template.querySelector('.downIconClass').classList.remove('icons');
                // this.template.querySelector('.classSizefilter').classList.add('inactiveFilter');
                // this.applyfilters();

            }
            //code of school type reset primary filter 

            if (event.target.dataset.id == 'schoolTypeReset') {
                try {
                    // // console.log('OUTPUT :coming in the school type reset ');
                    this.template.querySelectorAll('.optvalSchoolType').forEach(element => {
                        if (element.querySelector('input').checked) {
                            // // console.log('OUTPUT : ', JSON.stringify(element.querySelector('input').checked));
                            element.querySelector('input').checked = false;
                        }
                    });
                    // event.currentTarget.parentElement.parentElement.parentElement.querySelector('.schoolTypefilter').value = '';
                    this.schoolTypeListFilter = [];
                    this.schoolTypePlaceHolder = 'School Type'
                    // event.currentTarget.parentElement.parentElement.style.display = 'none';
                    event.currentTarget.parentElement.parentElement.style.display = 'none';
                    //this.template.querySelector('.schoolTypeData').style.display = 'none';
                    this.primaryCount--;

                    let test = this.template.querySelector('.schoolTypeOuter');
                     // console.log('OUTPUT : dynamic values ',test);
                    this.template.querySelector('.mainDiv').appendChild(test);
                    
                    if (this.maintainOrderList.includes('schoolTypeOuter')) {
                        let index = this.maintainOrderList.indexOf('schoolTypeOuter');
                        this.maintainOrderList.splice(index, 1);
                    }


                    this.template.querySelector('.schoolTypeSearch').value = '';
                    // if (event.target.dataset.id == 'schoolTypeSubmit') {
                    this.template.querySelectorAll('.schoolTypeData').forEach(element => {
                        element.style.visibility = 'visible';
                        element.style.position = 'relative';
                    });
                    // }
                    this.template.querySelector('.schoolTypefilter').style.background = 'transparent';
                    this.template.querySelector('.schoolTypefilter').classList.remove('activeFilter');
                    this.template.querySelector('.downIconSchool').classList.remove('icons');

                    // this.applyfilters();

                } catch (err) {
                    // // console.log('OUTPUT :1531 ', JSON.stringify(err));
                }

            }

            if (event.target.dataset.id == 'schoolNameReset') {
                this.template.querySelectorAll('.optvalSchoolName').forEach(element => {
                    if (element.querySelector('input').checked) {
                        // // console.log('OUTPUT : ', element.querySelector('input').checked);
                        element.querySelector('input').checked = false;
                    }
                });
                event.currentTarget.parentElement.parentElement.style.display = 'none';

                if (this.maintainOrderList.includes('schoolNameModalFilter')) {
                    let index = this.maintainOrderList.indexOf('schoolNameModalFilter')
                    this.maintainOrderList.splice(index, 1);
                    this.template.querySelector('.schoolNameModalFilter').removeElement();
                }
                this.template.querySelector('.schoolnameSearch').value = '';
                this.template.querySelectorAll('.schoolNamecss').forEach(element => {
                    element.style.visibility = 'visible';
                    element.style.position = 'relative';
                });

                this.schoolNameListFilter = [];
                this.schoolNamePlaceHolder = 'School Name'
                this.morefilterCount--;
                // this.applyfilters();

            }

            if (event.target.dataset.id == 'morefilterreset') {
                if (this.template.querySelector('.schoolNameModalFilter') && this.template.querySelector('.schoolNameModalFilter').classList.contains('schoolNameModalFilter') && event.target.dataset.value == 'School Name') {
                    var idx = 0;
                    for (let i = 0; i < this.modalFiltersForPillsView.length; i++) {
                        if (this.modalFiltersForPillsView[i].placeholder == 'School Name') {
                            idx = i;
                        }
                    }
                    if (this.maintainOrderList.includes('schoolNameModalFilter')) {
                        let index = this.maintainOrderList.indexOf('schoolNameModalFilter')
                        this.maintainOrderList.splice(index, 1);
                        this.template.querySelector('.schoolNameModalFilter').removeElement();
                    }
                    // // console.log('OUTPUT : ', idx);

                    this.modalFiltersForPillsView.splice(idx, 1);


                    this.template.querySelectorAll('.schoolNameModalFilter').forEach(element => {
                        if (element.querySelector('input') && element.querySelector('input').checked) {
                            element.querySelector('input').checked = false;
                        }
                    });

                    this.template.querySelectorAll('.optvalSchoolName').forEach(element => {
                        if (element.querySelector('input').checked) {
                            element.querySelector('input').checked = false;
                        }
                    });
                    event.currentTarget.parentElement.parentElement.style.display = 'none';
                    this.schoolNameListFilter = [];
                    this.schoolNamePlaceHolder = 'School Name';
                    this.morefilterCount--;
                }








                if (this.template.querySelector('.visaTypeModalFilter') && this.template.querySelector('.visaTypeModalFilter').classList.contains('visaTypeModalFilter') && event.target.dataset.value == 'Visa Type') {
                    this.visaPerference = [];
                    this.visaPlaceholder = 'Visa Type';
                    var idx;
                    for (let i = 0; i < this.modalFiltersForPillsView.length; i++) {
                        //code
                        if (this.modalFiltersForPillsView[i].placeholder == 'Visa Type') {
                            idx = i;
                        }
                    }

                    this.modalFiltersForPillsView.splice(idx, 1);
                    event.currentTarget.parentElement.parentElement.style.display = 'none';
                    // // console.log('OUTPUT : 2330 ', evt.currentTarget.parentElement.parentElement.querySelectorAll('input'));
                    //  evt.currentTarget.parentElement.parentElement.querySelectorAll('input').forEach(ele =>{
                        // // console.log('OUTPUT : ele 2332 ', ele.checked );
                        // ele.checked = false;
                    //  })   
                    // this.template.querySelectorAll
                    this.template.querySelectorAll('[data-id="Yes"]').forEach(item =>{
                        item.checked = false;
                    })
                    this.template.querySelectorAll('[data-id="No"]').forEach(item => {
                        item.checked = false;
                    })
                    this.template.querySelectorAll('[data-id="No Preference"]').forEach(item => {
                        item.checked = false;
                    })
                    //// console.log('OUTPUT : 2303',this.template.querySelector('[data-id="No Preference"]').checked = false);
                    this.visaTypeString = '';

                    if (this.maintainOrderList.includes('visaTypeModalFilter')) {
                        let index = this.maintainOrderList.indexOf('visaTypeModalFilter')
                        this.maintainOrderList.splice(index, 1);
                      //  this.template.querySelector('.visaTypeModalFilter').removeElement();
                    }


                    //this.template.querySelector('')

                    // this.template.querySelectorAll('.visaTypeModalFilter').forEach(element => {
                    //     if (element.querySelector('input') && element.querySelector('input').checked) {
                    //         // // console.log('OUTPUT : ', element.querySelector('input').checked);
                    //         element.querySelector('input').checked = false;
                    //     }
                    // });

                    // this.template.querySelectorAll('.optvalVisa').forEach(element => {
                    //     if (element.querySelector('input').checked) {
                    //         // // console.log('OUTPUT : ', element.querySelector('input').checked);
                    //         element.querySelector('input').checked = false;

                    //     }
                    // });


                    // // console.log('OUTPUT : ', idx);

                    this.morefilterCount--;

                }
                if (this.template.querySelector('.regionModalFilter') && this.template.querySelector('.regionModalFilter').classList.contains('regionModalFilter') && event.target.dataset.value == 'Region') {
                    this.visaPerference = [];
                    this.visaPlaceholder = 'Region';
                    var idx;
                    for (let i = 0; i < this.modalFiltersForPillsView.length; i++) {
                        //code
                        if (this.modalFiltersForPillsView[i].placeholder == 'Region') {
                            idx = i;
                        }
                    }
                    if (this.maintainOrderList.includes('regionModalFilter')) {
                        let index = this.maintainOrderList.indexOf('regionModalFilter')
                        this.maintainOrderList.splice(index, 1);
                        this.template.querySelector('.regionModalFilter').removeElement();
                    }

                    this.modalFiltersForPillsView.splice(idx, 1);
                    // // console.log('OUTPUT : in modalFiltersForPillsView region name ', this.modalFiltersForPillsView);
                    event.currentTarget.parentElement.parentElement.style.display = 'none';

                    this.template.querySelectorAll('.regionModalFilter').forEach(element => {
                        if (element.querySelector('input') && element.querySelector('input').checked) {
                            // // console.log('OUTPUT : ', element.querySelector('input').checked);
                            element.querySelector('input').checked = false;
                        }
                    });

                    this.template.querySelectorAll('.optvalRegion').forEach(element => {
                        if (element.querySelector('input').checked) {
                            // // console.log('OUTPUT : ', element.querySelector('input').checked);
                            element.querySelector('input').checked = false;

                        }
                        this.regionFilterList = [];
                        this.regionPlaceHolder = 'Region';
                    });

                    // // console.log('OUTPUT : ', idx);

                    this.morefilterCount--;
                }
                if (this.template.querySelector('.regionOrgModalFilter') && this.template.querySelector('.regionOrgModalFilter').classList.contains('regionOrgModalFilter') && event.target.dataset.value == 'Regional Organization') {
                    this.regionOrgFilterList = [];
                    this.regionOrgPlaceHolder = 'Regional Organization';
                    var idx;
                    for (let i = 0; i < this.modalFiltersForPillsView.length; i++) {
                        //code
                        if (this.modalFiltersForPillsView[i].placeholder == 'Regional Organization') {
                            // // console.log('OUTPUT :in regional org  ', this.modalFiltersForPillsView[i]);
                            idx = i;
                        }
                    }
                    if (this.maintainOrderList.includes('regionOrgModalFilter')) {
                        let index = this.maintainOrderList.indexOf('regionOrgModalFilter')
                        this.maintainOrderList.splice(index, 1);
                        this.template.querySelector('.regionOrgModalFilter').removeElement();
                    }
                    // // console.log('OUTPUT : ', idx);

                    this.modalFiltersForPillsView.splice(idx, 1);
                    // // console.log('OUTPUT : in modalFiltersForPillsView region org name ', this.modalFiltersForPillsView);

                    this.template.querySelectorAll('.regionOrgModalFilter').forEach(element => {
                        if (element.querySelector('input') && element.querySelector('input').checked) {
                            // // console.log('OUTPUT : ', element.querySelector('input').checked);
                            element.querySelector('input').checked = false;
                        }
                    });

                    this.template.querySelectorAll('.optvalRegionalOrg').forEach(element => {
                        if (element.querySelector('input').checked) {
                            // // console.log('OUTPUT : ', element.querySelector('input').checked);
                            element.querySelector('input').checked = false;

                        }
                    });

                    this.regionOrgFilterList = [];
                    this.regionOrgPlaceHolder = 'Regional Organization';
                    event.currentTarget.parentElement.parentElement.style.display = 'none';
                    this.morefilterCount--;
                }
                // this.applyfilters();
            }




            if (event.target.dataset.id == 'regionalOrgReset') {
                this.regionOrgFilterList = [];
                this.regionOrgPlaceHolder = 'Regional Organization';
                var idx;
                for (let i = 0; i < this.modalFiltersForPillsView.length; i++) {
                    //code
                    if (this.modalFiltersForPillsView[i].placeholder == 'Regional Organization') {
                        // // console.log('OUTPUT :in regional org  ', this.modalFiltersForPillsView[i]);
                        idx = i;
                    }

                }
                if (this.maintainOrderList.includes('regionOrgModalFilter')) {
                    let index = this.maintainOrderList.indexOf('regionOrgModalFilter')
                    this.maintainOrderList.splice(index, 1);
                    this.template.querySelector('.regionOrgModalFilter').removeElement();
                }
                // // console.log('OUTPUT : ', idx);

                this.modalFiltersForPillsView.splice(idx, 1);
                // // console.log('OUTPUT : in modalFiltersForPillsView region org name ', this.modalFiltersForPillsView);

                this.template.querySelectorAll('.regionOrgModalFilter').forEach(element => {
                    if (element.querySelector('input') && element.querySelector('input').checked) {
                        // // console.log('OUTPUT : ', element.querySelector('input').checked);
                        element.querySelector('input').checked = false;
                    }
                });

                this.template.querySelectorAll('.optvalRegionalOrg').forEach(element => {
                    if (element.querySelector('input').checked) {
                        // // console.log('OUTPUT : ', element.querySelector('input').checked);
                        element.querySelector('input').checked = false;

                    }
                });
                this.regionOrgFilterList = [];
                this.regionOrgPlaceHolder = 'Regional Organization';
                event.currentTarget.parentElement.parentElement.style.display = 'none';
                this.morefilterCount--;

            }



            if (event.target.dataset.id == 'visaReset') {
                //  this.visaPerference = [];
                //     this.visaPlaceholder = 'Visa Type';
                var idx;
                for (let i = 0; i < this.modalFiltersForPillsView.length; i++) {
                    //code
                    if (this.modalFiltersForPillsView[i].placeholder == 'Visa Type') {
                        idx = i;
                    }
                }

                if (this.maintainOrderList.includes('visaTypeModalFilter')) {
                    let index = this.maintainOrderList.indexOf('visaTypeModalFilter')
                    this.maintainOrderList.splice(index, 1);
                   // this.template.querySelector('.visaTypeModalFilter').removeElement();
                    this.visaTypeString = '';
                }

                this.template.querySelectorAll('[data-id="Yes"]').forEach(item =>{
                        item.checked = false;
                    })
                    this.template.querySelectorAll('[data-id="No"]').forEach(item => {
                        item.checked = false;
                    })
                    this.template.querySelectorAll('[data-id="No Preference"]').forEach(item => {
                        item.checked = false;
                    })
                // // console.log('OUTPUT : ', idx);

                this.modalFiltersForPillsView.splice(idx, 1);
                // // console.log('OUTPUT : in modalFiltersForPillsView region name ', this.modalFiltersForPillsView);
                event.currentTarget.parentElement.parentElement.style.display = 'none';

                this.template.querySelectorAll('.optvalVisa').forEach(element => {
                    if (element.querySelector('input') && element.querySelector('input').checked) {
                        // // console.log('OUTPUT : ', element.querySelector('input').checked);
                        element.querySelector('input').checked = false;
                    }
                });

                this.template.querySelectorAll('.optvalVisa').forEach(element => {
                    if (element.querySelector('input').checked) {
                        // // console.log('OUTPUT : ', element.querySelector('input').checked);
                        element.querySelector('input').checked = false;

                    }
                    this.visaPerference = [];
                    this.visaPlaceholder = 'Visa Type';
                });

                this.morefilterCount--;
            }
            if (event.target.dataset.id == 'regionReset') {

                var idx;
                for (let i = 0; i < this.modalFiltersForPillsView.length; i++) {
                    //code
                    if (this.modalFiltersForPillsView[i].placeholder == 'Region') {
                        idx = i;
                    }
                }

                if (this.maintainOrderList.includes('regionModalFilter')) {
                    let index = this.maintainOrderList.indexOf('regionModalFilter')
                    this.maintainOrderList.splice(index, 1);
                    this.template.querySelector('.regionModalFilter').removeElement();
                }
                // // console.log('OUTPUT : ', idx);

                this.modalFiltersForPillsView.splice(idx, 1);
                // // console.log('OUTPUT : in modalFiltersForPillsView region name ', this.modalFiltersForPillsView);
                event.currentTarget.parentElement.parentElement.style.display = 'none';

                this.template.querySelectorAll('.optvalRegion').forEach(element => {
                    if (element.querySelector('input') && element.querySelector('input').checked) {
                        // // console.log('OUTPUT : ', element.querySelector('input').checked);
                        element.querySelector('input').checked = false;
                    }
                });

                this.template.querySelectorAll('.optvalRegion').forEach(element => {
                    if (element.querySelector('input').checked) {
                        // // console.log('OUTPUT : ', element.querySelector('input').checked);
                        element.querySelector('input').checked = false;

                    }
                    this.regionFilterList = [];
                    this.regionPlaceHolder = 'Region';
                });
                this.morefilterCount--;
            }
            // // // console.log('OUTPUT :2003 ==>  ',this.primaryCount ,'more count ==> ' , this.morefilterCount);
            // if(this.primaryCount <= 0 && this.morefilterCount <= 0 ){
            //     this.seeClear = false;
            // }

            this.applyfilters();
            this.template.querySelector('.optionsOverlay').style.zIndex = '-1';
        } catch (err) {
             // console.log('OUTPUT : ',JSON.stringify( err.message));
        }

    }

    searchSchoolfunc(evt) {
        // console.log('OUTPUT : mainstring 2604 ', this.mainString , 'evt value   == ' , evt.currentTarget.value);
        if (this.mainString == '' && evt.currentTarget.value == '') {
            // console.log('OUTPUT : coming in if');
            this.accountData = this.copyOfAccountData;
            this.sizeOfSchool = this.AllCount;
            this.seechildCompo = true;
            this.seeError = false;
            this.value = this.accountData[0];
        }
        if(evt.currentTarget.value != '') {


            // console.log('OUTPUT :2589  offset ', this.offset, 'limitSize ', this.limitSize, 'mainstring', this.mainString);
            // console.log(evt.target.value)
            // console.log('OUTPUT :2586 ', this.mainString);
            try{

            searchSchoolData({
                searchfield: evt.target.value,
                offset: this.offset,
                limitSize: this.limitSize,
                mainStringValue: this.mainString
            })
                .then(res => {
                    // console.log('OUTPUT : ', res);

                    this.accountData = res;
                    this.sizeOfSchool = res.length;
                    if (res.length == 0) {
                         this.seechildCompo = false;
                         this.seeErrorOnSearch = true
                         this.seeError = true;
                    } else {
                            

                        this.seechildCompo = true;
                        this.seeError = false;
                        this.seeErrorOnSearch = false;
                    }
                }).catch(res=>{

                    // console.log('OUTPUT :err in apex  ',JSON.stringify(err.message));
                })
                
            }catch(err){
                // console.log('OUTPUT :2649 ',JSON.stringify(err.message));
            }

        }


    }
    handleBestMatch(event) {
        //  // // console.log('OUTPUT :for sort order ==>  ', this.sortPlaceHolder = this.sortPlaceHolder + ': '+ event.currentTarget.innerHTML);
        // let contactList = this.bestMatchJob;
        if (event.currentTarget.innerHTML == 'Alphabetical A-Z') {
            // this.sortPlaceHolder = this.sortPlaceHolder + ': '+ event.currentTarget.innerHTML;
            let str = event.currentTarget.innerHTML.split(' ');
            // // console.log('OUTPUT : 2385  == > ',str[1]);

            event.currentTarget.parentElement.parentElement.parentElement.querySelector('.inputBar').value = `Sort Order: A-Z`
            this.sortData('Name', 'asc')

        }

        if (event.currentTarget.innerHTML == 'Alphabetical Z-A') {
            // this.sortPlaceHolder = this.sortPlaceHolder + ': '+ event.currentTarget.innerHTML;
            event.currentTarget.parentElement.parentElement.parentElement.querySelector('.inputBar').value = `Sort Order: Z-A`
            this.sortData('Name', 'dsc')

        }
        if (event.currentTarget.innerHTML == 'BEST MATCHES') {
            //  this.sortPlaceHolder = this.sortPlaceHolder + ': '+ event.currentTarget.innerHTML;
            event.currentTarget.parentElement.parentElement.parentElement.querySelector('.inputBar').value = `Sort Order: ` + event.currentTarget.innerHTML;
            this.accountData = this.copyOfAccountData;
            this.value = this.accountData[0];
            this.getClick1(this.accountData[0].Id);
        }
        // this.template.querySelector('.bestMatchFilter').placeholder = this.template.querySelector('.bestMatchFilter').placeholder +': '+ event.currentTarget.innerHTML
        // // // console.log('OUTPUT :2052 ',this.template.querySelector('.bestMatchFilter').placeholder = event.currentTarget.innerHTML);
        // event.currentTarget.parentElement.parentElement.parentElement.querySelector('.inputBar').value = `Sort Order: `+event.currentTarget.innerHTML;
        event.currentTarget.parentElement.parentElement.style.display = 'none';
        this.optionsOverlayClicked();
    }

    sortData(fieldname, direction) {
        let parseData = JSON.parse(JSON.stringify(this.accountData));
        let keyValue = (a) => {
            // // // console.log(a[fieldname]);
            return a[fieldname];
        };
        let isReverse = direction === 'asc' ? 1 : -1;
        // sorting data
        parseData.sort((x, y) => {

            x = keyValue(x) ? keyValue(x) : ''; // handling null values
            y = keyValue(y) ? keyValue(y) : '';
            return isReverse * ((x > y) - (y > x));
        });
        try {

            this.accountData = JSON.parse(JSON.stringify(parseData));
            this.value = this.accountData[0];
            this.getClick1(this.accountData[0].Id);
        }
        catch (err) {
            // console.log('OUTPUT 2626 : ', JSON.stringify(err.message));
        }

    }

}