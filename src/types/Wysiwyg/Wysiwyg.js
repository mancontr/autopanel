import React, { useMemo, useRef } from 'react'
import PropTypes from 'prop-types'

import './Wysiwyg.sass'

let ReactQuill, Quill, BlockEmbed
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
}
Figure.blotName = 'figure'
Figure.className = 'figure'
Figure.tagName = 'figure'

Quill.register('formats/figure', Figure, true)

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

const QuillWithImages = ({ field, ...props }, ref) => {
  const editRef = useRef()
  const fileRef = useRef()

  const addImage = (e) => {
    const file = e.target.files[0]
    if (!file) return
    const url = window.URL.createObjectURL(file)
    const caption = file.name || 'Image file'
    const quill = editRef.current.getEditor()
    const range = quill.getSelection()
    quill.insertEmbed(range.index, 'figure', { url, caption })
  }

  const modules = useMemo(() => {
    const handleImage = () => { fileRef.current.click() }
    return quillModules(handleImage)
  }, [])

  return (
    <React.Fragment>
      <ReactQuill ref={editRef} modules={modules} {...props} />
      <input ref={fileRef} type="file" name={field.name + '_gallery'}
        accept="image/*" value="" onChange={addImage} />
    </React.Fragment>
  )
}
QuillWithImages.propTypes = {
  field: PropTypes.object.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
}

const WysiwygTypeViewer = (props) => (
  <span>{props.value}</span>
)

WysiwygTypeViewer.propTypes = {
  value: PropTypes.any
}

export default {
  name: 'wysiwyg',
  view: WysiwygTypeViewer,
  edit: QuillWithImages
}
