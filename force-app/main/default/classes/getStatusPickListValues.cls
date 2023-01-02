public class getStatusPickListValues {
    
    @AuraEnabled
    public static Map<String, String> getPickListValuesIntoList(){
        Map<String, String> statusValues = new Map<String, String>();
		Schema.DescribeFieldResult fieldResult = Account.Active__c.getDescribe();
		List<Schema.PicklistEntry> ple = fieldResult.getPicklistValues();
		for( Schema.PicklistEntry pickListVal : ple){
            statusValues.put(pickListVal.getLabel(),pickListVal.getValue());
		}     
        
        System.debug(statusValues);
		return statusValues;
    }
    // public static allPicklist getStatusValues() {
    //     Map<String, String> objectFieldMap = new Map<String, String>{'Active__c' => 'Account'
    //         };
    //             allPicklist picklistData = new allPicklist();
    //     for(String fieldApiName : objectFieldMap.keySet()){
    //         System.debug('obejct : '+objectFieldMap.get(fieldApiName)+' field: '+fieldApiName);
    //         Map<String, String> options = new Map<String, String>();
    //         sObject obj = Schema.getGlobalDescribe().get(objectFieldMap.get(fieldApiName)).newSObject();
    //         System.debug('obj: '+obj);
    //         Schema.sObjectType objType = obj.getSObjectType();
    //         System.debug('objType: '+objType);
    //         Schema.DescribeSObjectResult objDescribe = objType.getDescribe();
    //         System.debug('objDescribe: '+objDescribe);
    //         map<String, Schema.SObjectField> fieldMap = objDescribe.fields.getMap();
    //         System.debug('fieldMap: '+fieldMap);
    //         list<Schema.PicklistEntry> values = fieldMap.get(fieldApiName).getDescribe().getPickListValues();
    //         for (Schema.PicklistEntry a : values){
    //             options.put(a.getLabel(), a.getValue());
    //         }
    //         System.debug('options found: '+options);
    //         if(fieldApiName ==  'Department__c'){
    //             picklistData.departmentOptions = options;
    //         }
    //         if(fieldApiName ==  'Type_of_request__c'){
    //             picklistData.TypeOfRequestoptions = options;
    //             System.debug(picklistData.TypeOfRequestoptions);
    //         }
    //         if(fieldApiName ==  'Language__c'){
    //             picklistData.LanguageOptions = options;
    //             System.debug(picklistData.LanguageOptions);
    //         }
    //         if(fieldApiName ==  'PETA_Issues_and_Campaigns__c'){
    //             picklistData.PETAIssueOptions = options;
    //             System.debug(picklistData.PETAIssueOptions);
    //         }
    //         if(fieldApiName ==  'Project_Intention__c'){
    //             picklistData.ProjectIntentionOptions = options;
    //             System.debug(picklistData.ProjectIntentionOptions);
    //         }
    //         if(fieldApiName ==  'Media_Type__c'){
    //             picklistData.MediaTypeOptions = options;
    //             System.debug(picklistData.MediaTypeOptions);
    //         }
    //         if(fieldApiName ==  'Location__StateCode__s'){
    //             picklistData.StateOptions = options;
    //             System.debug(picklistData.StateOptions);
    //         }
    //         if(fieldApiName ==  'Location__CountryCode__s'){
    //             picklistData.CountryOptions = options;
    //             System.debug(picklistData.CountryOptions);
    //         }
    //     }
    //     System.debug('picklistData: '+picklistData);
    //     return picklistData;
    // }
    // public class allPicklist{
    //     @AuraEnabled public Map<String, String> departmentOptions;
    //     @AuraEnabled public Map<String, String> TypeOfRequestoptions;
    //     @AuraEnabled public Map<String, String> LanguageOptions;
    //     @AuraEnabled public Map<String, String> PETAIssueOptions;
    //     @AuraEnabled public Map<String, String> MediaTypeOptions;
    //     @AuraEnabled public Map<String, String> ProjectIntentionOptions;
    //     @AuraEnabled public Map<String, String> StateOptions;
    //     @AuraEnabled public Map<String, String> CountryOptions;
    // }

}