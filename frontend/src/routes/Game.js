import React, { useState, Fragment } from 'react';
import { DragDropContext } from '@hello-pangea/dnd';
import CardGroup from "./components/CardGroup";
import "../styles/Game.css";
import GlobalStyle from '../globalStyles/globalStyles';
import InfoIcon from '@mui/icons-material/Info';
import { Hover, Trigger } from 'react-hover';
import ReactHover from 'react-hover/dist/ReactHover';
import bottomcheatsheet from '../img/bottomhand.png';
import middlecheatsheet from '../img/middlehand.png';
import topcheatsheet from '../img/tophand.png';


const values = {
	"A": 1, "2": 2, "3": 3, "4": 4, "5": 5, "6": 6, "7": 7, "8": 8, "9": 9, "0": 10, "J": 11, "Q": 12, "K": 13
}
function cardSet(list,maxSize,maxValue,minValue,droppable){
	return {list,maxSize,maxValue,minValue,droppable}
  }
export default function Game() {

	const [cards, setCards] = useState({
		"player":{
			"top":cardSet(["AS","2S","3S"],3,13,1,true),
			"middle":cardSet(["4S", "5S", "6S","7S","8S"],5,13,1,true),
			"bottom":cardSet(["9S","0S","JS","QS","KS"],5,13,1,true),
			"hand": cardSet(["AD","2D","3D","4D","5D","6D","7D","8D","9D","0D","JD","QD","KD"],-1,13,1,true),
			"discard": cardSet(["AH","2H","3H","4H","5H","6H","7H"],-1,13,1,true),
		},
		"opponent":{
			"top":cardSet(["AC","2C","3C"],3,13,1,false),
			"middle":cardSet(["4C", "5C", "6C","7C","8C"],5,13,1,false),
			"bottom": cardSet(["9C","0C","JC","QC","KC"],5,13,1,false),
		},
		
	})

	
	function dragStarted(event){
		const tempCards = {...cards}
		for (const listName in tempCards.player){
		  const list = tempCards.player[listName]
		  list.droppable = true;
		  if ((values[event.draggableId[0]] < list.minNumber) ||( values[event.draggableId[0]] > list.maxNumber) || ((list.list.length >= list.maxSize) && (list.maxSize !== -1))){
			list.droppable = false;
		  }
		  if (listName == event.source.droppableId) {
			list.droppable = true;
		  }
	
		}
		setCards(tempCards)
	}
	function handleOnDragEnd(result){
		const [originPlayer, originGroup] = result.source.droppableId.split('-');
		const [destinationPlayer, destinationGroup] = result.destination.droppableId.split('-');
		const sameDest = (result.source.droppableId === result.destination.droppableId)
		const tempDestination = [...cards[destinationPlayer][destinationGroup].list]
		console.log(tempDestination)
		const tempSource = sameDest ? tempDestination : [...cards[originPlayer][originGroup].list]
		const [card] = tempSource.splice(result.source.index,1)
		tempDestination.splice(result.destination.index,0,card)
		const tempCards = {...cards}
		tempCards[destinationPlayer][destinationGroup].list = tempDestination
		tempCards[originPlayer][originGroup].list = tempSource
		setCards(tempCards);
	  } 

	return(
		<Fragment>
        <GlobalStyle />
		<DragDropContext onDragEnd={handleOnDragEnd} onDragStart={dragStarted}>

		<div className='Game'>
			<div className="player1-cards cardDiv">
				<div className="playerName"><h2>Player 1 hand</h2></div>
					<div className="player1-top-hand"><CardGroup cards={cards.player.top} title="player-top"/></div>
					<div className="player1-middle-hand"><CardGroup cards={cards.player.middle} title="player-middle" /></div>
					<div className="player1-bottom-hand"><CardGroup cards={cards.player.bottom} title="player-bottom" /></div>
			</div>
			<div className="cheatsheets">
					<div className="tophand-cheatsheet">
						<ReactHover>
							<Trigger type='trigger'>
								<InfoIcon />
							</Trigger>
							<Hover type='hover'>
							<img src={topcheatsheet} style={{maxHeight: "100px", maxWidth: "100px"}} alt="tophand" className="tophand" />
							</Hover>
						</ReactHover>
					</div>
					<div className="middlehand-cheatsheet">
						<ReactHover>
							<Trigger type='trigger'>
								<InfoIcon />
							</Trigger>
							<Hover type='hover'>
							<img src={middlecheatsheet} style={{maxHeight: "100px", maxWidth: "100px"}} alt="middlehand" className="middlehand" />
							</Hover>
						</ReactHover>
					</div>
					<div className="bottomhand-cheatsheet">
						<ReactHover>
							<Trigger type='trigger'>
								<InfoIcon />
							</Trigger>
							<Hover type='hover'>
							<img src={bottomcheatsheet} style={{maxHeight: "100px", maxWidth: "100px"}} alt="bottomhand" className="bottomhand" />
							</Hover>
						</ReactHover>
					</div>
				</div>
			<div className="opponent-cards cardDiv">
				<div className="playerName"><h2>Player 2 hand</h2></div>
					<div className="opponent-top-hand"><CardGroup cards={cards.opponent.top} title="opponent-top"/></div>
					<div className="opponent-middle-hand"><CardGroup cards={cards.opponent.middle} title="opponent-middle" /></div>
					<div className="opponent-bottom-hand"><CardGroup cards={cards.opponent.bottom} title="opponent-bottom" /></div>
			</div>
		</div>
		<div className="discard">
			<div className="playerName">
				<h2>Discard</h2>
			</div>
				<div className="discard-hand"><CardGroup cards={cards.player.discard} title="player-discard"/></div>
		</div>
		<div className="hand">
			<div className="playerName">
				<h2>Hand</h2>
			</div>
				<div className="player-hand"><CardGroup cards={cards.player.hand} title="player-hand"/></div>
		</div>
		</DragDropContext>

		</Fragment>
	)
}