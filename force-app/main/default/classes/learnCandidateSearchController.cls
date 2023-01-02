/**
 * @description       :
 * @author            : Anton Budkevich
 * @group             :
 * @last modified on  : 12-23-2022
 * @last modified by  : Anton Budkevich
**/
public with sharing class learnCandidateSearchController {
    @AuraEnabled(cacheable=true)
    public static List<Course__c> getCourses(String searchkey, List<String> filters) {
        try {
            if(!String.isBlank(searchkey) && filters.isEmpty()){
                searchkey = '%'+ searchkey +'%';
                return [SELECT Id, ImagePath__c, Price__c, 	Points__c, Image_Name__c, Name, UniqueImage__c, Description__c, Type__c, LiveSessionDate__c, Duration__c FROM Course__c WHERE Name Like :searchkey];
            } else {
                if(!String.isBlank(searchkey) && !filters.isEmpty()){
                    searchkey = '%'+ searchkey +'%';
                    return [SELECT Id, ImagePath__c, Price__c, 	Points__c, Image_Name__c, Name, UniqueImage__c, Description__c, Type__c, LiveSessionDate__c, Duration__c FROM Course__c WHERE Name Like :searchkey AND Type__c IN :filters];
                } else {
                    if(String.isBlank(searchkey) && !filters.isEmpty()){
                        return [SELECT Id, ImagePath__c, Price__c, 	Points__c, Image_Name__c, Name, UniqueImage__c, Description__c, Type__c, LiveSessionDate__c, Duration__c FROM Course__c WHERE Type__c IN :filters];
                        } else {
                            // if(String.isBlank(searchkey) && filters.isEmpty()){
                                return [SELECT Id, ImagePath__c, Price__c, 	Points__c, Image_Name__c, Name, UniqueImage__c, Description__c, Type__c, LiveSessionDate__c, Duration__c FROM Course__c];
                                // }
                        }
                }
            }
            }
        catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
    @AuraEnabled(cacheable=true)
    public static List<Tag__c> getTabs(String recordId) {
        try {
            List<TagPosting__c> crossed = new List<TagPosting__c>();
            crossed = [SELECT Tag__c FROM TagPosting__c WHERE Course__c =: recordId];
            Set <String> tagsIds = new Set <String>();
            List<Tag__c> answer = new List<Tag__c>();
            for (TagPosting__c tP:crossed){
                tagsIds.add(tP.Tag__c);
            }
            if (!tagsIds.isEmpty()){
                return [SELECT Name FROM Tag__c WHERE Id IN :tagsIds];
            } else {
                return answer;
            }
        }
        catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
}