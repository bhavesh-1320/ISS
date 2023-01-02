import { LightningElement } from 'lwc';
import bgImage from '@salesforce/resourceUrl/bgImage';
import basepath from '@salesforce/community/basePath';
import loginScreenIcons2 from '@salesforce/resourceUrl/loginScreenIcons2';
export default class ObBoardingPage extends LightningElement {
    bgImage = bgImage;
    finance = loginScreenIcons2 + '/loginScreenIcons2/subnav_edulearn.png';
    learn = loginScreenIcons2 + '/loginScreenIcons2/subnav_edurecruit.png';
    marketPlace = loginScreenIcons2 + '/loginScreenIcons2/website_marketplace.png';
    messaging  = loginScreenIcons2 + '/loginScreenIcons2/ic_send.png';
    arrow  = loginScreenIcons2 + '/loginScreenIcons2/Vector190.png';
}