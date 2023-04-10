from django.db import models
# Create your models here.
class Player(models.Model):
    name = models.CharField(unique=True, max_length=20)

    def __str__(self) -> str:
        return self.name


class Score(models.Model):
    score = models.IntegerField()
    player = models.ForeignKey("Player", on_delete=models.CASCADE)


class Game(models.Model):
    player1 = models.ForeignKey("Player", on_delete=models.CASCADE, related_name="p1games")
    player2 = models.ForeignKey("Player", null=True, on_delete=models.CASCADE, related_name="p2games")
    p1_score = models.IntegerField(default=100)
    p2_score = models.IntegerField(default=100)
    deck_id = models.CharField(max_length=30)

    game_round = models.IntegerField(default=0) #Round mostrado ao player nao incrementao quando em fantasyland
    actual_round = models.IntegerField(default=0) #Round incrementado quando em fantasyland, usado pra encontrar o round atual correto no banco de dados


class GameRound(models.Model):
    game = models.ForeignKey('Game', on_delete=models.CASCADE, default=1, related_name="rounds")
    turn = models.IntegerField(default=0)
    p1_turn = models.BooleanField()
    p1_dealer = models.BooleanField()
    fantasy = models.IntegerField(default=0)

    round_number = models.IntegerField(default=0)
    p1_top_game = models.CharField(max_length=6, default="")
    p1_middle_game = models.CharField(max_length=10, default="")
    p1_bottom_game = models.CharField(max_length=10, default="")
    p1_discard = models.CharField(max_length=10, default="")
    p1_hand = models.CharField(max_length=30, default="")

    p2_top_game = models.CharField(max_length=6, default="")
    p2_middle_game = models.CharField(max_length=10, default="")
    p2_bottom_game = models.CharField(max_length=10, default="")
    p2_discard = models.CharField(max_length=10, default="")
    p2_hand = models.CharField(max_length=30, default="")
