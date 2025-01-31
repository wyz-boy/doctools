"use strict";

import {DOM} from './dom.js'
import {Toolbox} from './toolbox.js'

/* Handle navigation, theming, search, shortcuts */
export class Navigation {
  constructor (app) {
    this.parent = app

    this.portrait = false
    this.scrollSpy = {
      localtoc: new Map(),
      currentLocaltoc: undefined
    }

    let $ = this.$ = {}
    $.body = new DOM(DOM.get('body'))
    $.head = new DOM(DOM.get('head'))
    $.content = new DOM(DOM.get('.body section'))
    $.localtoc = new DOM(DOM.get('.tocwrapper > nav > ul > li'))
    this.scroll_spy()

    if (this.parent.state.theme === null)
      this.parent.state.theme = this.os_theme()
    $.body.classList.add('js-on')
    if (this.parent.state.theme !== this.os_theme())
      $.body.classList.add(this.parent.state.theme)

	  $.searchButton = new DOM('button', {
      id:'search',
      className:'icon',
      title:'Search (/)'
    }).onclick(this, () => {
      DOM.switchState($.searchArea)
      DOM.switchState($.searchAreaBg)
      $.searchInput.focus()
      $.searchInput.$.select()
    })
	  $.changeTheme = new DOM('button', {
      className: this.parent.state.theme === 'dark' ? 'icon on' : 'icon',
      id:'theme',
      title:'Switch theme'
    }).onclick(this, () => {
      $.body.classList.remove(this.parent.state.theme)
      this.parent.state.theme = this.parent.state.theme === 'dark' ? 'light' : 'dark'
      if (this.os_theme() == this.parent.state.theme)
        localStorage.removeItem('theme')
      else {
        localStorage.setItem('theme', this.parent.state.theme)
        $.body.classList.add(this.parent.state.theme)
      }
    })

    $.searchAreaBg = new DOM('div', {
      className:'search-area-bg'
    }).onclick(this, () => {
      DOM.switchState($.searchArea)
      DOM.switchState($.searchAreaBg)
    })
    $.searchArea = new DOM(DOM.get('.search-area'))
    $.searchForm = new DOM(DOM.get('form', $.searchArea))
    $.searchInput = new DOM(DOM.get('input', $.searchForm))
    $.searchForm.$['action'] = DOM.get('link[rel="search"]').href
    $.body.append([$.searchAreaBg])

    $.rightHeader = new DOM(DOM.get('header #right span.reverse')).append([$.changeTheme, $.searchButton])

    $.relatedNext = DOM.get('.related .next')
    $.relatedPrev = DOM.get('.related .prev')

    this.init()

    app.navigation = this
  }
  /*
   * Initates scroll spy elements.
   */
  scroll_spy () {
    if (this.$.localtoc.$ !== null) {
      this.prepareLocaltocMap()
    }
  }
  /*
   * Prepare map for localtoc elements to be used by the scroll spy.
   */
  prepareLocaltocMap (){
    let key = ""
    let lt = this.scrollSpy.localtoc
    let i = 0
    DOM.getAll('.reference.internal', this.$.localtoc).forEach((elem) => {
      key = `${i}_${elem.textContent}`
      lt.set(key, [elem, undefined])
      i += 1
    })

    let entries = []
    for (let i = 0; i < 7; i++) {
      entries.push(...DOM.getAll(`section > h${i}`, this.$.content))
    }
    // Sort entries in distance to the top
    entries = entries.sort((a, b) => a.getBoundingClientRect().y - b.getBoundingClientRect().y)
    i = 0
    entries.forEach((elem) => {
      key = elem.textContent
      key = `${i}_${key}`
      if (lt.has(key)) {
        lt.set(key, [lt.get(key)[0], elem])
        i += 1
      }
    })
    // Remove not found entries
    lt.forEach((value, key, map) => {
      if (value[1] === undefined)
        map.delete(key)
    })
  }
  /* Update GUI based on resize event */
  handleResize () {
    this.portrait = window.innerHeight > window.innerWidth ? true : false
  }
  /* Update GUI based on scroll event */
  handleScroll () {
    if (this.$.localtoc.$ !== null) {
      // Highlight localtoc entry
      let key_neg, key_pos, key, dist
      let dist_pos = Number.MAX_SAFE_INTEGER
      let dist_neg = Number.MIN_SAFE_INTEGER
      let lt = this.scrollSpy.localtoc
      lt.forEach((value, key_, map) => {
        dist = value[1].getBoundingClientRect().y
        if (dist <= 0) {
          if (dist > dist_neg) {
            dist_neg = dist
            key_neg  = key_
          }
        } else {
          if (dist < dist_pos) {
            dist_pos = dist
            key_pos  = key_
          }
        }
      })
      if (dist_pos < 5*16)
        key = key_pos
      else
        key = key_neg

      if (key !== undefined) {
        let clt_key = this.scrollSpy.currentLocaltoc
        if (key !== clt_key) {
          lt.get(key)[0].classList.add("current")
          if (clt_key !== undefined) {
            lt.get(clt_key)[0].classList.remove("current")
          }
          this.scrollSpy.currentLocaltoc = key
        }
      }
    }
  }
  /* Search shortcut */
  search (e) {
    if (e.key === '/' && !this.$.searchArea.classList.contains('on')) {
      DOM.switchState(this.$.searchArea)
      DOM.switchState(this.$.searchAreaBg)
      this.$.searchInput.focus()
      this.$.searchInput.$.select()
    } else if (e.code === 'Escape') {
      if (this.$.searchArea.classList.contains('on')) {
        DOM.switchState(this.$.searchArea)
        DOM.switchState(this.$.searchAreaBg)
      }
    }
  }
  /* Related shortcut */
  related (e) {
    if (!e.altKey || !e.shiftKey)
      return
    e.preventDefault()

    /* Try to anchor to same section */
    let anchor = (e.ctrlKey && location.href.split('#').length > 1) ?
                 `#${location.href.split('#')[1]}` : ""

    if ((e.code == 'ArrowLeft' || e.code == 'KeyA') && this.$.relatedPrev)
      location.href = this.$.relatedPrev.href + anchor
    else if ((e.code == 'ArrowRight' || e.code == 'KeyD') && this.$.relatedNext)
      location.href = this.$.relatedNext.href + anchor
  }

