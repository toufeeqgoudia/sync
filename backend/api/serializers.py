from rest_framework import serializers
from .models import Board, List, Card, Membership
from custom_auth.serializers import UserSerializer

class BoardSerializer(serializers.ModelSerializer):
    class Meta:
        model = Board
        fields = ['id', 'title', 'description', 'created_at', 'user']


class ListSerializer(serializers.ModelSerializer):
    board = BoardSerializer(read_only=True)

    class Meta:
        model = List
        fields = ['id', 'title', 'board']


class CardSerializer(serializers.ModelSerializer):
    list = ListSerializer(read_only=True)

    class Meta:
        model = Card
        fields = ['id', 'title', 'description', 'due_date', 'list']


class MembershipSerializer(serializers.ModelSerializer):
    class Meta:
        model = Membership
        fields = ['user', 'board']
