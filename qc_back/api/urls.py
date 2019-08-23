from django.conf.urls import url, include
from django.urls import path
from rest_framework import routers
from api.views import UserViewSet, PostViewSet, NewsViewSet, CurrentUserViewSet

router = routers.DefaultRouter()
router.register(r'users', UserViewSet)
router.register(r'posts', PostViewSet)
router.register(r'news', NewsViewSet)
router.register(r'current', CurrentUserViewSet, base_name='current')

urlpatterns = [
    url(r'^', include(router.urls)),
    url(r'^auth/', include('rest_auth.urls')),
]
