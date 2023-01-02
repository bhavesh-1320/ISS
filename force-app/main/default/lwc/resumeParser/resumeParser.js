import { LightningElement, api,track,wire} from 'lwc';
// import pages from '@salesforce/resourceUrl/PageImg';
import upImg from '@salesforce/resourceUrl/UploadImg';
import uploadIcon from '@salesforce/resourceUrl/uploadIcon';
import affindaResumeParser from '@salesforce/apex/CalloutClass.affindaResumeParser';
import pickListValueDynamically from '@salesforce/apex/CalloutClass.pickListValueDynamically';
import updateRecords from '@salesforce/apex/CalloutClass.updateRecords';
export default class ResumeParser extends LightningElement {
    notUpload = true;
    showImportCard = false;
    filename='';
    upImg = upImg;
    @api getRecordData;
    pagiNation = '1 Of 3';
    @api fPage = false;
    @api sPage = false;
    @api tPage = false;
    @api checkSavePages;
    iconName='';
    uploadIcon = uploadIcon;
    get acceptedFormats() {
        return ['.pdf', '.docx'];
    }
    // page1 = pages+'/page1.png';
    // page2 = pages+'/page2.png';
    // page3 = pages+'/page3.png';
    @api userBasicData;
    docId='';
    spin = false;
    recordData ={firstpage:'',secondpage:'',thirdpage:''}
    userData = {};
    education=[];
    workExps=[];
    countryCareerValues;
    educationCountryValues;
    cardDetails=false;

    @wire(pickListValueDynamically, {customObjInfo: {'sobjectType' : 'Career_History__c'},
    selectPicklistApi: 'Country__c'}) 
    selectTargetValue({data,error}){
        if(data){
            this.countryCareerValues = data;
            console.log('data 41-->',data);
        }if(error){
            console.log('error');
        }
    }

    @wire(pickListValueDynamically, {customObjInfo: {'sobjectType' : 'Education_History__c'},
    selectPicklistApi: 'Country__c'}) 
    selectTargetValues({data,error}){
        if(data){
            this.educationCountryValues = data;
            console.log('data 52-->',data);
        }if(error){
            console.log('error');
        }
    }

    connectedCallback() {
        // console.log('selectTargetValues-->',JSON.stringify(this.selectTargetValues.data));
    }

    @api 
    saveData(pagesdata,recordsData){
        
        
        // console.log('getRecordData.check -->',this.getRecordData);
        // console.log('recordData.check -->',this.recordData);
        
        let pagesData = JSON.parse(JSON.stringify(pagesdata));
        let rcdData = JSON.parse(JSON.stringify(recordsData))
        if(pagesData.firstpage){
            this.recordData.firstpage = rcdData.firstpage
        }

        if(pagesData.secondpage){
            this.recordData.secondpage = rcdData.secondpage
        }

        if(pagesdata.thirdpage){

            this.recordData.thirdpage = rcdData.thirdpage
        }

        
        


     
        console.log('pagesData-->',pagesData)
        console.log('recordData-->',this.recordData);
        
        try{
            updateRecords({'fpage':pagesData.firstpage,'spage':pagesData.secondpage,'tpage':pagesdata.thirdpage,'recordData':JSON.stringify(this.recordData)}).then(res=>{
            console.log('res--->',res)
        }).catch(err=>{
            console.log('err-->',err);
        })

        }catch( err ){
            console.log( err );
        }
        

        console.log('class called')
    }



     
            





