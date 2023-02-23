from django.conf import settings
from django.contrib import admin
from django.contrib import auth
from django.contrib.auth.models import User
from django.http.response import JsonResponse,HttpResponse,HttpResponseNotAllowed, HttpResponseBadRequest
from django.urls import path, include, re_path
from django.views.generic.base import RedirectView
from django.views.static import serve
from rest_framework import status
from rest_framework.authtoken.models import Token
from rest_framework.routers import DefaultRouter
import logging
import json

from django.shortcuts import render, redirect
from django.views import View
from django.http import JsonResponse
import requests


from samsam.apps.posts.views import PostViewset

router = DefaultRouter()
router.register(r'posts', PostViewset)

logger = logging.getLogger(__name__)

def __validate_user_info(request):
    if request.method != 'POST':
        return JsonResponse({'message':'Not Allowed'},status=status.HTTP_405_METHOD_NOT_ALLOWED), None, None

    request_data = ((request.body).decode('utf-8'))
    data = json.loads(request_data)

    logger.info(data)

    id = data.get('id')
    password = data.get('password')
    if not id:
        return JsonResponse({'message':'ID is required.'},status=status.HTTP_400_BAD_REQUEST), None, None
    return (
        (None, id, password)
        if password
        else (
            JsonResponse(
                {'message': 'Password is required.'},
                status=status.HTTP_400_BAD_REQUEST,
            ),
            None,
            None,
        )
    )


def login(request):
    response, id, password = __validate_user_info(request)
    if response:
        return response

    user = auth.authenticate(request, username=id, password=password)
    if not user:
        return JsonResponse({'message':'Login Failed.'},status=status.HTTP_400_BAD_REQUEST)

    token, _ = Token.objects.get_or_create(user=user)
    auth.login(request, user)

    response_body = {'message': 'Successfully Signed in', 'token': token.key}
    return JsonResponse(response_body, status=status.HTTP_200_OK)


def signup(request):
    response, id, password = __validate_user_info(request)
    if response:
        return response

    if User.objects.filter(username=id).exists():
        return JsonResponse({'message':'Already exists.'},status=status.HTTP_400_BAD_REQUEST)

    user = User.objects.create_user(
        username=id,
        password=password,
    )

    token, _ = Token.objects.get_or_create(user=user)
    auth.login(request, user)

    response_body = {'message': 'You successfully signed up.', 'token': token.key}
    return JsonResponse(response_body, status=status.HTTP_200_OK)


# access_token: React Native 애플리케이션에서 Kakao 로그인 시 발급받은 access token
def get_kakao_user_info(request):
    request_data = ((request.body).decode('utf-8'))
    data = json.loads(request_data)
    access_token = data.get('code')
    headers = {'Authorization': f'Bearer {access_token}'}
    response = requests.get('https://kapi.kakao.com/v2/user/me', headers=headers)

    if response.status_code != 200:
        return JsonResponse({'message': 'kakao login failed.'}, status=status.HTTP_400_BAD_REQUEST)
    user_info = response.json()
    return JsonResponse(user_info, status=status.HTTP_200_OK)
        # API 호출 실패 시, 적절한 예외 처리 수행


urlpatterns = [
    path('admin/', admin.site.urls),
    re_path(r'^favicon\.ico$', RedirectView.as_view(url='/static/favicon.ico', permanent=True)),
    re_path('^media/(?P<path>.*)$', serve, {'document_root': settings.MEDIA_ROOT}),
    re_path('^static/(?P<path>.*)$', serve, {'document_root': settings.STATIC_ROOT}),
    path('api/', include(router.urls)),
    path('login/', login),
    path('signup/', signup),
    path('kakaologin/', get_kakao_user_info),
];
