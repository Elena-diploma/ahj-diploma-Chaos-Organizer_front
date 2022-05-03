import Modal from '../Modal';
import ChatMessagesMaker from '../ChatMessagesMaker';
import {beforeEach, expect, it} from "@jest/globals";
import {jest} from '@jest/globals';
jest.mock('../ChatMessagesMaker');
// jest.mock('../DnD');
//
beforeEach(() => {
  ChatMessagesMaker.mockClear();
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
    '</div>' +
    '<div class="modal">' +
    '<div class="modal__container">' +
    '<h3 class="modal__header"></h3>' +
    '<p class="modal__message"></p>' +
    '<form class="modal__form">' +
    '<label class="modal-form__label" for="coordinates">Широта и долгота через запятую</label>' +
    '<input class="modal-form__input" type="text" id="coordinates" name="coordinates" placeholder="Например: [31.50851, -0.12572]" maxlength="23">' +
    '<div class="modal-form__buttons">' +
    '<button class="modal-form__button-cancel" type="button">Отмена</button>' +
    '<button class="modal-form__button-enter" type="submit">Ввод</button>' +
    '</div>' +
    '</form>' +
    '<a class="modal__advice" href="https://support.google.com/maps/answer/18539?hl=ru&co=GENIE.Platform%3DDesktop" target="_blank">Как узнать координаты места</a>' +
    '</div>' +
    '</div>';

  const chat = document.querySelector('.chat-widget');
  const chatInput = chat.querySelector('.chat-widget__input');

  const dropZoneInput = document.querySelector('.drop-zone__input');
  const modalWindow = document.querySelector('.modal');
  const modalHeader = modalWindow.querySelector('.modal__header');
  const modalMessage = modalWindow.querySelector('.modal__message');
  const modalForm = modalWindow.querySelector('.modal__form');
  const modalFormInput = modalWindow.querySelector('.modal-form__input');
  const modalCancelButton = modalWindow.querySelector('.modal-form__button-cancel');
  const modal = new Modal(
    modalWindow,
    modalHeader,
    modalMessage,
    modalForm,
    modalFormInput,
    modalCancelButton,
    chatInput,
    dropZoneInput,
    ChatMessagesMaker,
  );
  expect(modal).toBeDefined();

  expect(modal.toggle()).toBe(undefined);
  expect(modal.getCoords()).toStrictEqual({
    lat: 0,
    lon: NaN,
  });
  expect(modal.checkModalFormInput()).toBe(false);
  expect(modal.assignInputCheckerHandler()).toBe(undefined);
  expect(modal.assignSubmitHandler()).toBe(undefined);
  expect(modal.assignCancelHandler()).toBe(undefined);
});
