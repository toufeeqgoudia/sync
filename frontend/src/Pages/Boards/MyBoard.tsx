// import { useState, useEffect } from "react";
// import { getBoard, fetchLists, fetchCards } from "../../Utils/apiServices";
// import { useLocation } from "react-router-dom";
// import { MdExpandMore, MdExpandLess } from "react-icons/md";

// interface Board {
//     id: number;
//     title: string;
//     description: string;
//     created_at: string;
//     user: number;
// }

// interface List {
//     id: number;
//     title: string;
//     board: Board
// }

// interface Card {
//     id: number;
//     title: string;
//     description: string;
//     due_date: string;
//     list: List;
// }

// const MyBoard: React.FC = () => {
//   const [board, setBoard] = useState<Board>()
//   const [allLists, setAllLists] = useState<List[]>([])
//   const [allCards, setAllCards] = useState<Card[]>([])
//   const location = useLocation();
//   const boardId = location.state;

//   useEffect(() => {
//     const fetchData = async () => {
//         const _board = await getBoard(boardId)
//         setBoard(_board)

//         const _list = await fetchLists()
//         setAllLists(_list)

//         const _card = await fetchCards()
//         setAllCards(_card)
//     }

//     fetchData()
//   }, [boardId])

//   const filteredLists = allLists.filter(
//     list => list.board.id === board?.id
//   )

//   const filteredCards = allCards.filter((card) => {
//     return filteredLists.some((list) => list.id === card.list.id)
//   })

//   console.log('filteredCards: ', filteredCards)

//   return (
//     <div className="max-w-screen h-screen pt-28 pl-80 pr-10 bg-gradient-to-tr from-purple-700 from-35% via-blue-500 to-teal-300">

//       {filteredLists.map((list) => (
//         <div key={list.id} className="w-64 p-3 rounded-md bg-white">
//         <h4 className="text-lg font-semibold">{list.title}</h4>
        
//         {filteredCards.map((card) => (
//           <div key={card.id} className="w-full p-1 my-1 border-2 border-slate-400 rounded">
//           <div className="flex items-center">
//             <p>{card.title}</p>
//             <MdExpandMore />
//             <MdExpandLess />
//           </div>
//           {/** On expand display for details about card */}
//         </div>
//         ))}

//         <p className="text-xs">+ Add a card</p>
//       </div>
//       ))}

//     </div>
//   );
// };

// export default MyBoard;


import { useState, useEffect } from "react";
import { getBoard, fetchLists, fetchCards } from "../../Utils/apiServices";
import { useLocation } from "react-router-dom";
import { MdExpandMore, MdExpandLess } from "react-icons/md";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

interface Board {
  id: number;
  title: string;
  description: string;
  created_at: string;
  user: number;
}

interface List {
  id: number;
  title: string;
  board: Board
}

interface Card {
  id: number;
  title: string;
  description: string;
  due_date: string;
  list: List;
}

const MyBoard: React.FC = () => {
  const [board, setBoard] = useState<Board>();
  const [allLists, setAllLists] = useState<List[]>([]);
  const [allCards, setAllCards] = useState<Card[]>([]);
  const [expandCard, setExpandCard] = useState<{ [key: number]: boolean }>({})
  const location = useLocation();
  const boardId = location.state;

  useEffect(() => {
    const fetchData = async () => {
      const _board = await getBoard(boardId);
      setBoard(_board);

      const _list = await fetchLists();
      setAllLists(_list);

      const _card = await fetchCards();
      setAllCards(_card);
    };

    fetchData();
  }, [boardId]);

  const filteredLists = allLists.filter((list) => list.board.id === board?.id);

  const filteredCards = allCards.filter((card) => {
    return filteredLists.some((list) => list.id === card.list.id);
  });

  const formatPostDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    };

    const formattedDate = new Intl.DateTimeFormat("en-GB", options).format(
      new Date(dateString)
    );
    return formattedDate.replace(",", " "); // Remove the comma between date and time
  };

  const handleDragEnd = (result: unknown) => {
    // TODO: Handle the drag end event, update the order of cards in the state or make an API call
    console.log("Drag end result:", result);
  };

  const toggleExpandCard = (cardId: number) => {
    setExpandCard((prevExpandCard) => ({
      ...prevExpandCard,
      [cardId]: !prevExpandCard[cardId]
    }))
  }

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="min-w-screen h-screen pt-28 pl-80 pr-10 bg-gradient-to-tr from-purple-700 from-35% via-blue-500 to-teal-300">
        <div className="mb-5 bg-slate-300 w-64 p-3 rounded text cursor-pointer">
          <p>+ Add list</p>
        </div> 
        <div className="flex justify-between flex-nowrap items-start">
          {filteredLists.map((list) => (
            <Droppable key={list.id} droppableId={String(list.id)}>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="w-64 p-3 rounded-md bg-white"
                >
                  <h4 className="text-lg font-semibold">{list.title}</h4>

                  {filteredCards
                    .filter((card) => card.list.id === list.id)
                    .map((card, index) => (
                      <Draggable key={card.id} draggableId={String(card.id)} index={index}>
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className="w-full p-1 my-1 border-2 border-slate-400 rounded cursor-grab"
                          >
                            <div className="flex justify-between items-center">
                              <p className="font-medium">{card.title}</p>
                              {expandCard[card.id]? (
                                <button className="cursor-pointer" onClick={() => toggleExpandCard(card.id)}>
                                  <MdExpandLess />
                                </button>
                              ) : (
                                <button>
                                  <MdExpandMore className="cursor-pointer" onClick={() => toggleExpandCard(card.id)} />
                                </button>
                              )}
                            </div>
                            {expandCard[card.id] && (
                                <div>
                                  <p className="text-sm">{card.description}</p>
                                  <p className="text-sm">{formatPostDate(card.due_date)}</p>
                                </div>
                              )}
                          </div>
                        )}
                      </Draggable>
                    ))}

                  {provided.placeholder}

                  <p className="text-xs">+ Add a card</p>
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </div>
    </DragDropContext>
  );
};

export default MyBoard;
