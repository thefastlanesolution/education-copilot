/**
 * @license Copyright (c) 2014-2022, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
import ClassicEditor from '@ckeditor/ckeditor5-editor-classic/src/classiceditor.js';
import Alignment from '@ckeditor/ckeditor5-alignment/src/alignment.js';
import Autoformat from '@ckeditor/ckeditor5-autoformat/src/autoformat.js';
import Bold from '@ckeditor/ckeditor5-basic-styles/src/bold.js';
import DocumentList from '@ckeditor/ckeditor5-list/src/documentlist.js';
import Essentials from '@ckeditor/ckeditor5-essentials/src/essentials.js';
import FontSize from '@ckeditor/ckeditor5-font/src/fontsize.js';
import Heading from '@ckeditor/ckeditor5-heading/src/heading.js';
import Highlight from '@ckeditor/ckeditor5-highlight/src/highlight.js';
import Italic from '@ckeditor/ckeditor5-basic-styles/src/italic.js';
import Link from '@ckeditor/ckeditor5-link/src/link.js';
import Paragraph from '@ckeditor/ckeditor5-paragraph/src/paragraph.js';
import TextTransformation from '@ckeditor/ckeditor5-typing/src/texttransformation.js';
import Underline from '@ckeditor/ckeditor5-basic-styles/src/underline.js';

class Editor extends ClassicEditor {}

// Plugins to include in the build.
Editor.builtinPlugins = [
	Alignment,
	Autoformat,
	Bold,
	DocumentList,
	Essentials,
	FontSize,
	Heading,
	Highlight,
	Italic,
	Link,
	Paragraph,
	TextTransformation,
	Underline
];

// Editor configuration.
Editor.defaultConfig = {
	toolbar: {
		items: [
			'heading',
			'fontSize',
			'bold',
			'underline',
			'italic',
			'link',
			'bulletedList',
			'numberedList',
			'alignment',
			'|',
			'undo',
			'redo'
		]
	},
	language: 'en'
};

export default Editor;
