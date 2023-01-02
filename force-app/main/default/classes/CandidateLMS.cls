public class CandidateLMS {
    @AuraEnabled
    public static String getCourseDetails( Id userId ){
        List<user> usrs = [SELECT Id, ContactId FROM User WHERE Id = :userId AND ContactId != null];
        Set<Id> courseIds = new Set<Id>();
        System.debug('Users:'+usrs);
        Id contId = usrs[0].ContactId;
        List<Course_Enrollment__c> cEn2 = [ SELECT Course__r.Name, Course__c, Status__c
                                                        FROM Course_Enrollment__c 
                                                    ] ;
                                                    System.debug('-->'+cEn2);
        if( usrs.size() > 0 ){
            Map<String, List<String>> courseDetailMap = new Map<String, List<String>>();
            contId = usrs[0].ContactId;
            System.debug(contId);
            List<Course_Enrollment__c> cEn = [ SELECT Course__r.Name, Course__c, Status__c
                                                        FROM Course_Enrollment__c 
                                                        WHERE Contact__c = :contId
                                                    ];
            System.debug(cEn);
            System.debug(Database.query('SELECT Course__r.Name, Course__c, Status__c FROM Course_Enrollment__c  WHERE Contact__c = :contId'));
            for( Course_Enrollment__c courseEnroll : [ SELECT Course__r.Name, Course__c, Status__c
                                                        FROM Course_Enrollment__c 
                                                        WHERE Contact__c = :contId
                                                    ] ){
                System.debug('CourseEnroll:'+courseEnroll);
                if( !courseDetailMap.containsKey( 'Your Courses' ) ){
                    courseDetailMap.put( 'Your Courses', new List<String>() );
                }
                courseDetailMap.get( 'Your Courses' ).add( courseEnroll.Course__r.Name );
                if( courseEnroll.Status__c == 'In-Progress' ){
                    if( !courseDetailMap.containsKey( 'In Progress Courses' ) ){
                        courseDetailMap.put( 'In Progress Courses', new List<String>() );
                    }
                    courseDetailMap.get( 'In Progress Courses' ).add( courseEnroll.Course__r.Name );
                } else if( courseEnroll.Status__c == 'Completed' ){
                    if( !courseDetailMap.containsKey( 'Completed Courses' ) ){
                        courseDetailMap.put( 'Completed Courses', new List<String>() );
                    }
                    courseDetailMap.get( 'Completed Courses' ).add( courseEnroll.Course__r.Name );
                }
                courseIds.add( courseEnroll.Course__c );
                System.debug('Map:'+courseDetailMap);
            }
            for( Course__c course : [SELECT Id, Name FROM Course__c WHERE Id NOT IN :courseIds] ){
                if( !courseDetailMap.containsKey( 'Available Courses' ) ){
                    courseDetailMap.put( 'Available Courses', new List<String>() );
                }
                courseDetailMap.get( 'Available Courses' ).add( course.Name );
            }
            System.debug('Users:'+courseDetailMap);
            return JSON.serialize( courseDetailMap );
        }
        return null;
    }
}