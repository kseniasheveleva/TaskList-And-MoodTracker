import { EVENT_TYPES } from "../constants/eventTypes";
import { eventEmitter } from "../core/EventEmitter";

export const useModal = (data) => {
  eventEmitter.emit(EVENT_TYPES.modal, data);
};
