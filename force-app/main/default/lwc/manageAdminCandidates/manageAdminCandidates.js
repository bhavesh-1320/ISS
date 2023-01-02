import { LightningElement } from 'lwc';
import star from '@salesforce/resourceUrl/Star';
import basicInfo from '@salesforce/resourceUrl/BasicInformationIcon';
export default class ManageAdminCandidates extends LightningElement {
    star  = star;
    InviteButtonIcon = basicInfo + '/ISSv2/Group1.png';
    userIcon = basicInfo + '/ISSv2/Group2.png';
    messageIcon = basicInfo + '/ISSv2/Group3.png';
    barIcon = basicInfo + '/ISSv2/Group4.png';
    multipleIcon = basicInfo + '/ISSv2/Group5.png';
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
        {'DepartMent':'Social Studies  ' , 'Subject' :'Assistent / Assistent Principal' , 'Education' :'Elementry' , 'Curriclum':'NA'},
        {'DepartMent':'Social Studies  ' , 'Subject' :'Assistent / Assistent Principal' , 'Education' :'Elementry' , 'Curriclum':'NA'},
        {'DepartMent':'Social Studies  ' , 'Subject' :'Assistent / Assistent Principal' , 'Education' :'Elementry' , 'Curriclum':'NA'}
    ];
    tabsValue =  [{'Name' :'School Information' , 'Id':'0001'} , {'Name':'MemberShip Information' , 'Id':'0002'} ,{'Name' :'iFair Information' , 'Id':'0003'} ,{'Name':'Notes' , 'Id':'0004'},{'Name':'View Message', 'Id':'0005'}];
    
    renderedCallback(){
        this.template.querySelector('.allList').style.background = 'white';
    }     
    handleGetId(event){
        this.template.querySelectorAll('.allList').forEach(element=>{
            if (element.id == event.currentTarget.id ) {
                element.style.background = 'white';
            }
            else{
                element.style.background = 'transparent';
            }
            
        })
        console.log('fucntion click ' ,event.currentTarget.id);
    }
}