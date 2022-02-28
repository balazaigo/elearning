/**
 * @license Copyright (c) 2003-2022, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see https://ckeditor.com/legal/ckeditor-oss-license
 */

CKEDITOR.editorConfig = function( config ) {
	// Define changes to default configuration here.
	// For complete reference see:
	// https://ckeditor.com/docs/ckeditor4/latest/api/CKEDITOR_config.html

	// The toolbar groups arrangement, optimized for two toolbar rows.
	config.toolbar  = [
		{ name: 'document', groups: [ 'mode', 'document', 'doctools' ], items: [ 'Source', '-', 'Save', 'NewPage', 'ExportPdf', 'Preview', 'Print', '-', 'Templates' ] },
			{ name: 'clipboard', groups: [ 'clipboard', 'undo' ], items: [ 'Cut', 'Copy', 'Paste', 'PasteText', 'PasteFromWord', '-', 'Undo', 'Redo' ] },
			{ name: 'editing', groups: [ 'find', 'selection', 'spellchecker', 'editing' ], items: [ 'Find', 'Replace', '-', 'SelectAll', '-', 'Scayt' ] }
		{ name: 'forms', groups: [ 'forms' ] , items: [ 'Form', 'Checkbox', 'Radio', 'TextField', 'Textarea', 'Select', 'Button', 'ImageButton', 'HiddenField' ]},
		'/',
		{ name: 'basicstyles', groups: [ 'basicstyles', 'cleanup' ] , items: [ 'Bold', 'Italic', 'Underline', 'Strike', 'Subscript', 'Superscript', '-', 'CopyFormatting', 'RemoveFormat' ] },
		{ name: 'paragraph', groups: [ 'list', 'indent', 'blocks', 'align', 'bidi', 'paragraph' ] , items: [ 'NumberedList', 'BulletedList', '-', 'Outdent', 'Indent', '-', 'Blockquote', 'CreateDiv', '-', 'JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock', '-', 'BidiLtr', 'BidiRtl', 'Language' ] },
		{ name: 'links', groups: [ 'links' ] , items: [ 'Link', 'Unlink', 'Anchor' ] },
		{ name: 'insert', groups: [ 'insert' ] , items: [ 'Table', 'HorizontalRule', 'Smiley', 'SpecialChar', 'PageBreak', 'Iframe' ] },
		'/',
		{ name: 'styles', groups: [ 'styles' ] , items: [ 'Styles', 'Format', 'Font', 'FontSize' ] },
		{ name: 'colors', groups: [ 'colors' ] , items: [ 'TextColor', 'BGColor' ] },
		{ name: 'tools', groups: [ 'tools' ] , items: [ 'Maximize', 'ShowBlocks' ] },
		{ name: 'others', groups: [ 'others' ] }
	];

	// Remove some buttons provided by the standard plugins, which are
	// not needed in the Standard(s) toolbar.
	config.removeButtons = 'Underline,Subscript,Superscript,Image';

	// Set the most common block elements.
	config.format_tags = 'p;h1;h2;h3;pre';

	//config.filebrowserImageUploadUrl = API_CONTENT_URL+'/editor/upload/';
	// Set the most common block elements.
	//config.format_tags = 'p;h1;h2;h3;pre';
	//config.extraPlugins = 'pastebase64';
	// Simplify the dialog windows.
	config.removeDialogTabs = 'image:advanced;link:advanced';
	//config.allowedContent = 'div{*}';
};
