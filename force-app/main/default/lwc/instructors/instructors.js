import { LightningElement, track, api } from 'lwc';
import HEADERPOPUP from '@salesforce/resourceUrl/headerPopUP';
import INSTRUCTORS from '@salesforce/resourceUrl/instructors';
import { NavigationMixin } from 'lightning/navigation';

const INSTRUCTORS_PAGE = '#INSTRUCTOR PAGE#';

export default class Instructors extends NavigationMixin(LightningElement) {
    @api instructors = []; 
    @track isModalOpen = false;
    @track selectedInstructor;
    @track displayedInstructors = [];

    async connectedCallback() {
        //this.displayedInstructors = await this.instructors;
        this.displayedInstructors = [
            {
                id: '1',
                Name: 'Ellen Mahoney',
                title: 'CEO',
                location: 'Sea Change Mentoring, California, USA',
                image: `${INSTRUCTORS}/instructors/image17.png`
            },
            {
                id: '2',
                Name: 'Hoaihuong "Orletta" Nguyen',
                title: 'Ed.D.',
                location: 'California State University, Dominguez Hills & San Diego Unified School District',
                image: `${INSTRUCTORS}/instructors/image18.png`
            }
        ];
    }

    handelSelectedInstructor(event) {
        //event.preventDefault();
        //this.navigateToCommunityPage(INSTRUCTORS_PAGE);
        const id = event.target.dataset.id;
        this.selectedInstructor = this.displayedInstructors.find(instructor => instructor.id === id);
        this.isModalOpen = true;
    }

    closeModal() {
        this.isModalOpen = false;
    }

    navigateToCommunityPage(pageName) {
        this[NavigationMixin.Navigate]({
            type: 'comm__namedPage',
            attributes: {
                name: pageName,
            }
        });
    }
}