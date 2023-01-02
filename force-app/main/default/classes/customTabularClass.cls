public with sharing class customTabularClass {
    @AuraEnabled
    public static String getColumnData (){
        //need to update the return type
        /*Column_Data__c columndatas= [select name, Column_Data__c from Column_Data__c order by LastModifiedDate limit 1];
        system.debug(columndatas);
        return columndatas;*/
        return '';
    }
    
    @AuraEnabled
    public static string updateColumnData(string updatedColumnData, string recordsIds){
        /*system.debug('upadted Record=> '+ updatedColumnData);
        system.debug('recordsIds=> '+ recordsIds);
        Column_Data__c columndatas= [select name, Column_Data__c from Column_Data__c where id= :recordsIds limit 1];
        columndatas.Column_Data__c= updatedColumnData;
        update columndatas;
        system.debug('upadted dataaaa=> '+ columndatas);
        return columndatas;*/
        return '';
    }
}