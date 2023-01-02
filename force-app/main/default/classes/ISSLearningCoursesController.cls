public with sharing class ISSLearningCoursesController {
    @AuraEnabled
    public static Courses getAllCourses() {
        Courses courses = new Courses();
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
            LIMIT 10
        ];
        Date currentDate = Date.today();
        List<LiveSession__c> liveSessions = [
            SELECT Id,
                    Name,
                    ImageName__c,
                    Duration__c,
                    LiveSessionDate__c,
                    SessionPoints__c
            FROM LiveSession__c
            WHERE LiveSessionDate__c <= :currentDate
            ORDER BY LiveSessionDate__c DESC
            LIMIT 4
        ];
        List<ActiveCourse> activeCourses = new List<ActiveCourse>();
        List<UpcomingLiveSession> upcomingLiveSessions = new List<UpcomingLiveSession>();
        List<RecommendedCourses> recommendedCourses = new List<RecommendedCourses>();
        for (Learner_Active_Course__c item : learnerActiveCourses) {
            activeCourses.add(new ActiveCourse(item));
        }
        for (LiveSession__c item : liveSessions) {
            upcomingLiveSessions.add(new UpcomingLiveSession(item));
        }
        for (Course__c item : [SELECT Price__c, Points__c, Name, Duration__c, ImageName__c FROM Course__c WHERE LiveSessionDate__c = NULL AND Points__c != NULL LIMIT 4]) {
            recommendedCourses.add(new RecommendedCourses(item));
        }
        courses.activeCourses = activeCourses;
        courses.upcomingLiveSessions = upcomingLiveSessions;
        courses.recommendedCourses = recommendedCourses;
        return courses;
    }

    public class Courses {
        @AuraEnabled
        public List<ActiveCourse> activeCourses;
        @AuraEnabled
        public List<UpcomingLiveSession> upcomingLiveSessions;
        @AuraEnabled
        public List<RecommendedCourses> recommendedCourses;
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
    public class RecommendedCourses {
        @AuraEnabled
        public String courseName;
        @AuraEnabled
        public String courseImageName;
        @AuraEnabled
        public Decimal coursePoints;
        @AuraEnabled
        public Decimal courseDuration;
        @AuraEnabled
        public Decimal coursePrice;

        public RecommendedCourses(Course__c course) {
            this.courseName = course.Name;
            if (course.ImageName__c != null) {
                this.courseImageName = course.ImageName__c;
            }
            this.coursePoints = course.Points__c;
            this.courseDuration = course.Duration__c;
            this.coursePrice = course.Price__c;
            //Datetime lessonDate = course.LiveSessionDate__c;
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