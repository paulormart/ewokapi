from django.conf.urls import patterns, include, url

from rest_framework import routers

from django.contrib import admin

from ewok.views import UserViewSet, GroupViewSet
from .views import LandingPageView

admin.autodiscover()

#router = routers.DefaultRouter()
#router.register(r'users', UserViewSet)
#router.register(r'groups', GroupViewSet)

urlpatterns = patterns('',
    # Examples:
    # url(r'^$', 'ewokapi.views.home', name='home'),
    # url(r'^blog/', include('blog.urls')),

    # Ex.1
    # http://www.django-rest-framework.org/#example
    #url(r'^', include(router.urls)),

    # App
    url(r'^$', LandingPageView.as_view(), name='landing_page'),

    # API
    url(r'^api/', include('snippets.urls')),
    # include login authentication
    url(r'^api-auth/', include('rest_framework.urls', namespace='rest_framework')),

    # Django Admin
    url(r'^admin/', include(admin.site.urls)),


)
