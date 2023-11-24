from rest_framework import generics
from .models import Board, List, Card, Membership
from .serializers import BoardSerializer, ListSerializer, CardSerializer, MembershipSerializer


class BoardListCreateView(generics.ListCreateAPIView):
    queryset = Board.objects.all()
    serializer_class = BoardSerializer


class BoardDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Board.objects.all()
    serializer_class = BoardSerializer


class ListListCreateView(generics.ListCreateAPIView):
    queryset = List.objects.all()
    serializer_class = ListSerializer


class ListDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = List.objects.all()
    serializer_class = ListSerializer


class CardListCreateView(generics.ListCreateAPIView):
    queryset = Card.objects.all()
    serializer_class = CardSerializer


class CardDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Card.objects.all()
    serializer_class = CardSerializer


class MembershipListCreateView(generics.ListCreateAPIView):
    queryset = Membership.objects.all()
    serializer_class = MembershipSerializer


class MembershipDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Membership.objects.all()
    serializer_class = MembershipSerializer
