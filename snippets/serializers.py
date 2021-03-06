from django.forms import widgets
from django.contrib.auth.models import User

from rest_framework import serializers

from snippets.models import Snippet, LANGUAGE_CHOICES, STYLE_CHOICES

# ex.3 Using hyperlinks between Entities
# http://www.django-rest-framework.org/tutorial/5-relationships-and-hyperlinked-apis

class SnippetSerializer(serializers.HyperlinkedModelSerializer):
    owner = serializers.Field(source='owner.username')
    highlight = serializers.HyperlinkedIdentityField(view_name='snippet-highlight', format='html')

    class Meta:
        model = Snippet
        fields = ('id', 'url', 'highlight', 'owner',
                  'title', 'code', 'linenos', 'language', 'style')


class UserSerializer(serializers.HyperlinkedModelSerializer):
    snippets = serializers.HyperlinkedRelatedField(many=True, view_name='snippet-detail')

    class Meta:
        model = User
        fields = ('url', 'username', 'snippets')


# ex.2 Using primary keys between Entities

class SnippetSerializer_2(serializers.ModelSerializer):
    """
    SnippetSerializer
    using ModelSerializer like ModelForm
    """
    owner = serializers.Field(source='owner.username')

    class Meta:
        model = Snippet
        fields = ('id', 'title', 'code', 'linenos', 'language', 'style', 'owner')


class UserSerializer_2(serializers.ModelSerializer):

    snippets = serializers.PrimaryKeyRelatedField(many=True)

    class Meta:
        model = User
        fields = ('id', 'username', 'snippets')
        # note:
        # Because 'snippets' is a reverse relationship on the User model,
        # it will not be included by default when using the ModelSerializer class,
        # so we needed to add an explicit field for it.


# ex1. Simple Serializer

class SnippetSerializer_1(serializers.Serializer):
    """
    SnippetSerializer_refactored
    was the first aproach at http://www.django-rest-framework.org/tutorial/1-serialization
    its much faster to use ModelSerializer, all the fields are already defined at Model level
    """

    pk = serializers.Field()  # Note: `Field` is an untyped read-only field.
    title = serializers.CharField(required=False,
                                  max_length=100)
    code = serializers.CharField(widget=widgets.Textarea,
                                 max_length=100000)
    linenos = serializers.BooleanField(required=False)
    language = serializers.ChoiceField(choices=LANGUAGE_CHOICES,
                                       default='python')
    style = serializers.ChoiceField(choices=STYLE_CHOICES,
                                    default='friendly')

    def restore_object(self, attrs, instance=None):
        """
        Create or update a new snippet instance, given a dictionary
        of deserialized field values.

        Note that if we don't define this method, then deserializing
        data will simply return a dictionary of items.
        """
        if instance:
            # Update existing instance
            instance.title = attrs.get('title', instance.title)
            instance.code = attrs.get('code', instance.code)
            instance.linenos = attrs.get('linenos', instance.linenos)
            instance.language = attrs.get('language', instance.language)
            instance.style = attrs.get('style', instance.style)
            return instance

        # Create new instance
        return Snippet(**attrs)