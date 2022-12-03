from django.conf import settings
from django.contrib import admin
from django.contrib import auth
from django.contrib.auth.models import User
from django.http import JsonResponse
from django.http.response import HttpResponseNotAllowed, HttpResponseBadRequest
from django.urls import path, include, re_path
from django.views.generic.base import RedirectView
from django.views.static import serve
from rest_framework import status
from rest_framework.authtoken.models import Token
from rest_framework.routers import DefaultRouter

from samsam.apps.posts.views import PostViewset

router = DefaultRouter()
router.register(r'posts', PostViewset)

import logging

logger = logging.getLogger(__name__)


def __validate_user_info(request):
    if request.method != 'POST':
        return HttpResponseNotAllowed('POST'), None, None

    data = request.POST
    id = data.get('id')
    password = data.get('password')

    if not id:
        return HttpResponseBadRequest('ID is required.'), None, None
    if not password:
        return HttpResponseBadRequest('password is required.'), None, None

    return None, id, password


def login(request):
    response, id, password = __validate_user_info(request)
    if response:
        return response

    user = auth.authenticate(request, username=id, password=password)
    if not user:
        return HttpResponseBadRequest('Login Failed.')

    token, _ = Token.objects.get_or_create(user=user)
    auth.login(request, user)

    response_body = {'message': 'Successfully Signed in', 'token': token.key}
    return JsonResponse(response_body, status=status.HTTP_200_OK)


def signup(request):
    response, id, password = __validate_user_info(request)
    if response:
        return response

    if User.objects.filter(username=id).exists():
        return HttpResponseBadRequest('Already exists.')

    user = User.objects.create_user(
        username=id,
        password=password,
    )

    token, _ = Token.objects.get_or_create(user=user)
    auth.login(request, user)

    response_body = {'message': 'You successfully signed up.', 'token': token.key}
    return JsonResponse(response_body, status=status.HTTP_200_OK)


urlpatterns = [
    path('admin/', admin.site.urls),
    re_path(r'^favicon\.ico$', RedirectView.as_view(url='/static/favicon.ico', permanent=True)),
    re_path('^media/(?P<path>.*)$', serve, {'document_root': settings.MEDIA_ROOT}),
    re_path('^static/(?P<path>.*)$', serve, {'document_root': settings.STATIC_ROOT}),
    path('api/', include(router.urls)),
    path('login/', login),
    path('signup/', signup),
]
