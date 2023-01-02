import { LightningElement } from 'lwc';
import icons from '@salesforce/resourceUrl/exclaimationMark';
import typeing from '@salesforce/resourceUrl/globalLan';
import teacherIcon from '@salesforce/resourceUrl/aboutTeacher';
import courseIconsData from '@salesforce/resourceUrl/courseIcon';
import searchHeading from '@salesforce/resourceUrl/candidateSearchIcon';
import worldwide from '@salesforce/resourceUrl/type';
import courseDetailIcon from '@salesforce/resourceUrl/courseDetailIcon';
import studentReview from '@salesforce/resourceUrl/studentReview';
export default class CoursePage extends LightningElement {
    icon = icons;
    types = typeing;
    worldwide = worldwide;

    playbutton =  courseIconsData + '/courseIcon/Group808.png';
    thumbnailPic = courseIconsData + '/courseIcon/thumbnail.png';
    teacherIcons  = teacherIcon; 
    rectangleImage = searchHeading + '/ISSV2/Rectangle.png';
    playbutton1 = courseDetailIcon + '/courseDetailIcon/playbutton1.png';
    openbook = courseDetailIcon + '/courseDetailIcon/openbook.png';
    certificate = courseDetailIcon + '/courseDetailIcon/certificate.png';
    flag = false;
    sections =[{'id':1,'text':'testing purpose'} ,{'id':2,'text':'testing purpose'},{'id':3,'text':'testing purpose'},{'id':4,'text':'testing purpose'} ];
    listOfCourse = [{'Name':'Service Cloud' }, {'Name':'Data Security' },{'Name':'Cloud Computing' },{'Name':'Salesforce Admin' },{'Name':'UI Development' },{'Name':'Service Cloud' }, {'Name':'Data Security' },{'Name':'Cloud Computing' },{'Name':'Salesforce Admin' },{'Name':'UI Development' }];

    escalips = studentReview + '/studentReview/Group8512.png';
    star  = studentReview + '/studentReview/Group.png';
    dots  = studentReview + '/studentReview/Group851.png';
    whiteStar = studentReview + '/studentReview/Vector.png';
    ratinginit =  ['one','two'];
    rating = [];
    
    
    showReview = false;


connectedCallback() {
    var showReview =  this.template.querySelector(".ShowReview");
    let length = this.ratinginit.length;
     if(length > 3){
         this.rating =  [...this.ratinginit].splice(0,3);
     }
     else{
        this.rating = this.ratinginit;
     }
}

renderedCallback(){
    var showReview =  this.template.querySelector(".ShowReview");
    if(this.ratinginit.length <= 3){
        showReview.style.display = 'none';
    }
}

showMoreReview(){
    var studentreviewsection =  this.template.querySelector(".student-review");
    var showReview =  this.template.querySelector(".ShowReview");
     this.rating =  [...this.ratinginit];

     if(showReview.innerText =='Show More'){ 
         studentreviewsection.style.overflow = 'scroll';
            studentreviewsection.style.height = '56rem';
            showReview.innerText = 'Show Less';

     }
     else if(showReview.innerText == 'Show Less'){
         this.rating =  [...this.ratinginit].splice(0,3);
         this.template.querySelector(".student-review").scrollTop=0;
          studentreviewsection.style.overflow = 'hidden';
            studentreviewsection.style.height = '56rem';
            showReview.innerText = 'Show More';
     }
           
        
}
   
    showMore(event) {
        
        var dots = this.template.querySelector('.dots');
        var moreText =  this.template.querySelector(".more");
        var btnText =  this.template.querySelector(".ShowMoreBtn");
        var spanshadow =  this.template.querySelector(".shadow");
      
        if (moreText.style.display == "none" ) {
            dots.style.display = 'none';

            spanshadow.style.background = 'none';
            moreText.style.display = 'block';
            btnText.innerText = 'Show Less';
            
        } else {
            btnText.innerText = 'Show More';
            dots.style.display = 'block';
            moreText.style.display = 'none';
            spanshadow.style.background = 'linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, #fff 100%)';
        }
      }
      
      expandSection(event){
          console.log('id' ,event.target.dataset.id );
        this.sections.forEach(element => {
            console.log('in loop');
            console.log('name' ,event.target.name);
            if (element.id == event.target.dataset.id) {
                   
                if ( event.target.name == 'showright') {
                    this.template.querySelector('.showdown').style.display = 'block';
                    this.template.querySelector('.showright').style.display = 'none';
                    this.template.querySelector('.showcontent').style.display = 'block';    
                }
                else  if ( event.target.name == 'showdown') {

                    this.template.querySelector('.showdown').style.display = 'none';
                    this.template.querySelector('.showright').style.display = 'block';
                    this.template.querySelector('.showcontent').style.display = 'none';
                }
                
            }      
        });
        
      }
      showMoreAbout(event) {
        
        var dots = this.template.querySelector('.dot');
        var moreText =  this.template.querySelector(".moreContent");
        var btnText =  this.template.querySelector(".ShowBtn");
       var spanshadow =  this.template.querySelector(".shadowpara");
      
        if (moreText.style.display == "none") {
            dots.style.display = 'none';
            spanshadow.style.background = 'none';
            moreText.style.display = 'block';
            btnText.innerText = 'Show Less';
            
        } else {
            btnText.innerText = 'Show More';
            dots.style.display = 'block';
            moreText.style.display = 'none';
            spanshadow.style.background = 'linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, #fff 100%)';
        }
      }



}