  keyup (e) {
    switch (e.code) {
      case 'ArrowLeft':
      case 'ArrowRight':
      case 'KeyA':
      case 'KeyD':
        this.related(e)
        break
      case 'IntlRo':
      case 'Escape':
        this.search(e)
        break
    }
  }
  keydown (e) {
    if (!e.altKey || !e.shiftKey)
      return
    switch (e.code) {
      case 'ArrowLeft':
      case 'ArrowRight':
      case 'KeyA':
      case 'KeyD':
        e.preventDefault()
    }
  }
  /**
   * Updates elements in a reactive manner,
   * fetching from the main doctools/metadata.js,
   * that contain the most up-to-date metadata
   */
  dynamic () {
    if (this.parent.state.offline === true) {
      console.log("navigation: dynamic features are not available in offline mode")
      return
    } else if (this.parent.state.sub_hosted === false) {
      console.log("navigation: dynamic features are not available for single hosted doc")
      return
    }

    Toolbox.cache_check(this.parent.state, '/doctools/metadata.json', 24,
                        (obj) => {this.init_metadata(obj)})
  }
  /**
   * Attach metadata to this and call to inject extra modules.
   */
  init_metadata (obj) {
    this.metadata = obj

    if ('modules' in obj)
      this.load_modules(obj['modules'])
  }
  /**
   * Inject any JavaScript and CSS StyleSheet listed on the metadata.
   * The advantage is to load the latest and greatest scripts, regardless
   * of the tools' built doc version.
   */
  load_modules (obj) {
    if ('javascript' in obj) {
      obj['javascript'].forEach((elem) => {
        let script = new DOM('script', {
          'src': `/doctools/_static/${elem}`
        });
        this.$.head.append(script)
      })
    }
    if ('stylesheet' in obj) {
      obj['stylesheet'].forEach((elem) => {
        let style = new DOM('link', {
          'rel': 'stylesheet',
          'type': 'text/css',
          'href': `/doctools/_static/${elem}`
        });
        this.$.head.append(style)
      })
    }
  }
  /**
   * Get OS Theme
   */
  os_theme () {
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? 'dark' : 'light'
  }
  /**
   * Init navigation.
   */
  init () {
    onresize = () => {this.handleResize()}
    onscroll = () => {this.handleScroll()}
    document.addEventListener('keyup', (e) => {this.keyup(e)}, false);
    document.addEventListener('keydown', (e) => {this.keydown(e)}, false);
    this.dynamic()
  }
}
