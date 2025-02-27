import React from 'react'

const dateTimeFormat = new Intl.DateTimeFormat('en')

export function FootArticle(props) {
  const {name, navTree, ghUrl, meta = {}} = props
  let previous
  let next

  findPreviousAndNext(navTree)

  return (
    <footer>
      <div className="content">
        {previous || next ? (
          <nav
            aria-label="Category navigation"
            style={{display: 'flex', justifyContent: 'space-between'}}
            className="block"
          >
            {previous ? (
              <div>
                <small>Previous:</small>
                <br />
                <a rel="prev" href={previous.name}>
                  {(previous.data.matter || {}).title ||
                    (previous.data.meta || {}).title}
                </a>
              </div>
            ) : null}
            {next ? (
              <div style={{marginLeft: 'auto', textAlign: 'right'}}>
                <small>Next:</small>
                <br />
                <a rel="next" href={next.name}>
                  {(next.data.matter || {}).title ||
                    (next.data.meta || {}).title}
                </a>
              </div>
            ) : null}
          </nav>
        ) : null}
        <div
          style={{display: 'flex', justifyContent: 'space-between'}}
          className="block"
        >
          <div>
            <small>Found a typo? Other suggestions?</small>
            <br />
            <a href={ghUrl.href}>Edit this page on GitHub</a>
          </div>
          <div style={{marginLeft: 'auto', textAlign: 'right'}}>
            <small>By {meta.author}</small>
            <br />
            <small>
              Last modified on {dateTimeFormat.format(meta.modified)}
            </small>
          </div>
        </div>
      </div>
    </footer>
  )

  function findPreviousAndNext(item) {
    const index = item.children.findIndex(d => d.name === name)

    if (index === -1) {
      return item.children.some(d => findPreviousAndNext(d))
    }

    if (item.name !== '/') {
      previous = item.children[index - 1]
      next = item.children[index + 1]
      return true
    }

    return false
  }
}
