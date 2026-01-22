import { useState } from "react";
import * as api from "../api/fakeApi";

/**
 * Fixed columns as per requirement
 * Keeping state simple and readable
 */
const initialState = {
  Todo: [],
  Doing: [],
  Done: [],
};

export function useKanban() {
  const [columns, setColumns] = useState(initialState);

  /**
   * CREATE CARD (optimistic)
   */
  const createCard = async (column, card) => {
    // save previous state for rollback
    const prevState = structuredClone(columns);

    // optimistic UI update
    setColumns((prev) => ({
      ...prev,
      [column]: [...prev[column], card],
    }));

    try {
      await api.createCard(card);
    } catch (error) {
      // rollback if API fails
      setColumns(prevState);
      throw error;
    }
  };

  /**
   * UPDATE CARD (optimistic)
   */
  const updateCard = async (column, updatedCard) => {
    const prevState = structuredClone(columns);

    setColumns((prev) => ({
      ...prev,
      [column]: prev[column].map((card) =>
        card.id === updatedCard.id ? updatedCard : card
      ),
    }));

    try {
      await api.updateCard(updatedCard);
    } catch (error) {
      setColumns(prevState);
      throw error;
    }
  };

  /**
   * DELETE CARD (optimistic)
   */
  const deleteCard = async (column, cardId) => {
    const prevState = structuredClone(columns);

    setColumns((prev) => ({
      ...prev,
      [column]: prev[column].filter((card) => card.id !== cardId),
    }));

    try {
      await api.deleteCard(cardId);
    } catch (error) {
      setColumns(prevState);
      throw error;
    }
  };

  /**
   * MOVE CARD between columns (used for drag & drop)
   */
  const moveCard = async ({ card, from, to }) => {
    // if dropped in same column, do nothing
    if (from === to) return;

    const prevState = structuredClone(columns);

    setColumns((prev) => ({
      ...prev,
      [from]: prev[from].filter((c) => c.id !== card.id),
      [to]: [...prev[to], card],
    }));

    try {
      await api.moveCard({ cardId: card.id, from, to });
    } catch (error) {
      // rollback on failure
      setColumns(prevState);
      throw error;
    }
  };

  return {
    columns,
    createCard,
    updateCard,
    deleteCard,
    moveCard,
  };
}
