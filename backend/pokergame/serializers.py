from rest_framework import serializers
from rest_framework.fields import SerializerMethodField

from .models import *


class PlayerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Player
        fields = ('id', 'name')

class ScoreSerializer(serializers.ModelSerializer):
    player = PlayerSerializer()

    class Meta:
        model = Score
        fields = ('id', 'score', 'player')

class GameSerializer(serializers.ModelSerializer):
    player1 = PlayerSerializer()
    player2 = PlayerSerializer()
    class Meta:
        model = Game
        fields = ('id', 'player1', 'player2', 'game_round', 'rounds', 'p1_score','p2_score')

class GameStateSerializer(serializers.ModelSerializer):
    player1 = PlayerSerializer()
    player2 = PlayerSerializer()
    rounds = SerializerMethodField()

    def get_rounds(self,obj):
        return  GameRoundSerializer(instance=obj.rounds.order_by('-round_number')[:2],many=True).data
    class Meta:
        model = Game
        fields = ('id', 'player1', 'player2','game_round','rounds','p1_score','p2_score')
class GameRoundSerializer(serializers.ModelSerializer):
    class Meta:
        model = GameRound 
        #create fields using gamerounds model
        fields = ('id', 'turn', 'p1_turn','p1_dealer', 'fantasy', 'round_number', 'p1_top_game','p1_middle_game','p1_bottom_game','p1_discard','p1_hand', 'p2_hand', 'p2_top_game', 'p2_middle_game', 'p2_bottom_game', 'p2_discard',  'round_number')
        