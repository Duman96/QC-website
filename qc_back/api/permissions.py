from rest_framework import permissions

SAFE_METHODS = ('GET', 'HEAD', 'OPTIONS')


# class IsAdminOrReadOnly(BasePermission):
#     def has_permission(self, request, view):
#         if request.method in SAFE_METHODS:
#             return True
#         else:
#             return request.user.is_staff

# class IsAdminUserOrReadOnly(IsAdminUser):
#
#     def has_permission(self, request, view):
#         is_admin = super().has_permission(request, view)
#         return request.method in SAFE_METHODS or is_admin


class IsLoggedInUserOrAdmin(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        return obj == request.user or request.user.is_staff


class IsAdminUser(permissions.BasePermission):

    def has_permission(self, request, view):
        return request.user and request.user.is_staff

    def has_object_permission(self, request, view, obj):
        return request.user and request.user.is_staff


class ReadOnly(permissions.BasePermission):
    """
    The endpoint is read-only request.
    """

    def has_permission(self, request, view):
        return (
            request.method in SAFE_METHODS
        )

