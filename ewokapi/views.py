
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import requires_csrf_token
from django.views.generic import TemplateView

class LandingPageView(TemplateView):
    template_name = 'landing_page.html'

    @method_decorator(requires_csrf_token)
    def dispatch(self, *args, **kwargs):
        return super(LandingPageView, self).dispatch(*args, **kwargs)
