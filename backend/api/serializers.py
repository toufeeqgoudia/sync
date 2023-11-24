from rest_framework import serializers
from .models import Board, List, Card, Membership

class BoardSerializer(serializers.ModelSerializer):
    class Meta:
        model = Board
        fields = '__all__'


class ListSerializer(serializers.ModelSerializer):
    class Meta:
        model = List
        fields = '__all__'


class CardSerializer(serializers.ModelSerializer):
    class Meta:
        model = Card
        fields = '__all__'


class MembershipSerializer(serializers.ModelSerializer):
    class Meta:
        model = Membership
        fields = '__all__'
