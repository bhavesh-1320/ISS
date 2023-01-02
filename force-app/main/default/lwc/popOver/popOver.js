import { LightningElement } from 'lwc';

export default class PopOver extends LightningElement {
    showValidation;
    handleFocus() {
      this.showValidation = true;
    }
    handleBlur() {
      this.showValidation = false;
    }
    handleChange(event) {
      // Validate lowercase letters
      let passwordValue = event.target.value;
      var lowerCaseLetters = /[a-z]/g;
      if (passwordValue.match(lowerCaseLetters)) {
        this.template
          .querySelector('[data-id="letter"]')
          .classList.remove("invalid");
        this.template.querySelector('[data-id="letter"]').classList.add("valid");
      } else {
        this.template
          .querySelector('[data-id="letter"]')
          .classList.remove("valid");
        this.template
          .querySelector('[data-id="letter"]')
          .classList.add("invalid");
      }
  
      // Validate capital letters
      var upperCaseLetters = /[A-Z]/g;
      if (passwordValue.match(upperCaseLetters)) {
        this.template
          .querySelector('[data-id="capital"]')
          .classList.remove("invalid");
        this.template.querySelector('[data-id="capital"]').classList.add("valid");
      } else {
        this.template
          .querySelector('[data-id="capital"]')
          .classList.remove("valid");
        this.template
          .querySelector('[data-id="capital"]')
          .classList.add("invalid");
      }
  
      // Validate numbers
      var numbers = /[0-9]/g;
      if (passwordValue.match(numbers)) {
        this.template
          .querySelector('[data-id="number"]')
          .classList.remove("invalid");
        this.template.querySelector('[data-id="number"]').classList.add("valid");
      } else {
        this.template
          .querySelector('[data-id="number"]')
          .classList.remove("valid");
        this.template
          .querySelector('[data-id="number"]')
          .classList.add("invalid");
      }
  
  
      // Validate characters
      var specialChar = /[!@#$%^&*+`~=?\|<>/]/g;
      if (passwordValue.match(specialChar)) {
        this.template
          .querySelector('[data-id="character"]')
          .classList.remove("invalid");
        this.template
        .querySelector('[data-id="character"]')
        .classList.add("valid");
      } else {
        this.template
          .querySelector('[data-id="character"]')
          .classList.remove("valid");
        this.template
          .querySelector('[data-id="character"]')
          .classList.add("invalid");
      }
  
      // Validate length
      if (passwordValue.length >= 8) {
        this.template
          .querySelector('[data-id="length"]')
          .classList.remove("invalid");
        this.template.querySelector('[data-id="length"]').classList.add("valid");
      } else {
        this.template
          .querySelector('[data-id="length"]')
          .classList.remove("valid");
        this.template
          .querySelector('[data-id="length"]')
          .classList.add("invalid");
      }
    }
}