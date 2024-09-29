from rest_framework import serializers
from .models import User, Courses, VideoLecture, Section, Feedback, QuizQuestions


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['user_id',
                  'name',
                  'email',
                  'interactive_mode',
                  'special_offers',
                  'duration',
                  'quiz_location',]
        # explicitly exclude the password or any other sensitive fields
        extra_kwargs = {'password': {'write_only': True}}


class QuizQuestionsSerializer(serializers.ModelSerializer):
    class Meta:
        model = QuizQuestions
        fields = '__all__'


class VideoLectureSerializer(serializers.ModelSerializer):
    quiz_questions = QuizQuestionsSerializer(many=True, read_only=True)

    class Meta:
        model = VideoLecture
        fields = '__all__'


class SectionSerializer(serializers.ModelSerializer):
    video_lectures = VideoLectureSerializer(many=True, read_only=True)

    class Meta:
        model = Section
        fields = '__all__'


class CourseSerializer(serializers.ModelSerializer):
    sections = SectionSerializer(many=True, read_only=True)

    class Meta:
        model = Courses
        fields = '__all__'


class FeedbackSerializer(serializers.ModelSerializer):
    class Meta:
        model = Feedback
        fields = '__all__'
