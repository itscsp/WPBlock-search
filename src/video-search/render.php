<?php
/**
 * Server-side rendering of the `create-block/video-search` block.
 *
 * @package create-block
 */

$wrapper_attributes = get_block_wrapper_attributes([
    'class' => 'video-search-block',
    'data-post-types' => esc_attr(json_encode($attributes['postTypes'])),
    'data-search-text' => esc_attr($attributes['searchButtonText'])
]);
?>

<div <?php echo $wrapper_attributes; ?>>
    <div class="video-search-container">
        <div class="search-input-wrapper">
            <input 
                type="text" 
                class="video-search-input" 
                placeholder="<?php echo esc_attr($attributes['searchPlaceholder']); ?>"
            />
        </div>
        <button class="video-search-button">
            <?php echo esc_html($attributes['searchButtonText']); ?>
        </button>
    </div>
    <div class="video-search-modal" style="display: none;">
        <div class="video-search-modal-content">

            <div class="modal-search-container">
            <span class="video-search-modal-close">&times;</span>
                <div class="search-input-wrapper">
                    <input 
                        type="text" 
                        class="modal-search-input" 
                        placeholder="<?php echo esc_attr($attributes['searchPlaceholder']); ?>"
                    />
                </div>
                <button class="modal-search-button">
                    <?php echo esc_html($attributes['searchButtonText']); ?>
                </button>
            </div>
            <div class="video-search-results"></div>
        </div>
    </div>
</div>
