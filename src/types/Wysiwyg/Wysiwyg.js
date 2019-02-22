import React, { useMemo, useRef, useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { QuillDeltaToHtmlConverter } from 'quill-delta-to-html'

import './Wysiwyg.sass'

let ReactQuill, Quill
let BlockEmbed = Object
if (typeof window !== 'undefined') {
  ReactQuill = require('react-quill')
  Quill = require('quill')
  BlockEmbed = Quill.import('blots/block/embed')
  require('react-quill/dist/quill.snow.css')
}

class Figure extends BlockEmbed {
  static create (value) {
    let node = super.create()
    node.setAttribute('contenteditable', false)
    node.innerHTML =
      `<img src="${value.url}" /><figcaption contenteditable="true">${value.caption}</figcaption>`
    return node
  }
  static value (domNode) {
    const url = domNode.querySelector('img').src
    const caption = domNode.querySelector('figcaption').innerText
    return { url, caption }
  }
  static formats () {
    return { renderAsBlock: true }
  }
}
Figure.blotName = 'figure'
Figure.className = 'figure'
Figure.tagName = 'figure'

Quill && Quill.register('formats/figure', Figure, true)

const quillModules = (handleImage) => ({
  toolbar: {
    container: [
      [{ 'header': [1, 2, 3, false] }],
      ['bold', 'italic', 'underline'],
      ['link', 'image'],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      ['clean']
    ],
    handlers: {
      image: handleImage
    }
  }
})

// Beware: this might leak some memory. Alternatives?
const filesMap = {}

const QuillWithImages = ({ field, value, onChange }, ref) => {
  const editRef = useRef()
  const fileRef = useRef()
  const [muteChange, setMuteChange] = useState(true)

  useEffect(() => {
    setMuteChange(false)
  }, [])

  const addImage = (e) => {
    const file = e.target.files[0]
    if (!file) return
    const url = window.URL.createObjectURL(file)
    filesMap[url] = file
    const caption = file.name || 'Image file'
    const quill = editRef.current.getEditor()
    const range = quill.getSelection()
    quill.insertEmbed(range.index, 'figure', { url, caption })
  }

  const modules = useMemo(() => {
    const handleImage = () => { fileRef.current.click() }
    return quillModules(handleImage)
  }, [])

  const handleChange = (content, delta, source, editor) => {
    // On mounting, we usually get a ghost onChange, which marks the entity
    // as modified. To prevent it, we mute the change events during mount.
    !muteChange && onChange(editor.getContents())
  }

  return (
    <React.Fragment>
      <ReactQuill ref={editRef} modules={modules}
        defaultValue={value} onChange={handleChange} />
      <input ref={fileRef} type="file" name={field.name + '_gallery'}
        accept="image/*" value="" onChange={addImage} />
    </React.Fragment>
  )
}
QuillWithImages.propTypes = {
  field: PropTypes.object.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
  onChange: PropTypes.func.isRequired
}

const WysiwygTypeViewer = (props) => (
  <span>{props.value}</span>
)

WysiwygTypeViewer.propTypes = {
  value: PropTypes.any
}

const preSave = ({ field, value, entity, attachments }) => {
  if (typeof value === 'string') return // No conversion needed
  const converter = new QuillDeltaToHtmlConverter(value.ops, {})
  converter.renderCustomWith((customOp, contextOp) => {
    const { type, value } = customOp.insert
    if (type === 'figure') {
      let url = value.url
      const file = filesMap[url]
      if (file) {
        attachments.push({
          type: 'file',
          field: field.name + '_gallery',
          file
        })
        url = '###attachment###'
      }
      const caption = value.caption
        .replace('<', '&lt;')
        .replace('>', '&gt;')
      return (
        '<figure>' +
        `<img src="${url}" />` +
        `<figcaption>${caption}</figcaption>` +
        '</figure>'
      )
    }
    return ''
  })
  entity[field.name] = converter.convert()
}

export default {
  name: 'wysiwyg',
  view: WysiwygTypeViewer,
  edit: QuillWithImages,
  preSave
}
