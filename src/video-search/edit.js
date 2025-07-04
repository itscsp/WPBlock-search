/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { useBlockProps, InspectorControls } from '@wordpress/block-editor';

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './editor.scss';

import { PanelBody, TextControl, CheckboxControl, SelectControl } from '@wordpress/components';

const ICON_OPTIONS = [
	{ label: 'Search', value: 'search' },
	{ label: 'Magnifying Glass', value: 'magnifying-glass' },
	{ label: 'Zoom In', value: 'zoom-in' },
	{ label: 'Filter', value: 'filter' },
];

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {Element} Element to render.
 */
export default function Edit({ attributes, setAttributes }) {
	const { searchPlaceholder, searchButtonText, postTypes, searchIcon } = attributes;
	const blockProps = useBlockProps();

	return (
		<>
			<InspectorControls>
				<PanelBody title={__('Search Settings', 'video-search')}>
					<SelectControl
						label={__('Search Icon', 'video-search')}
						value={searchIcon}
						options={ICON_OPTIONS}
						onChange={(value) => setAttributes({ searchIcon: value })}
					/>
					<TextControl
						label={__('Search Placeholder', 'video-search')}
						value={searchPlaceholder}
						onChange={(value) => setAttributes({ searchPlaceholder: value })}
					/>
					<TextControl
						label={__('Search Button Text', 'video-search')}
						value={searchButtonText}
						onChange={(value) => setAttributes({ searchButtonText: value })}
					/>
					<div className="post-types-control">
						<p>{__('Search in:', 'video-search')}</p>
						<CheckboxControl
							label={__('Posts', 'video-search')}
							checked={postTypes.includes('post')}
							onChange={(checked) => {
								const newPostTypes = checked
									? [...postTypes, 'post']
									: postTypes.filter(type => type !== 'post');
								setAttributes({ postTypes: newPostTypes });
							}}
						/>
						<CheckboxControl
							label={__('Pages', 'video-search')}
							checked={postTypes.includes('page')}
							onChange={(checked) => {
								const newPostTypes = checked
									? [...postTypes, 'page']
									: postTypes.filter(type => type !== 'page');
								setAttributes({ postTypes: newPostTypes });
							}}
						/>
					</div>
				</PanelBody>
			</InspectorControls>
			<div {...blockProps}>
				<div className="video-search-container">
					<div className="search-input-wrapper">
						<span className={`dashicons dashicons-${searchIcon}`}></span>
						<input
							type="text"
							placeholder={searchPlaceholder}
							className="video-search-input"
						/>
					</div>
					<button className="video-search-button">
						{searchButtonText}
					</button>
				</div>
			</div>
		</>
	);
}
