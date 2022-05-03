import DnD from '../DnD';
import ChatMessagesMaker from '../ChatMessagesMaker';
import Geolocation from '../Geolocation';
import {beforeEach, expect, it} from "@jest/globals";
import {jest} from '@jest/globals';
jest.mock('../ChatMessagesMaker');
jest.mock('../Geolocation');
// jest.mock('../DnD');
//
beforeEach(() => {
  // Clear all instances and calls to constructor and all methods:
  ChatMessagesMaker.mockClear();
  Geolocation.mockClear();
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
  const messagesContainer = chat.querySelector('.chat-widget__messages-container');
  const dropZone = messagesContainer;
  const dropZoneInput = document.querySelector('.drop-zone__input');
  const paperclip = document.querySelector('.paperclip');
  const dnD = new DnD(
    dropZone,
    dropZoneInput,
    paperclip,
    Geolocation,
    ChatMessagesMaker,
  );
  expect(dnD).toBeDefined();
  const file = new File(['(⌐□_□)'], 'file.xml', { type: 'audio' });
  expect(dnD.handleReceivedFile(file)).toBe(undefined);
  expect(dnD.handleDropZoneInput()).toBe(undefined);
  expect(dnD.handleDropZone()).toBe(undefined);

});
