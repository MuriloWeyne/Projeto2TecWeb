from django.shortcuts import render
from .models import *
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.http import Http404
from django.http import HttpRequest
import random
from .serializers import *
from .gamelogic import *


# Create your views here.
def get_or_create_player(name):
    try:
        print(f"Trying to use tag: {name}")
        return Player.objects.get(name=name)
    except Player.DoesNotExist:
        print("Create new tag")
        player = Player(name=name)
        player.save()
        return player


@api_view(['GET'])
def player_list(request):
    players = Player.objects.all()
    serializer = PlayerSerializer(players, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def leaderboard(request):
    scores = Score.objects.all().order_by('-score')[:10]
    serializer = ScoreSerializer(scores, many=True)
    return Response(serializer.data)


@api_view(['GET', 'POST'])
def api_games(request):
    if request.method == 'GET':
        games = Game.objects.all()
        serialized_games = GameSerializer(games, many=True)
        return Response(serialized_games.data)
    player1 = get_or_create_player(request.data["player"])
    starting_player = random.randint(1, 2)
    p1_start = (starting_player == 1)
    p1_dealer = not p1_start
    game = Game(player1=player1, deck_id=create_deck())
    game.save()
    first_round = GameRound(game=game, p1_dealer=p1_dealer, p1_turn=p1_start)
    deal_cards(p1_start,first_round,5)
    first_round.save()


    return Response(GameSerializer(game).data)


@api_view(['POST'])
def join_game(request: HttpRequest, game_id):
    try:

        game = Game.objects.get(id=game_id)
        player_name = request.data["player"]
        if player_name == game.player1.name: raise Exception("Player already on game")
        if game.player2 is not None: raise Exception("Game full")
        player2 = get_or_create_player(player_name)
    except Game.DoesNotExist:
        raise Http404("Game does not exist")
    except Exception as error:
        return Response(str(error), status=400)
    game.player2 = player2
    game.save()
    return Response(GameSerializer(game).data)


@api_view(['GET'])
def game_state(request, game_id):
    try:
        game = Game.objects.get(id=game_id)
    except Game.DoesNotExist:
        raise Http404("game does not exist")
    return Response(GameStateSerializer(game).data)


@api_view(['POST'])
def play_game(request, game_id):
    try:
        game = Game.objects.get(id=game_id)
    except Game.DoesNotExist:
        raise Http404("game does not exist")
    round_number = game.actual_round
    curr_round = game.rounds.get(round_number=round_number)
    turn = curr_round.turn
    cards = request.data.get("cards")
    player_name = request.data.get("player")
    if player_name is None:
        return Http404("no player")
    expected_player = game.player1 if curr_round.p1_turn else game.player2
    fantasy = False
    p1 = curr_round.p1_turn
    if player_name != expected_player.name:
        p1 = not p1
    fantasy_str = str(curr_round.fantasy).zfill(2)
    if player_name != expected_player.name:
        if int(fantasy_str[int(not p1)]) == 0:
            return Response("Incorrect player", status=400)
        fantasy = True
    player = game.player1 if p1 else game.player2
    hand = curr_round.p1_hand if p1 else curr_round.p2_hand
    validity = valid_play(cards, turn, fantasy, fantasy_str, p1,hand)
    if validity != "valid":
        return Response(validity, status=400)
    update_stacks(cards, curr_round)
    game_in_progress = update_hands(curr_round,fantasy_str)
    if not game_in_progress:
        p1_start = not curr_round.p1_start
        new_round = game.rounds.create(p1_dealer=not curr_round.p1_dealer,p1_start=p1_start)
        deal_cards(p1_start, new_round, 5)
        new_round.save()
        game.save()

    return Response(GameRoundSerializer(curr_round).data)
