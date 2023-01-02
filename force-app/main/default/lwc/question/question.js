import { LightningElement,api } from 'lwc';

export default class Question extends LightningElement {
    @api labelRadioGroup;
    @api options;

    handleChange(event){
        event.preventDefault();
        console.log(JSON.stringify(event.detail.value));
        let newEvent=new CustomEvent('mychange',{detail:{labelRadioGroup:labelRadioGroup,value:event.detail.value}});
        this.dispatchEvent(newEvent);
    }
}