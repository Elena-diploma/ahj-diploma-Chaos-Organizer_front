export default class ChatMessagesMaker {
  constructor(
    chatInput,
    messages,
    messagesContainer,
    api,
    ws,
  ) {
    this.chatInput = chatInput;
    this.messages = messages;
    this.messagesContainer = messagesContainer;
    this.api = api;
    this.ws = ws;
  }

  static getTime() {
    const date = new Date();

    const options = { dateStyle: 'short', timeStyle: 'short' };

    const formattedDate = new Intl.DateTimeFormat('ru-RU', options)
      .format(date).replace(/\d{2}(\d{2}),/, '$1');

    return formattedDate;
  }

  static addLinks(input) {
    const regex = /((https?:)(\/\/\/?)([\w]*(?::[\w]*)?@)?([\d\w.-]+)(?::(\d+))?([/\\\w.()-]*)?(?:([?][^#]*)?(#.*)?)*)/gi;

    return input.replace(regex, '<a href="$1" target="_blank">$1</a>');
  }

  getMessageHTML(options) {
    const {
      id,
      type,
      name,
      content,
      link,
      coords,
      timestamp,
      pinned,
      favorite,
    } = options;

    let source;

    if (link) {
      if (!link.startsWith('blob')) {
        source = `${this.api.getBaseURL()}/${link}`;
      } else {
        source = link;
      }
    }

    const state = pinned ? 'data-state="pinned"' : '';

    const star = favorite ? 'favorite' : '';

    let html = `<div class="message ${star}" data-type="${type}" id="${id}" ${state}>`;

    if (type === 'image') {
      html += `
        <div class="message__thumbnail">
          <h3 class="message__thumbnail-label">${name}</h3>
          <img src="${source}" alt="#">
        </div>
      `;
    } else if (type === 'video') {
      html += `
        <div class="message__thumbnail">
          <h3 class="message__thumbnail-label">${name}</h3>
          <video src="${source}" controls>Your browser does not support the video tag.</video>
        </div>
      `;
    } else if (type === 'audio') {
      html += `
        <div class="message__thumbnail">
          <h3 class="message__thumbnail-label">${name}</h3>
          <audio src="${source}" controls>Your browser does not support the audio element.</audio>
        </div>
      `;
    } else {
      html += `<div class="message__text">${this.constructor.addLinks(content)}</div>`;
    }

    html += `
        <div class="message__footer">
          <span class="message__coordinates">[${parseInt(coords.lat * 100000, 10) / 100000}, ${parseInt(coords.lon * 100000, 10) / 100000}]</span>
          <a class="message__google-maps-link" href="http://www.google.com/maps/place/${coords.lat},${coords.lon}" target="_blank">&#128270;</a>
          ${type !== 'text' ? `<a class="message__download-link" href="${source}" download="${name}">&#128206;</a>` : ''}
          <a class="message__pin" href="#">&#8942;</a>
          <a class="message__star" href="#">&#9733;</a>
          <span class="message__timestamp">${timestamp}</span>
        </div>
      </div>
    `;

    return html;
  }

  addMessage(coords, content, type) {
    const timestamp = this.constructor.getTime();
    let objectURL;

    if (type !== 'text') {
      objectURL = URL.createObjectURL(content);
    }

    const options = {
      type,
      name: content.name,
      content,
      link: objectURL,
      coords,
      timestamp,
    };

    if (this.ws.readyState === 1) {
      this.ws.send(JSON.stringify(options));
    }

    const messageHTML = this.getMessageHTML(options);

    this.messages.insertAdjacentHTML('beforeend', messageHTML);

    setTimeout(() => {
      this.messagesContainer.scrollTo(0, this.messagesContainer.scrollHeight);
    }, 300);

    this.chatInput.value = '';

    this.chatInput.dataset.geoResponse = '';

    this.chatInput.focus();

    this.api.uploadMessage(coords, timestamp, content, type);
  }
}
