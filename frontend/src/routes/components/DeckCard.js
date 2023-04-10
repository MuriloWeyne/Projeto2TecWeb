const suits = {
	  "C": '♣',
	  "D": '♦',
	  "H": '♥',
	  "S": '♠'
}

function DeckCard({title,innerRef,provided}){
	return(
	  <div className={"card" + (["H","D"].includes(title[1]) ? " red" :  "")} {...provided.draggableProps} {...provided.dragHandleProps} ref={innerRef} >
		<h2>{title.replace(title[1],suits[title[1]]).replace("0","10")}</h2>
	  </div>
	)
  }

  export default DeckCard