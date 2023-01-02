import { LightningElement, track } from 'lwc';
import searchHeading from '@salesforce/resourceUrl/candidateSearchIcon';
//import mathTeacherIcon from '@salesforce/resourceUrl/MathTeacherResultIcon';

export default class JobUI extends LightningElement {
	bestMatchJob = ['one', 'two', 'three', 'four', 'five'];
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

	country = ['rome', 'egypt', 'england', 'United State'];

	// for getting runtime screen size
	@track screenSize = 0;
	showLeftList;

	connectedCallback() {
		if(window.innerWidth < 768) {
			this.showLeftList = true;
		}
		else {
			this.showLeftList = false;
		}
		console.log('Inside connected');
		window.addEventListener('resize',this.getScreenSize);
	}

	getScreenSize = () => {
		if(window.innerWidth < 768) {
			this.showLeftList = true;
		}
		else {
			this.showLeftList = false;
		}
		// console.log('ScreenSize: ',this.screenSize);
		// console.log('Size: ',window.innerWidth);
	}

	handleClick(event) {
		console.log('click');
		// console.log('click', event.target.dataset.Id);
		console.log('After');
		this.template.querySelector('.mobile-job-dropdown2').style.display = 'none';
		this.template.querySelector('.slds-col.right').style.display = 'block';
		console.log('Before');
	}
}