    handleChange(event){

        if(event.target.name =='firstname'){
            this.userData.first = event.target.value
        }
        else if(event.target.name=='lastname'){
            this.userData.last = event.target.value
        }
        else if(event.target.name=='title'){
            this.userData.title = event.target.value
        }
        else if(event.target.name=='email'){
            this.userData.email = event.target.value
        }
        else if(event.target.name=='phone'){
            this.userData.phone = event.target.value
        }
        else if(event.target.name=='dob'){
            // this.userData.dob = event.target.value.substring(5,7)+'/'+event.target.value.substring(8,10)+'/'+event.target.value.substring(0,4)
            this.userData.dob = event.target.value;
        }
        else if(event.target.name=='lndprofile'){
            this.userData.linkedin = event.target.value
        }
        else if(event.target.name=='city'){
            this.userData.city = event.target.value
        }
        else if(event.target.name=='state'){
            this.userData.state = event.target.value
        }
        else if(event.target.name=='country'){
            this.userData.country = event.target.value
        }
        else if(event.target.name=='postalcode'){
            this.userData.postalCode = event.target.value
        }
        else if(event.target.name=='add1' || event.target.name=='checkbox-toggle-16' || event.target.name=='checkbox-toggle-17' || event.target.name=='add2'){
            this.userData[event.target.name] = event.target.value
        }
        else if(event.target.name == 'institution'){
            this.education[event.target.dataset.idx].institution = event.target.value;
        }
        else if(event.target.name == 'countryEdu'){
            this.education[event.target.dataset.idx].country = event.target.value;
        }
        else if(event.target.name == 'tyle'){
            this.education[event.target.dataset.idx]['tyle'] = event.target.value;
        }
        else if(event.target.name == 'major'){
            this.education[event.target.dataset.idx]['major'] = event.target.value;
        }
        else if(event.target.name == 'start'){
            this.education[event.target.dataset.idx].start = event.target.value;
        }
        else if(event.target.name == 'end'){
            this.education[event.target.dataset.idx].end = event.target.value;
        }
        else if(event.target.name == 'checkbox-toggle-19'){
            this.education[event.target.dataset.idx]['checkboxdegree'] = event.target.value;
        }
        else if(event.target.name == 'checkbox-toggle-20'){
            this.education[event.target.dataset.idx]['checkboxedu'] = event.target.value;
        }

        // Third Page 
        else if(event.target.name == 'startcareer'){
            // this.workExps[event.target.dataset.idx].start = event.target.value.substring(5,7)+'/'+event.target.value.substring(8,10)+'/'+event.target.value.substring(0,4);
            this.workExps[event.target.dataset.idx].start = event.target.value
        }
        else if(event.target.name == 'endcareer'){
            // this.workExps[event.target.dataset.idx].end = event.target.value.substring(5,7)+'/'+event.target.value.substring(8,10)+'/'+event.target.value.substring(0,4);
            this.workExps[event.target.dataset.idx].end = event.target.value;
        }
        else if(event.target.name == 'organization'){
            this.workExps[event.target.dataset.idx].organization = event.target.value;
        }
        else if(event.target.name == 'jobTitle'){
            this.workExps[event.target.dataset.idx].jobTitle = event.target.value;
        }
        else if(event.target.name == 'curriculum'){
            this.workExps[event.target.dataset.idx]['curriculum'] = event.target.value;
        }
        else if(event.target.name == 'jobtype'){
            this.workExps[event.target.dataset.idx]['jobtype'] = event.target.value;
        }
        else if(event.target.name == 'subject'){
            this.workExps[event.target.dataset.idx]['subject'] = event.target.value;
        }
        else if(event.target.name == 'countryCareer'){
            console.log('event.target.value-->',event.target.value);
            this.template.querySelector('.noneField').disabled = true;
            this.workExps[event.target.dataset.idx].country = event.target.value;
        }
        else if(event.target.name == 'stateCareer'){
            this.workExps[event.target.dataset.idx].state = event.target.value;
        }



        this.recordData.firstpage = this.userData;
        this.recordData.secondpage = this.education;
        this.recordData.thirdpage = this.workExps;
        console.log('recordData.check -->',this.recordData);

        const rcdData = new CustomEvent( 'getrecorddata',{detail:this.recordData} );
        this.dispatchEvent( rcdData );

        // console.log('event-->',event);
        // console.log('event name-->',event.target.name);


        
    }




