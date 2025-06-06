import React, { useState, useEffect } from 'react';

const initialLists = {
  todo: { id: 'todo', title: 'To Do', cards: [] },
  inprogress: { id: 'inprogress', title: 'In Progress', cards: [] },
  done: { id: 'done', title: 'Done', cards: [] },
};

export default function KanbanBoard() {
  const [lists, setLists] = useState(() => {
    const saved = localStorage.getItem('kanbanLists');
    return saved ? JSON.parse(saved) : initialLists;
  });

  const [newCardText, setNewCardText] = useState('');
  const [activeList, setActiveList] = useState(null);

  useEffect(() => {
    localStorage.setItem('kanbanLists', JSON.stringify(lists));
  }, [lists]);

  const addCard = () => {
    if (!newCardText.trim() || !activeList) return;
    const updatedList = { ...lists[activeList] };
    updatedList.cards.push({ id: Date.now().toString(), text: newCardText.trim() });
    setLists({ ...lists, [activeList]: updatedList });
    setNewCardText('');
    setActiveList(null);
  };

  const deleteCard = (listId, cardId) => {
    const updatedList = { ...lists[listId] };
    updatedList.cards = updatedList.cards.filter((c) => c.id !== cardId);
    setLists({ ...lists, [listId]: updatedList });
  };

  return (
    <div className="flex gap-6 overflow-x-auto p-6 bg-white dark:bg-gray-800 rounded-xl shadow max-w-full">
      {Object.values(lists).map(({ id, title, cards }) => (
        <div key={id} className="flex-shrink-0 w-64 bg-gray-100 dark:bg-gray-700 p-4 rounded-lg shadow">
          <h3 className="font-semibold mb-4 text-gray-700 dark:text-white">{title}</h3>
          <div className="flex flex-col space-y-2">
            {cards.map(({ id: cardId, text }) => (
              <div
                key={cardId}
                className="bg-white dark:bg-gray-600 p-3 rounded shadow flex justify-between items-center"
              >
                <p className="text-gray-800 dark:text-gray-200">{text}</p>
                <button
                  onClick={() => deleteCard(id, cardId)}
                  className="text-red-600 hover:text-red-800"
                  aria-label="Delete card"
                >
                  &times;
                </button>
              </div>
            ))}
          </div>

          {activeList === id ? (
            <div className="mt-4">
              <input
                type="text"
                autoFocus
                value={newCardText}
                onChange={(e) => setNewCardText(e.target.value)}
                className="w-full px-3 py-2 rounded dark:bg-gray-600 dark:text-white"
                placeholder="Card text"
              />
              <div className="mt-2 flex justify-end gap-2">
                <button
                  onClick={addCard}
                  className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Add
                </button>
                <button
                  onClick={() => {
                    setActiveList(null);
                    setNewCardText('');
                  }}
                  className="px-3 py-1 bg-gray-300 rounded hover:bg-gray-400"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <button
              onClick={() => setActiveList(id)}
              className="mt-4 w-full px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              + Add Card
            </button>
          )}
        </div>
      ))}
    </div>
  );
}
