from django.urls import path

from . import views

urlpatterns = [
    path('players', views.player_list),
    path('leaderboard', views.leaderboard),
    path('games', views.api_games),
    path('games/join/<int:game_id>', views.join_game),
    path('games/<int:game_id>', views.game_state),
    path('games/play/<int:game_id>', views.play_game),



    # Você possivelmente tem outras rotas aqui.
]