    handleNext( event ){
        // console.log('-->',event.target.classList);
        var l = event.target.dataset.btn;
        // console.log('LL:', l);
        if( l == 'one' ){
            this.sPage = true;
            this.tPage = false;
            this.fPage = false;
        }else if( l == 'two' ){
            this.sPage = false;
            this.tPage = true;
            this.fPage = false;
        }
        if( l == 'on' ){
            this.pagiNation = '1 Of 3';
            this.removeAllClasses();

            event.target.classList.add( 'fillColor' );
            this.template.querySelector('.twBtn').classList.add('grayColor'); 
            this.template.querySelector('.thrBtn').classList.add('grayColor');

            this.sPage = false;
            this.tPage = false;
            this.fPage = true;
        } else if( l == 'tw' ){
            this.pagiNation = '2 Of 3';
            this.removeAllClasses();

            event.target.classList.add( 'fillColor' );
            this.template.querySelector('.fBtn').classList.add('blueColor'); 
            this.template.querySelector('.thrBtn').classList.add('grayColor');

            this.sPage = true;
            this.tPage = false;
            this.fPage = false;
        } else if( l == 'thr' ){
            this.pagiNation = '3 Of 3';
            this.removeAllClasses();

            event.target.classList.add( 'fillColor' );
            this.template.querySelector('.twBtn').classList.add('blueColor'); 
            this.template.querySelector('.fBtn').classList.add('blueColor');

            this.sPage = false;
            this.tPage = true;
            this.fPage = false;
        }
    }
    removeAllClasses(){
        this.template.querySelector('.fBtn').classList.remove('blueColor'); 
        this.template.querySelector('.fBtn').classList.remove('grayColor');
        this.template.querySelector('.fBtn').classList.remove('fillColor');

        this.template.querySelector('.twBtn').classList.remove('blueColor'); 
        this.template.querySelector('.twBtn').classList.remove('grayColor');
        this.template.querySelector('.twBtn').classList.remove('fillColor');

        this.template.querySelector('.thrBtn').classList.remove('blueColor'); 
        this.template.querySelector('.thrBtn').classList.remove('grayColor');
        this.template.querySelector('.thrBtn').classList.remove('fillColor');
    }

   
    handleUploadFinished( event ){
        // this.spin = false;
        this.notUpload = false;
        const uploadedFiles = event.detail.files[0];
        // console.log(uploadedFiles);
        this.filename = event.detail.files[0].name;
        this.docId = event.detail.files[0].documentId;
        if( event.detail.files[0].mimeType == "application/pdf" ){
            this.iconName = 'doctype:pdf';
        }else{
            this.iconName = 'doctype:word';
        }
    }

    
    handleImport( event ){
        this.spin = true;
        // console.log('this is con id-->',this.docId);
        affindaResumeParser({'contentDocumentID':this.docId}).then(res=>{
            // console.log(res);
            var jsonRes = JSON.parse( res );
            // console.log('rr:',jsonRes);
            var data = jsonRes.data;
            var obj = {};
            // console.log('d',data);
            if( data != undefined ){
                //Personal Info
                obj.dob = data.dateOfBirth;
                obj.email = data.emails.join();
                if( data.name != undefined ){
                    obj.first = data.name.first;
                    obj.last = data.name.last;
                    obj.title = data.name.title;
                }
                obj.phone = data.phoneNumbers.join();
                obj.linkedin = data.linkedin;

                //Address
                obj.city = '';
                obj.state = '';
                obj.postalCode = '';
                obj.country = '';
                obj.street = '';
                if( data.location != undefined ){
                    if( data.location.city != undefined ){
                        obj.city = data.location.city;
                    }
                    if( data.location.state != undefined ){
                        obj.state = data.location.state;
                    }
                    if( data.location.postalCode != undefined ){
                        obj.postalCode = data.location.postalCode;
                    }
                    if( data.location.country != undefined ){
                        obj.country = data.location.country;
                    }
                    if( data.location.street != undefined ){
                        obj.street = data.location.street;
                    }
                }
                var ed = [];
                for( var val of data.education ){
                    var obj1 = {};
                    obj1.institution = val.organization;
                    obj1.country = '';
                    if( val.location != undefined ){
                        if( val.location.country != undefined ){
                            // obj1.country = val.location.country;
                        }
                    }
                    if( val.dates != undefined ){
                        obj1.start = val.dates.startDate;
                        obj1.end = val.dates.completionDate;
                    }
                    ed.push( obj1 );
                }
                this.education = ed;
                this.recordData.secondpage = this.education

                var wExp = [];
                for( var val of data.workExperience ){
                    var obj1 = {};
                    obj1.organization = val.organization;
                    obj1.country = '';
                    obj1.state = '';
                    if( val.location != undefined ){
                        if( val.location.country != undefined ){
                            // obj1.country = val.location.country;
                            // console.log('obj1.country-->',obj1.country)
                            
                            // this.template.querySelector(`[data-id="${obj1.country}"]`).setattribute('selected',true);
                            //console.log('OUTPUT : ',this.template.querySelector(`[data-id="${obj1.country}"]`));                            
                        }
                        if( val.location.state != undefined ){
                            obj1.state = val.location.state;
                        }                        
                    }
                    if( val.dates != undefined ){
                        obj1.start = val.dates.startDate;
                        
                        
                        obj1.end = val.dates.endDate;
                    }
                    obj1.jobTitle = val.jobTitle;
                    wExp.push( obj1 );
                }
                this.workExps = wExp;
                this.recordData.thirdpage = this.workExps

                // console.log('this.education-->',this.education)
                // console.log('this.workexps-->',this.workExps)

            }
            this.spin = false;
            this.showImportCard = true;
            this.userData = obj;
            this.recordData.firstpage = this.userData
            const rcdData = new CustomEvent( 'getrecorddata',{detail:this.recordData} );
            this.dispatchEvent( rcdData );

            const evt = new CustomEvent( 'pagechange' );
            this.dispatchEvent( evt );
        }).catch(err=>{
            // console.log(err);
            this.spin = false;  
        });
    }
    handleAdd( event ){
        var btn = event.target.dataset.btn;
        if( btn == 'Career' ){
            var workExp = this.workExps.slice();
            workExp.push( {organization:'',
                country:'',
                state:'',
                start:'',
                end:'',
                jobTitle:''} );
            this.workExps = workExp;
            this.recordData.thirdpage = this.workExps
        }else{
            var ed = this.education.slice();
            ed.push( {institution:'',
                country:'',
                state:'',
                start:'',
                end:'',
                jobTitle:''} );
            this.education = ed;
            this.recordData.secondpage = this.education;
        }
        const rcdData = new CustomEvent( 'getrecorddata',{detail:this.recordData} );
        this.dispatchEvent( rcdData );
    }
    handleDel( event ){
        var ic = event.target.dataset.ic;
        var idx = event.target.dataset.idx;
        if( ic == 'Edu' ){
            var ed = this.education.slice();
            ed.splice( idx, 1 );
            this.education = ed;
            this.recordData.secondpage = this.education;
        }else{
            var ed = this.workExps.slice();
            ed.splice( idx, 1 );
            this.workExps = ed;
            this.recordData.thirdpage = this.workExps;
        }

        const rcdData = new CustomEvent( 'getrecorddata',{detail:this.recordData} );
        this.dispatchEvent( rcdData );
    }
    handleCancel( event ){
        this.notUpload = true;
        this.showImportCard = false;
        this.filename = '';
        this.iconName = '';
    }

   
}