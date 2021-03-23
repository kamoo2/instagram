import re
from rest_framework import serializers
from django.contrib.auth import get_user_model

User = get_user_model()


class SignUpSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    def create(self, validated_data):
        password = validated_data.get("password")
        user = super().create(validated_data)
        user.set_password(password)
        user.save()
        return user

    class Meta:
        model = User
        fields = ("pk", "username", "password")
        read_only_fields = ("pk",)


class SuggestionUserSerializer(serializers.ModelSerializer):
    avatar_url = serializers.SerializerMethodField("avatar_url_field")

    def avatar_url_field(self, user):
        if re.match(r"https?://", user.avatar_url):
            return user.avatar_url
        if "request" in self.context:
            scheme = self.context.get("request").scheme  # "http" or "https"
            host = self.context.get(
                "request"
            ).get_host()  # "http" or "https" 를 제외한 것 ex) localhost:8000
            return scheme + "://" + host + user.avatar_url

    class Meta:
        model = User
        fields = ("username", "name", "avatar_url")

