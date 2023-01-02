public with sharing class LearningCoursesController {

    @AuraEnabled
    public static Courses getActiveCoursesInfo(String userId) {
        Courses courses = new Courses();

        String currentContactId = [
                SELECT Id,
                        Name,
                        ContactId
                FROM User
                WHERE Id = :userId
                LIMIT 1
        ].ContactId;

        System.debug('currentContactId == ' + currentContactId);

        List<Learner_Active_Course__c> learnerActiveCourses = [
                SELECT Name,
                        Course_Active__c,
                        Learner__c,
                        Course__c,
                        Course__r.ImageName__c,
                        Course__r.Points__c,
                        Course__r.Duration__c,
                        Course__r.Name
                FROM Learner_Active_Course__c
                WHERE Learner__c = :currentContactId
                AND Course_Status__c = 'Active'
        ];

        List<ActiveCourse> activeCourses = new List<ActiveCourse>();
        List<UpcomingLiveSession> upcomingLiveSessions = new List<UpcomingLiveSession>();

        for (Learner_Active_Course__c learnerCourse : learnerActiveCourses) {
            activeCourses.add(new ActiveCourse(learnerCourse));
        }

        for (LiveSession__c liveSession : getUpcomingLiveSessions()) {
            upcomingLiveSessions.add(new UpcomingLiveSession(liveSession));
        }
        System.debug('activeCourses == ' + activeCourses);

        courses.activeCourses = activeCourses;
        courses.upcomingLiveSessions = upcomingLiveSessions;

        return courses;
    }

    public static List<LiveSession__c> getUpcomingLiveSessions() {
        Date currentDate = Date.today();
        return [
                SELECT Id,
                        Name,
                        ImageName__c,
                        Duration__c,
                        LiveSessionDate__c,
                        SessionPoints__c
                FROM LiveSession__c
                WHERE LiveSessionDate__c > :currentDate
                ORDER BY LiveSessionDate__c DESC
                LIMIT 3
        ];
    }

    public class Courses {
        @AuraEnabled
        public List<ActiveCourse> activeCourses;
        @AuraEnabled
        public List<UpcomingLiveSession> upcomingLiveSessions;
    }

    public class ActiveCourse {
        @AuraEnabled
        public String courseName;
        @AuraEnabled
        public String courseImageName;
        @AuraEnabled
        public Decimal coursePoints;
        @AuraEnabled
        public Decimal courseDuration;
        @AuraEnabled
        public String courseId;
        @AuraEnabled
        public String learnerId;
        @AuraEnabled
        public String courseType;

        public ActiveCourse(Learner_Active_Course__c learnerActiveCourse) {
            this.courseName = learnerActiveCourse.Course__r.Name;
            this.courseImageName = learnerActiveCourse.Course__r.ImageName__c;
            this.coursePoints = learnerActiveCourse.Course__r.Points__c;
            this.courseDuration = learnerActiveCourse.Course__r.Duration__c;
            this.courseId = learnerActiveCourse.Course__c;
            this.learnerId = learnerActiveCourse.Learner__c;
            this.courseType = 'Active Course';
        }
    }

    public class UpcomingLiveSession {
        @AuraEnabled
        public String courseName;
        @AuraEnabled
        public String courseImageName;
        @AuraEnabled
        public Decimal coursePoints;
        @AuraEnabled
        public Decimal courseDuration;
        @AuraEnabled
        public String courseId;
        @AuraEnabled
        public String liveSessionDate;
        @AuraEnabled
        public String courseType;

        public UpcomingLiveSession(LiveSession__c upcomingLiveSession) {
            this.courseName = upcomingLiveSession.Name;
            this.courseImageName = upcomingLiveSession.ImageName__c;
            this.coursePoints = upcomingLiveSession.SessionPoints__c;
            this.courseDuration = upcomingLiveSession.Duration__c;
            this.courseId = upcomingLiveSession.Id;
            Datetime lessonDate = upcomingLiveSession.LiveSessionDate__c;
            this.liveSessionDate = lessonDate.format('dd.MM.yy');
            this.courseType = 'Upcoming Live Session';
        }
    }
}