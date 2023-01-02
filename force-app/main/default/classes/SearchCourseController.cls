public with sharing class SearchCourseController {
    @AuraEnabled(cacheable=true)
    public static List<SObject> getRecords(String searchkey, List<String> filters) {
        try {
            if (!String.isBlank(searchkey) && filters.isEmpty()) {
                searchkey = '%'+ searchkey +'%';
                return [SELECT Id, ImagePath__c, Price__c, 	Points__c, Image_Name__c, Name, UniqueImage__c, Description__c, Type__c, LiveSessionDate__c, Duration__c FROM Course__c WHERE Name Like :searchkey];
            } else {
                if (!String.isBlank(searchkey) && filters.contains('Course')) {
                    searchkey = '%'+ searchkey +'%';
                    return [SELECT Id, ImagePath__c, Price__c, 	Points__c, Image_Name__c, Name, UniqueImage__c, Description__c, Type__c, LiveSessionDate__c, Duration__c FROM Course__c WHERE Name Like :searchkey];
                } else {
                    if (String.isBlank(searchkey) && filters.contains('Course')) {
                        return [SELECT Id, ImagePath__c, Price__c, 	Points__c, Image_Name__c, Name, UniqueImage__c, Description__c, Type__c, LiveSessionDate__c, Duration__c FROM Course__c];
                    } else {
                        if (String.isBlank(searchkey) && filters.contains('Series')) {
                            return [SELECT Id, Name FROM Series__c];
                        } else {
                            if (!String.isBlank(searchkey) && filters.contains('Series')) {
                                searchkey = '%'+ searchkey +'%';
                                return [SELECT Id, Name FROM Series__c WHERE Name Like :searchkey];
                            } else {
                                return [SELECT Id, ImagePath__c, Price__c, 	Points__c, Image_Name__c, Name, UniqueImage__c, Description__c, Type__c, LiveSessionDate__c, Duration__c FROM Course__c];
                            }
                        }
                    }
                }
            }
        }
        catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }

    @AuraEnabled(cacheable=true)
    public static Series__c getSeries(String recordId) {
        try {
            return [SELECT Id, Name, Description__c FROM Series__c WHERE Id =: recordId][0];
        }
        catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }

    @AuraEnabled(cacheable=true)
    public static List<Tag__c> getTags(String recordId) {
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

    @AuraEnabled(cacheable=true)
    public static Map<String, Object> getCoursesOfSeries(String recordId) {
        Map<String, Object> result = new Map<String, Object>();
        try {
            List<Series_Course__c> crossed = new List<Series_Course__c>();
            crossed = [SELECT Course__c FROM Series_Course__c WHERE Track__c =: recordId];
            Set <String> tagsIds = new Set <String>();
            // List<Course__c> answer = new List<Course__c>();
            for (Series_Course__c tP:crossed){
                tagsIds.add(tP.Course__c);
            }
            if (!tagsIds.isEmpty()){
                Decimal sumPrice = 0;
                Decimal sumDuration = 0;
                Decimal sumPoints = 0;
                Decimal sumProgress = 0;
                List<Course__c> allCourses = [SELECT Id, Progress__c, ImagePath__c, Price__c, Points__c, Image_Name__c, Name, UniqueImage__c, Description__c, Type__c, LiveSessionDate__c, Duration__c FROM Course__c WHERE Id IN :tagsIds];
                for (Course__c course : allCourses) {
                    sumPrice += (Decimal)course.Price__c;
                    sumDuration += (Decimal)course.Duration__c;
                    sumPoints += (Decimal)course.Points__c;
                    sumProgress += (Decimal)course.Progress__c;
                }
                sumProgress = sumProgress / allCourses.size();
                result.put('information', allCourses);
                result.put('totalPrice' , sumPrice);
                result.put('totalDuration', sumDuration);
                result.put('totalPoints', sumPoints);
                result.put('totalProgress', sumProgress);
                return result;
            } else {
                return result;
            }
        }
        catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }

    @AuraEnabled(cacheable=true)
    public static List<Contact> getInstructors() {
        try {
            List<Contact> result = [SELECT Id, Name FROM Contact WHERE Name =: 'Test Nik Iva'];
            if (!result.isEmpty()){
                return result;
            } else {
                return new List<Contact>();
            }
        }
        catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }

    @AuraEnabled(cacheable=true)
    public static Map<String, Object> getCourseDetail(String recordId) {
        Map<String, Object> result = new Map<String, Object>();
        try {
            Course__c course = [SELECT Id, Progress__c, ImagePath__c, Price__c, Points__c, Image_Name__c, Name, UniqueImage__c, Description__c, Type__c, LiveSessionDate__c, Duration__c FROM Course__c WHERE Id =:recordId LIMIT 1];

            List<Module__c> allModules = [SELECT Id, Name, Course__c, Module_Description__c, Video_URL__c FROM Module__c WHERE Course__c =:recordId];

            List<Tag__c> allTags = getTags(recordId);
            result.put('detailsCourse', course);
            result.put('modules', allModules);
            result.put('tags', allTags);
            return result;
        }
        catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
}