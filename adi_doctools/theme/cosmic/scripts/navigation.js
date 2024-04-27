"use strict";

import {DOM} from './dom.js'
import {Toolbox} from './toolbox.js'

/* Update GUI based on resize event */
function handleResize (){
  navigation.portrait = window.innerHeight > window.innerWidth ? true : false
}
/* Handle navigation, theming, search */
class Navigation {
  constructor (){
    this.portrait = false
    this.isLocal = 'file:' == window.location.protocol
    this.currentTheme = localStorage.getItem('theme')
    this.ctrlPressed = localStorage.getItem('ctrlPressed')

    let $ = this.$ = {}
    $.body = new DOM(DOM.get('body'))

    if (this.currentTheme === null)
      this.currentTheme = this.getOSTheme()
    $.body.classList.add('js-on')
    if (this.currentTheme !== this.getOSTheme())
      $.body.classList.add(this.currentTheme)

	  $.searchButton = new DOM('button', {
      id:'search',
      className:'icon',
      title:'Search (/)'
    }).onclick(this, () => {
      DOM.switchState($.searchArea)
      DOM.switchState($.searchAreaBg)
      $.searchBox.focus()
      $.searchBox.$.select()
    })
	  $.changeTheme = new DOM('button', {
      className: this.currentTheme === 'dark' ? 'icon on' : 'icon',
      id:'theme',
      title:'Switch theme'
    }).onclick(this, () => {
      $.body.classList.remove(this.currentTheme)
      this.currentTheme = this.currentTheme === 'dark' ? 'light' : 'dark'
      if (this.getOSTheme() == this.currentTheme)
        localStorage.removeItem('theme')
      else {
        localStorage.setItem('theme', this.currentTheme)
        $.body.classList.add(this.currentTheme)
      }
    })

    $.searchAreaBg = new DOM('div', {
      className:'search-area-bg'
    }).onclick(this, () => {
      DOM.switchState($.searchArea)
      DOM.switchState($.searchAreaBg)
    })
    $.searchArea = new DOM(DOM.get('form.search-area'))
    $.searchBox = new DOM(DOM.get('form.search-area input'))
    $.searchArea.$['action'] = DOM.get('link[rel="search"]').href
    $.body.append([$.searchAreaBg])

    $.rightHeader = new DOM(DOM.get('header #right span.reverse')).append([$.changeTheme, $.searchButton])

    this.relatedNext = DOM.get('.related .next')
    this.relatedPrev = DOM.get('.related .prev')
  }
  /* Search shortcut */
  search (e) {
    if (e.code === 'IntlRo' && !this.$.searchArea.classList.contains('on')) {
      DOM.switchState(this.$.searchArea)
      DOM.switchState(this.$.searchAreaBg)
      this.$.searchBox.focus()
      this.$.searchBox.$.select()
    } else if (e.code === 'Escape') {
      if (this.$.searchArea.classList.contains('on')) {
        DOM.switchState(this.$.searchArea)
        DOM.switchState(this.$.searchAreaBg)
      }
    }
  }
  /* Related shortcut */
  related (e) {
    if (!localStorage.getItem('ctrlPressed'))
      return

    if (e.code == 'ArrowLeft' && this.relatedPrev !== null)
      location.href=this.relatedPrev.href
    else if (e.code == 'ArrowRight' && this.relatedNext !== null)
      location.href=this.relatedNext.href
  }

  keyDown (e) {
    if (e.key == 'Control')
      localStorage.setItem('ctrlPressed', true)
  }

  keyUp (e) {
    console.log(e.key)
    switch (e.key) {
      case 'Control':
        localStorage.removeItem('ctrlPressed')
        break
      case 'ArrowLeft':
      case 'ArrowRight':
        this.related(e)
        break
      case '/':
        this.search(e)
    }

    if (e.code === 'Escape')
      this.search(e)
  }
  /**
   * Init navigation.
   */
  init () {
    onresize = () => {handleResize()}
    document.addEventListener('keyup', (e) => {this.keyUp(e)}, false);
    document.addEventListener('keydown', (e) => {this.keyDown(e)}, false);
  }
  /**
   * Set items state.
   * @param state - True for open, false for closed.
   */
  setState (items, state) {
    items.forEach((elem) => {
      if (state) {
        elem.classList.add('on')
      } else {
        elem.classList.remove('on')
      }
    })
  }
  /**
   * Get OS Theme
   */
  getOSTheme () {
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? 'dark' : 'light'
  }
}

export let navigation = new Navigation()
