"use strict";
import {DOM} from './dom.js'

/**
 * Shows page actions buttons to the right side of the title.
 * The actions are:
 * * An edit page button to open the page source code on the git hosting website.
 */
export class PageActions {
  constructor (app) {
    this.$ = {}

    this.parent = app
    this.page_source()
  }

  page_source_sanity (m, r) {
    if (!m.hasOwnProperty('source_hostname')) {
      console.warn("edit_source: 'source_hostname' missing from metadata", m)
      return
    }

    if (!m['repotoc'].hasOwnProperty(r)) {
      // The repo may not have been added yet
      console.log(`edit_source: repository '${r}' not in metadata`)
      return
    }

    if (!m['repotoc'][r].hasOwnProperty('pathname')) {
      console.warn(`edit_source: 'pathname' missing from entry '${r}'`)
      return
    }

    if (!m['repotoc'][r].hasOwnProperty('branch')) {
      console.warn(`edit_source: 'branch' missing from entry '${r}'`)
      return
    }
  }
  /*
   * Don't show page source buttom on some pages.
   */
  page_source_ignore () {
    // Search page
    if (document.querySelector("#search-documentation") !== null)
      return true

    return false
  }

  draw_page_source (url) {
    let doc = DOM.get('.bodywrapper .body')
    let container = new DOM('div', {
      'className': 'page-actions'
    })
    let edit_button = new DOM('a', {
      'className': 'edit-source',
      'title': 'See and edit this page source',
      'href': url,
      'target': 'blank'
    })
    container.append(edit_button)

    doc.insertAdjacentElement('afterbegin', container.$)
  }

  page_source () {
    let m = this.parent.state.metadata
    let r = this.parent.state.repository

    if (this.page_source_sanity(m, r))
      return

    if (this.page_source_ignore())
      return

    let tgt = m.source_hostname.replace('{repository}', r)
                               .replace('{branch}', m['repotoc'][r]['branch'])
                               .replace('{pathname}', m['repotoc'][r]['pathname']),
        path = new URL(location.pathname, location.origin).href,
        base = new URL(this.parent.state.content_root, path).href

    let pathname = path.substring(base.length)

    if (pathname.endsWith('.html'))
      pathname = pathname.replace(/\.html$/i, '.rst')
    else
      pathname = pathname.concat('index.rst')

    tgt = tgt.concat('/', pathname)

    this.draw_page_source(tgt)
  }
}
