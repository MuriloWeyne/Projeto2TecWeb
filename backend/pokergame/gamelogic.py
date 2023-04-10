import requests
from textwrap import  wrap
from  .models import *
FANTASY_CARDS = {'1': 13, '2': 14, '3': 15}

base_deck = None
def get_base_deck() -> set:
    global base_deck
    if base_deck is None:
        temp_set = set()
        for value in "A1234567890JQK":
            for suit in "SHDC":
                temp_set.add(value+suit)
        base_deck = temp_set
    return  base_deck
def create_deck()->str:
    response = requests.get("https://www.deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1")
    return response.json().get("deck_id")

def deal_cards(p1,curr_round:GameRound,n_cards):
    flattened_cards = set()
    for cards_source in [curr_round.p2_hand,curr_round.p1_hand,curr_round.p1_bottom_game,curr_round.p2_bottom_game,curr_round.p1_middle_game,curr_round.p2_middle_game,curr_round.p1_top_game,curr_round.p2_top_game,curr_round.p1_discard,curr_round.p2_discard]:
        flattened_cards.update(wrap(cards_source,2))
    cards = get_base_deck().difference(flattened_cards)
    requests.get(f"https://www.deckofcardsapi.com/api/deck/{curr_round.game.deck_id}/shuffle/?cards={','.join(cards)}")
    response = requests.get(f"https://www.deckofcardsapi.com/api/deck/{curr_round.game.deck_id}/draw/?count={n_cards}")
    drawn_cards = ""
    print(response.text)
    for card_data in response.json().get("cards"):
        drawn_cards += card_data.get("code")
    if p1:
        curr_round.p1_hand += drawn_cards
    else:
        curr_round.p2_hand += drawn_cards
    curr_round.save()

def valid_play(cards, turn, fantasy, expected_fantasy, p1,hand):
    if cards is None:
        return "No cards"
    discard = cards.get("discard")
    cards_n = 0
    for key in cards:
        cards_n += len(cards[key])
        for card in cards[key]:
            if card not in hand:
                return "Card sent is not in hand"
    if fantasy:
        player_fantasy = expected_fantasy[int(not p1)]
        exp_cards = FANTASY_CARDS[player_fantasy]
        if cards_n != exp_cards: return "Not all cards sent"
        n_discard = exp_cards - 13
        if n_discard > 0 and len(discard) != n_discard:
            return "Missing discard"

    if turn < 1 or (int(expected_fantasy) == 0 and turn <= 1):
        if not (discard is None or len(discard) == 0): return "Cant discard on first turn"

        if cards_n != 5: return f"Expected 5 cards but got {cards_n}"
    else:
        if len(discard) != 1 or cards_n != 3: return "invalid play"
    return "valid"


def update_stacks(cards, curr_round,p1):
    top = cards.get("top")
    bottom = cards.get("bottom")
    middle = cards.get("middle")
    discard = cards.get("discard")
    if (p1):
        if top is not None and len(top) > 0:
            curr_round.p1_top_game += "".join(top)
        elif bottom is not None and len(bottom) > 0:
            curr_round.p1_bottom_game += "".join(bottom)
        elif middle is not None and len(middle) > 0:
            curr_round.p1_middle_game += "".join(middle)
        elif discard is not None and len(discard) > 0:
            curr_round.p1_discard += "".join(discard)
    else:
        if top is not None and len(top) > 0:
            curr_round.p2_top_game += "".join(top)
        elif bottom is not None and len(bottom) > 0:
            curr_round.p2_bottom_game += "".join(bottom)
        elif middle is not None and len(middle) > 0:
            curr_round.p2_middle_game += "".join(middle)
        elif discard is not None and len(discard) > 0:
            curr_round.p2_discard += "".join(discard)
    curr_round.save()


def update_hands(curr_round:GameRound,p1,fantasy_str):
    if p1:
        curr_round.p1_hand = ""
    else:
        curr_round.p2_hand = ""
    cards_dealt = True
    if p1:
        if int(fantasy_str[0])>0:
            pass
        elif int(fantasy_str[1])>0 and curr_round.turn<4:
            deal_cards(True,curr_round,3)
        elif curr_round.turn<9:
            deal_cards(False,curr_round,3 if curr_round.turn>0 else 5)
        else:
            cards_dealt = False
    else:
        if int(fantasy_str[1])>0:
            pass
        elif int(fantasy_str[0])>0 and curr_round.turn<4:
            deal_cards(False,curr_round,3)
        elif curr_round.turn<9:
            deal_cards(True,curr_round,3 if curr_round.turn>0 else 5)
        else:
            cards_dealt = False
        return  cards_dealt



