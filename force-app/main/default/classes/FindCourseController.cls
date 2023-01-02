public with sharing class FindCourseController {
    @AuraEnabled
    public static List<Course__c> findCoursesByName(String searchName) {
        searchName = '%' + searchName + '%';
        System.debug('searchName === ' + searchName);
        return [
                SELECT Id,
                        Name,
                        ImageName__c,
                        Duration__c,
                        LiveSessionDate__c,
                        Points__c,
                        Price__c
                FROM Course__c
                WHERE Name LIKE :searchName
        ];
    }

}