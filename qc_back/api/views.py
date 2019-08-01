from rest_framework import viewsets, permissions
from rest_framework.permissions import AllowAny, IsAuthenticatedOrReadOnly
from rest_framework.views import APIView
from rest_framework.decorators import api_view

from api.models import User, Post, News
from api.serializers import UserSerializer, PostSerializer, NewsSerializer
# Also add these imports
from api.permissions import IsLoggedInUserOrAdmin, IsAdminUser, ReadOnly
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    # Add this code block
    def get_permissions(self):
        permission_classes = []
        if self.action == 'create':
            permission_classes = [AllowAny]
        elif self.action == 'retrieve' or self.action == 'update' or self.action == 'partial_update':
            permission_classes = [IsLoggedInUserOrAdmin]
        elif self.action == 'list' or self.action == 'destroy':
            permission_classes = [IsAdminUser]
        return [permission() for permission in permission_classes]

    # def get_object(self):
    #     pk = self.kwargs.get('pk')
    #
    #     if pk == "current":
    #         return self.request.user
    #
    #     return super(UserViewSet, self).get_object()


class CurrentUserViewSet(viewsets.ModelViewSet):
    """
    Lists information related to the current user.
    """
    serializer_class = UserSerializer
    permission_classes = (IsAuthenticated,)

    def list(self, request, *args, **kwargs):
        instance = request.user
        serializer = self.get_serializer(instance)
        return Response(serializer.data)


# @api_view(['GET'])
# def getprofile(request):
#     serializer = UserSerializer(request.user)
#     return Response({
#         'profile': user.profile,
#     })

class PostViewSet(viewsets.ModelViewSet):
    """
    Provides basic CRUD functions for the Blog Post model
    """
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class NewsViewSet(viewsets.ModelViewSet):
    queryset = News.objects.all()
    serializer_class = NewsSerializer
    authentication_classes = []

    def get_permissions(self):
        if self.request.method == 'GET':
            return (permissions.AllowAny(), )
        if self.request.method == 'POST' or 'DELETE' or 'PUT':
            return (permissions.IsAdminUser(), )

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
