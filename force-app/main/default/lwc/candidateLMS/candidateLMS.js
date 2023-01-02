import { LightningElement } from 'lwc';
import lmsImages from '@salesforce/resourceUrl/CandidateLms';
import userId from '@salesforce/user/Id';
import getCourseDetails from '@salesforce/apex/CandidateLMS.getCourseDetails';
export default class CandidateLMS extends LightningElement {
    vidImg = lmsImages+'/girl.png';
    badgeImg = lmsImages+'/badges.png';
    data = [
        {label : 'In Progress Courses', value:[{name:'Diversity Value', img:this.vidImg}, 
        {name:'Diversity Value', img:this.vidImg},{name:'Diversity Value', img:this.badgeImg}]},
        
        {label : 'Your Courses', value:[{name:'Diversity Value', img:this.vidImg}, 
        {name:'Diversity Value', img:this.vidImg},{name:'Diversity Value', img:this.vidImg}]},

        {label : 'Completed Courses', value:[{name:'Diversity Value', img:this.vidImg}, 
        {name:'Diversity Value', img:this.vidImg},{name:'Diversity Value', img:this.vidImg}]},

        {label : 'Available Courses', value:[{name:'Diversity Value', img:this.vidImg}, 
        {name:'Diversity Value', img:this.vidImg},{name:'Diversity Value', img:this.vidImg}]}
    ];
    userId = userId;
    connectedCallback() {
        console.log( this.data );
        console.log( 'userId:', this.userId );
        if( this.userId != undefined ){
            getCourseDetails({userId : this.userId}).then( res=>{
                if( res != undefined ){
                    var jsonRes = JSON.parse(  res );
                    console.log('OUTPUT : ',jsonRes);
                    console.log('OUTPUT : ',jsonRes['Completed Courses']);

                    var ndata = [
                        {label : 'In Progress Courses', value:jsonRes['In Progress Courses']},
                        
                        {label : 'Your Courses', value:jsonRes['Your Courses']},

                        {label : 'Completed Courses', value:jsonRes['Completed Courses']},

                        {label : 'Available Courses', value:jsonRes['Available Courses']}
                    ];
                    this.data = ndata;
                }
                console.log('res : ',res);
            } ).catch( err=>{
                console.log(err);
            } );
        }
    }
}