from django.urls import path
from .views import (
    BoardListCreateView, BoardDetailView,
    ListListCreateView, ListDetailView,
    CardListCreateView, CardDetailView,
    MembershipListCreateView, MembershipDetailView
)

urlpatterns = [
    path('boards/', BoardListCreateView.as_view(), name='board-list-create'),
    path('boards/<int:pk>/', BoardDetailView.as_view(), name='board-detail'),
    path('lists/', ListListCreateView.as_view(), name='list-list-create'),
    path('lists/<int:pk>/', ListDetailView.as_view(), name='list-detail'),
    path('cards/', CardListCreateView.as_view(), name='card-list-create'),
    path('cards/<int:pk>/', CardDetailView.as_view(), name='card-detail'),
    path('memberships/', MembershipListCreateView.as_view(), name='membership-list-create'),
    path('memberships/<int:pk>/', MembershipDetailView.as_view(), name='membership-detail'),
]
