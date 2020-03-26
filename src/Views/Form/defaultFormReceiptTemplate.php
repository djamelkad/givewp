<?php

use function Give\Helpers\Frontend\getReceiptShortcodeFromConfirmationPage;
?>
<!DOCTYPE html>
<html lang="en" style="margin-top: 0 !important;">
	<head>
		<meta charset="utf-8">
		<title><?php _e( 'Donation Receipt', 'give' ); ?></title>
		<?php
		/**
		 * Fire the action hook in header
		 */
		do_action( 'give_embed_head' );
		?>
	</head>
	<body class="give-form-templates">
		<?php
		echo apply_filters(
			'the_content',
			getReceiptShortcodeFromConfirmationPage( 'give_receipt' )
		);

		/**
		 * Fire the action hook in footer
		 */
		do_action( 'give_embed_footer' );
		?>
	</body>
</html>
