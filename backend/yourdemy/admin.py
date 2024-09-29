from django.contrib import admin

# Register your models here.

from .models import User,Courses,Section,VideoLecture, Feedback,QuizQuestions

models_list = [User,Courses,Section,VideoLecture, Feedback,QuizQuestions]
admin.site.register(models_list)
