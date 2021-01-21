<?php

/**
 * Content handler for goat.
 *
 * @since 1.24
 * @ingroup Content
 */
class GoatContentHandler extends CodeContentHandler {

	public function __construct( $modelId = 'goat' ) {
		parent::__construct( $modelId, [ 'goat' ] );
	}

	/**
	 * @return string
	 */
	protected function getContentClass() {
		return GoatContent::class;
	}

	public function makeEmptyContent() {
		$class = $this->getContentClass();
		return new $class( '{}' );
	}
}
