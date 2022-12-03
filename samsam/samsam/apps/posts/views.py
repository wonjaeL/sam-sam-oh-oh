import logging

from rest_framework import viewsets
from rest_framework.authentication import TokenAuthentication, SessionAuthentication
from rest_framework.permissions import IsAuthenticated

from .serializers import PostSerializer

logger = logging.getLogger(__name__)


class PostViewset(viewsets.ModelViewSet):
    authentication_classes = [TokenAuthentication, SessionAuthentication]
    # permission_classes = [IsAuthenticated]
    queryset = PostSerializer.Meta.model.objects.all()
    serializer_class = PostSerializer
