import { Draggable, Droppable } from '@hello-pangea/dnd';
import DeckCard from './DeckCard';
import "../../styles/CardGroup.css"

function CardGroup({provided,title="",cards={}}) {

	return (  
		<Droppable direction='horizontal' droppableId={title} isDropDisabled={!cards.droppable}> 
			{(provided,snapshot) => (
			<div className='list' {...provided.droppableProps} ref={provided.innerRef}>
				{cards.list.map((e,i) => (
				<Draggable draggableId={e} index={i} key={e} >
                        {(provided,snapshot)=>(
                          <DeckCard title={e} innerRef={provided.innerRef} provided={provided}/>
                        )}
				</Draggable>))}
				{provided.placeholder}
			</div>
			)}
		</Droppable>
	)
}

export default CardGroup