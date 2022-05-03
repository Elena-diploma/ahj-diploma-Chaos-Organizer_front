import Geolocation from '../Geolocation';
import Modal from '../Modal';
import {beforeEach, expect, it} from "@jest/globals";
import {jest} from '@jest/globals';
jest.mock('../Modal');
// jest.mock('../DnD');
//
beforeEach(() => {
  Modal.mockClear();
});

it('', () => {

  document.body.innerHTML =
    '<div class="chat-widget">' +
    '<div class="chat-widget__area">' +
    '<div class="chat-widget__messages-container drop-zone" data-api-message="">' +
    '<div class="chat-widget__messages lazy-loading"></div>' +
    '</div>' +
    '<form class="chat__form">' +
    '<input class="chat-widget__input" placeholder="Введите ваше сообщение" autocomplete="off" data-geo-response="">' +
    '<input class="drop-zone__input" type="file" name="myFile" accept="image/*,video/*,audio/*">' +
    '<button type="button" class="paperclip">&#128206;</button>' +
    '</form>' +
    '</div>' +
    '<div class="side-nav">' +
    '<a href="#" class="favorites">Избранное</a>' +
    '<a href="#" class="text">Текст</a>' +
    '<a href="#" class="images">Изображения</a>' +
    '<a href="#" class="audio">Аудио</a>' +
    '<a href="#" class="video">Видео</a>' +
    '</div>' +
    '</div>';

  const chat = document.querySelector('.chat-widget');
  const chatInput = chat.querySelector('.chat-widget__input');
  const geolocation = new Geolocation(
    chatInput,
    Modal,
  );
  expect(geolocation).toBeDefined();
  expect(geolocation.setGeoResponse()).toBe(undefined);
  expect(geolocation.call()).toBe(undefined);
  expect(geolocation.handleSuccess({
    coords: {
      latitude: 1,
      longitude: 1,
    }
  })).toBe(undefined);
  expect(geolocation.handleRejection({
    code: 'error'
  })).toBe(undefined);
});
