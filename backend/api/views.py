from rest_framework import generics
from rest_framework.decorators import permission_classes
from rest_framework.permissions import IsAuthenticated
from .models import Board, List, Card, Membership
from .serializers import BoardSerializer, ListSerializer, CardSerializer, MembershipSerializer


@permission_classes([IsAuthenticated])
class BoardListCreateView(generics.ListCreateAPIView):
    queryset = Board.objects.all()
    serializer_class = BoardSerializer


@permission_classes([IsAuthenticated])
class BoardDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Board.objects.all()
    serializer_class = BoardSerializer


@permission_classes([IsAuthenticated])
class ListListCreateView(generics.ListCreateAPIView):
    queryset = List.objects.all()
    serializer_class = ListSerializer


@permission_classes([IsAuthenticated])
class ListDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = List.objects.all()
    serializer_class = ListSerializer


@permission_classes([IsAuthenticated])
class CardListCreateView(generics.ListCreateAPIView):
    queryset = Card.objects.all()
    serializer_class = CardSerializer


@permission_classes([IsAuthenticated])
class CardDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Card.objects.all()
    serializer_class = CardSerializer


@permission_classes([IsAuthenticated])
class MembershipListCreateView(generics.ListCreateAPIView):
    queryset = Membership.objects.all()
    serializer_class = MembershipSerializer


@permission_classes([IsAuthenticated])
class MembershipDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Membership.objects.all()
    serializer_class = MembershipSerializer
