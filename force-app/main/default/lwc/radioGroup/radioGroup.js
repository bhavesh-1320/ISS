import { LightningElement, api, track } from 'lwc';

export default class RadioGroup extends LightningElement {

  @api label = '';
  @api value = '';
  @api name = 'CustomRadioGroup';
  @api options = [];
  @api orientation = 'vertical';
  @api index;
  @track options_ = [];
  @track value_ = '';
  liters=['A','B','C','D','E','F','G','H'];

  @api setError(){
    console.log('we here11');

    let spanEls = this.template.querySelectorAll('.selectedBackgr');
    spanEls.forEach(inp=>{
      inp.classList.remove('selectedBackgr');
      inp.classList.add('errorBorder');
    });

    let labelEls = this.template.querySelectorAll('.selectedLabel');
    labelEls.forEach(inp=>{
      inp.classList.remove('selectedLabel');
      inp.classList.add('errorLabel');
    });

    let borderEls = this.template.querySelectorAll('.selectedBorder');
    borderEls.forEach(inp=>{
      inp.classList.remove('selectedBorder');
      inp.classList.add('errorBorder');
    });
  }

  connectedCallback(){
    this.value_ = this.value;
    this.options.forEach( (option,index) => {
      let option_ = JSON.parse(JSON.stringify(option));
      if (this.value == option_.value ) {
        option_.checked = true;
      }
      option_.key = index;
      option_.inputClass = `radio-input-${index}`;
      option_.liter=this.liters[index];
      this.options_.push (option_);
    });
  }

  handleClick(event) {
    let key = event.currentTarget.dataset.key;
    if ( key == undefined || key == null){
      return;
    }
    let input = this.template.querySelector(`.radio-input-${key}`);
    if (input == undefined){
      return;
    }
    console.log(`key ${key} value ${input.value} `);
    //make the input checked
    input.checked = true;
    this.value_ = input.value;

    let selectedInputs = this.template.querySelectorAll('.selectedBackgr, .errorBorder, .selectedLabel, .errorLabel, .selectedBorder');
    selectedInputs.forEach(inp=>{
        inp.classList.remove('selectedBackgr');
        inp.classList.remove('errorBorder');
        inp.classList.remove('selectedLabel');
        inp.classList.remove('errorLabel');
        inp.classList.remove('selectedBorder');
    });
    
    let spanEls=this.template.querySelectorAll(`[data-key="${key}"]`);
    spanEls.forEach(inp=>{
      inp.classList.add('selectedBackgr');
    });

    let labelEls=this.template.querySelectorAll(`[data-key="${key}"] .slds-form-element__label`);
    labelEls.forEach(inp=>{
      inp.classList.add('selectedLabel');
    });

    let borderEls=this.template.querySelectorAll(`[data-key="${key}"] .slds-form-element__label.liter`);
    borderEls.forEach(inp=>{
      inp.classList.add('selectedBorder');
    });
    
    this.dispatchChange(input.value);
  }

  dispatchChange(value){
    const change = new CustomEvent('change', {
      detail: { value:value,name:this.name}
    });
    this.dispatchEvent(change);
  }
}