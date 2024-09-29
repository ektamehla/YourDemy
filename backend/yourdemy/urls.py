from django.urls import path
from .views import UserView,CourseView, LoginView, FeedbackView

urlpatterns = [
    path('signup/', UserView.as_view()),
    path('courses/',CourseView.as_view()),
    path('courses/<int:id>/', CourseView.as_view(), name='course-detail'),
    path('login/', LoginView.as_view()),
    path('feedback/', FeedbackView.as_view()),
    path('user/<int:id>/', UserView.as_view(),),
    path('save/<int:id>/', UserView.as_view()),
]