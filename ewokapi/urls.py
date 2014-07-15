from django.conf.urls import patterns, include, url

from rest_framework import routers

from django.contrib import admin
from ewok import views
admin.autodiscover()

router = routers.DefaultRouter()
router.register(r'users', views.UserViewSet)
router.register(r'groups', views.GroupViewSet)

urlpatterns = patterns('',
    # Examples:
    # url(r'^$', 'ewokapi.views.home', name='home'),
    # url(r'^blog/', include('blog.urls')),

    # Ex.1
    # http://www.django-rest-framework.org/#example
    #url(r'^', include(router.urls)),

    url(r'^', include('snippets.urls')),

    # include login authentication
    url(r'^api-auth/', include('rest_framework.urls', namespace='rest_framework')),

    url(r'^admin/', include(admin.site.urls)),


)
