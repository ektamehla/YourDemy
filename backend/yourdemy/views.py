from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from django.http.response import JsonResponse
from .models import User, Courses, Feedback
from .serializers import UserSerializer, CourseSerializer, FeedbackSerializer
from rest_framework import status
from django.contrib.auth import authenticate, login



class UserView(APIView):

    def post(self, request):
        data = request.data
        serializer = UserSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response({'error': 'User already exists'}, status=status.HTTP_404_NOT_FOUND)

    def get(self, request,id=None):
        if(id==None):
            data = User.objects.all()
            serialaizer = UserSerializer(data, many=True)

            return Response(serialaizer.data)
        else:
            # Fetch a single user by ID
            try:
                user = User.objects.get(pk=id)
                serializer = UserSerializer(user)
                return Response(serializer.data)
            except User.DoesNotExist:
                # Return an error response if no user is found
                return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)
    def put(self, request, id=None):
        if id is not None:
            try:
                user = User.objects.get(pk=id)
                serializer = UserSerializer(user, data=request.data)
                if serializer.is_valid():
                    serializer.save()
                    return Response(serializer.data)
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            except User.DoesNotExist:
                return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)
        return Response({'error': 'Invalid Request: No ID provided'}, status=status.HTTP_400_BAD_REQUEST)
    
class LoginView(APIView):
    def post(self, request):
        email = request.data.get("email")
        password = request.data.get("password")

        print("Email ",email)
        try:
            user = User.objects.get(email=email)
            print("User",user)
            if user is not None and user.password == password:
                print("Successful Login!")
                serializer = UserSerializer(user)
                return Response({"message": "Login successful","user":serializer.data}, status=status.HTTP_200_OK)

            elif user is not None and user.password != password:
                print("Incorrect password!")
                return Response({"error": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)

            else:
                print("Email doesn't exist, Please signup.")
                return Response({"error": "Email doesn't exist, Please signup."}, status=status.HTTP_401_UNAUTHORIZED)
        except User.DoesNotExist:
            return Response({'error': 'Incorrect Email or Password'}, status=status.HTTP_404_NOT_FOUND)
                
        # user = authenticate(request.data, email=email, password=password)
        # if user is not None:
        #     # login(request, user)
        #     print('login ho gya')
        #     # Redirect to a success page.
        # else:
        #     # Return an 'invalid login' error message.
        #     print('login nahi hua')

        # user = authenticate(email=email, password=password)

        # print(user)

        # if not user:
        #     return Response({'error': 'Invalid Credentials'},
        #                     status=status.HTTP_404_NOT_FOUND)

        # login(request, user)
        # return Response(UserSerializer(user).data)

class CourseView(APIView):
    def get(self, request,id=None):
        if id==None:
            data = Courses.objects.all()
            print(data)
            serialaizer = CourseSerializer(data, many=True)
            return Response(serialaizer.data)
        else:
            try:
                course = Courses.objects.prefetch_related('sections__video_lectures__quiz_questions').get(course_id=id)
                serializer = CourseSerializer(course)
                print(serializer)
                return Response(serializer.data)
            except Courses.DoesNotExist:
                return Response({'error': 'Course not found ${id}'}, status=status.HTTP_404_NOT_FOUND)
            

class  FeedbackView(APIView):  
    def post(self, request):
        data = request.data
        serializer = FeedbackSerializer(data=data)
        print("data", data, serializer.is_valid(), serializer.errors)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse("Feedback Added Successfully", safe=False)
        return JsonResponse("Failed to Add Feedback", safe=False) 
    def get(self, request):
        data = Feedback.objects.all()
        print(data)
        serialaizer = FeedbackSerializer(data, many=True)

        return Response(serialaizer.data)
    
        


# {
# "name": "Alice",
# "email": "alice.bob@student.com",
# "password": "Data Structures",
# "interactive_mode":true
# }
