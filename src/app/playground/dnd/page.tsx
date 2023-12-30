"use client"
import { useState } from "react"

type Card = {
  id: number
  name: string
}
const Page = () => {
  const [data, setData] = useState([
    {
      id: 1,
      name: "List 1",
      cards: [
        {
          id: 1,
          name: "Card 1",
        },
        {
          id: 2,
          name: "Card 2",
        },
      ],
    },
    {
      id: 2,
      name: "List 2",
      cards: [
        {
          id: 3,
          name: "Card 3",
        },
        {
          id: 4,
          name: "Card 4",
        },
      ],
    },
  ])
  const [draggedItem, setDraggedItem] = useState<Card | null>(null)

  const handleDragStart = (card: Card) => {
    console.log("handleDragStart", card)
    setData((prev) =>
      prev.map((list) => ({
        ...list,
        cards: list.cards.filter((c) => c.id !== card.id),
      })),
    )
    setDraggedItem(card)
  }

  const handleDragEnter = (id: number) => {
    console.log("handleDragEnter", id)
    if (draggedItem === null || draggedItem.id === id) {
      return
    }
    setData((prev) =>
      prev.map((list) => ({
        ...list,
        cards: list.cards
          .map((c) => (c.id === id ? [draggedItem, c] : [c]))
          .flat(),
      })),
    )
  }

  const handleDragLeave = (id: number) => {
    console.log("handleDragLeave", id)
    if (draggedItem === null || draggedItem.id !== id) {
      return
    }
    setData((prev) =>
      prev.map((list) => ({
        ...list,
        cards: list.cards.filter((c) => c.id !== id),
      })),
    )
  }

  return (
    <div>
      <div className="flex overflow-x-scroll p-5 space-x-4">
        {data.map((list) => (
          <div className="bg-gray-100 p-3 rounded min-w-240" key={list.id}>
            <h3 className="font-bold mb-3">{list.name}</h3>
            <div className="space-y-2">
              {list.cards.map((card) => (
                <div
                  className="bg-white p-2 rounded shadow"
                  key={card.id}
                  draggable
                  onDrag={() => handleDragStart(card)}
                  onDragEnter={() => handleDragEnter(card.id)}
                  onDragLeave={() => handleDragLeave(card.id)}
                  onDrop={() => {
                    console.log("onDrop", card.id)
                    setDraggedItem(null)
                  }}
                >
                  {card.name}
                </div>
              ))}
            </div>
          </div>
        ))}
        <div className="bg-gray-100 p-3 rounded min-w-240">
          <h3 className="font-bold mb-3">List 1</h3>
          <div className="space-y-2">
            <div className="bg-white p-2 rounded shadow">Card 1 Content</div>
            <div className="bg-white p-2 rounded shadow">Card 2 Content</div>
          </div>
        </div>
        <div className="bg-gray-100 p-3 rounded min-w-240">
          <h3 className="font-bold mb-3">List 2</h3>
          <div className="space-y-2">
            <div className="bg-white p-2 rounded shadow">Card 1 Content</div>
            <div className="bg-white p-2 rounded shadow">Card 2 Content</div>
          </div>
        </div>
        <div className="bg-gray-100 p-3 rounded min-w-240">
          <h3 className="font-bold mb-3">List 2</h3>
          <div className="space-y-2">
            <div className="bg-white p-2 rounded shadow">Card 1 Content</div>
            <div className="bg-white p-2 rounded shadow">Card 2 Content</div>
          </div>
        </div>
        <div className="bg-gray-100 p-3 rounded min-w-240">
          <h3 className="font-bold mb-3">List 2</h3>
          <div className="space-y-2">
            <div className="bg-white p-2 rounded shadow">Card 1 Content</div>
            <div className="bg-white p-2 rounded shadow">Card 2 Content</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Page
