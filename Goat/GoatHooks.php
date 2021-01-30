<?php

class GoatHooks {

	public static function onContentHandlerDefaultModelFor( $title, &$model ) {
		if (!$title->exists()) {
			$model = 'goat';
		}
	}
}