import { shouldFail } from "../utils/randomFailure";

const NETWORK_DELAY = 600;

function simulateRequest(response) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldFail()) {
        reject(new Error("Something went wrong. Please try again."));
      } else {
        resolve(response);
      }
    }, NETWORK_DELAY);
  });
}

// API methods

export function createCard(card) {
  return simulateRequest(card);
}

export function updateCard(card) {
  return simulateRequest(card);
}

export function deleteCard(cardId) {
  return simulateRequest(cardId);
}

export function moveCard({ cardId, from, to }) {
  return simulateRequest({ cardId, from, to });
}
