
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import requires_csrf_token
from django.contrib.auth.models import User

from rest_framework import generics
from rest_framework import permissions
from rest_framework import renderers
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.reverse import reverse

from .models import Snippet
from .serializers import SnippetSerializer, UserSerializer
from .permissions import IsOwnerOrReadOnly


@api_view(('GET',))
def api_root(request, format=None):
    return Response({
        'users': reverse('user-list', request=request, format=format),
        'snippets': reverse('snippet-list', request=request, format=format)
    })


class SnippetList(generics.ListCreateAPIView):
    queryset = Snippet.objects.all()
    serializer_class = SnippetSerializer
    permission_classes = (permissions.IsAuthenticatedOrReadOnly, IsOwnerOrReadOnly,)

    #@method_decorator(requires_csrf_token)
    #def dispatch(self, *args, **kwargs):
    #    return super(SnippetList, self).dispatch(*args, **kwargs)

    def pre_save(self, obj):
        obj.owner = self.request.user


class SnippetDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Snippet.objects.all()
    serializer_class = SnippetSerializer
    permission_classes = (permissions.IsAuthenticatedOrReadOnly, IsOwnerOrReadOnly,)


    #@method_decorator(requires_csrf_token)
    #def dispatch(self, request, *args, **kwargs):
    #    return super(SnippetDetail, self).dispatch(*args, **kwargs)

    def pre_save(self, obj):
        obj.owner = self.request.user


class SnippetHighlight(generics.GenericAPIView):
    queryset = Snippet.objects.all()
    renderer_classes = (renderers.StaticHTMLRenderer,)
    permission_classes = (permissions.IsAuthenticatedOrReadOnly, IsOwnerOrReadOnly,)

    def get(self, request, *args, **kwargs):
        snippet = self.get_object()
        return Response(snippet.highlighted)


# ReadOnly views
# We'd like to just use read-only views for the user representations,
# so we'll use the ListAPIView and RetrieveAPIView generic class based views.

class UserList(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    # note permissions are not defined for this view, it will get the DEFAULT_PERMISSION_CLASSES defined in settings


class UserDetail(generics.RetrieveAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer