public class updateContactBlacklist {
	public class FlowInput{
         
                      
        
        @AuraEnabled @InvocableVariable
                        public String Id;
        @AuraEnabled @InvocableVariable
                        public String notes;
        			@AuraEnabled @InvocableVariable
                        public Boolean blacklist;
        
                     	
            @AuraEnabled @InvocableVariable
                      public List<Contact> mr = new List<Contact>(); 
                    
                     
        
    }
   @InvocableMethod(callout=false label='Blacklist Checkbox On Contact')
  public static void createWithdrawalHistory(List<FlowInput> No) {
      Id test= No[0].Id;
     boolean cValue = NO[0].blacklist;
      String notes = NO[0].notes;
     
    updateCheckboxes(test, cValue, notes);
  }
    
    @future
    public static void updateCheckboxes(Id rcdId, boolean cValue, String notes){
        Contact newCon = [Select id, blacklisted__c,Notes_for_Blacklist__c, Blacklist_Counts__c from contact where id=:rcdId];
        newCon.Blacklisted__c = cValue;
        newCon.Blacklist_Counts__c = 1;
        newCon.Notes_for_Blacklist__c = notes;
        update newCon;
    }

}