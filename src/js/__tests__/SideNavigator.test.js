import SideNavigator from '../SideNavigator';
import ChatMessagesMaker from '../ChatMessagesMaker';
import {expect, it} from "@jest/globals";

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
  const messages = chat.querySelector('.chat-widget__messages');
  const sideNav = chat.querySelector('.side-nav');
  const sideNavControls = sideNav.querySelectorAll('a');

  const sideNavigator = new SideNavigator(sideNavControls, messages, messagesContainer);
  expect(sideNavigator).toBeDefined();

  expect(sideNavigator.handleClick()).toBe(undefined);
});
