/* globals Give */

import { GiveFormModal } from '../plugins/modal';

class GiveDeactivationSurvey {
	constructor() {
		window.addEventListener(
			'load',
			function() {
				window.addDynamicEventListener( document, 'click', 'tr[data-slug="give"] .deactivate a', GiveDeactivationSurvey.deactivateGive );
				window.addDynamicEventListener( document, 'click', 'input[name="give-survey-radios"]', GiveDeactivationSurvey.toggleAdditionalFields );
			}
		);
	}

	/**
	 * Displays popup form and submits data on form submission.
	 *
	 * @param {object} e Event object.
	 */
	static deactivateGive( e ) {
		e.preventDefault();

		window.deactivationLink = e.target.href;

		jQuery.ajax( {
			url: ajaxurl,
			type: 'POST',
			data: {
				action: 'give_deactivation_popup',
			},
		} ).done( function( response ) {
			new GiveFormModal( {
				classes: {
					modalWrapper: 'deactivation-survey-wrap',
				},

				modalContent: {
					desc: response.html,
					cancelBtnTitle: give_vars.cancel,
					confirmBtnTitle: give_vars.submit_and_deactivate,
					link: window.deactivationLink,
					link_text: give_vars.skip_and_deactivate,
					link_self: true,
				},

				successConfirm: function() {
					// Deactivation Error admin notice.
					const deactivationError = document.querySelectorAll( '.deactivation-error' );
					const checkedRadio = document.querySelectorAll( 'input[name="give-survey-radios"]:checked' );
					const surveyForm = document.querySelectorAll( '.deactivation-survey-form' );
					let continueFlag = true;

					if ( deactivationError.length > 0 ) {
						continueFlag = false;
					}

					// If no radio button is selected then throw error.
					if ( 0 === checkedRadio.length && 0 === deactivationError.length ) {
						surveyForm[ 0 ].innerHTML += `
							<div class="notice notice-error deactivation-error">
								${ give_vars.deactivation_no_option_selected }
							</div>
						`;

						continueFlag = false;
					}

					/**
                     * If a radio button is associated with additional field
					 * and if that field is empty, then throw error.
					 */
					let userReasonField = '';

					if ( checkedRadio.length > 0 && null !== checkedRadio[ 0 ].parentNode.nextElementSibling ) {
						userReasonField = checkedRadio[ 0 ]
							.parentNode
							.nextElementSibling
							.querySelectorAll( 'input, textarea' );

						if ( 0 < userReasonField.length && ! userReasonField[ 0 ].value && 0 === deactivationError.length ) {
							const errorNode = document.createElement( 'div' );
							errorNode.setAttribute( 'class', 'notice notice-error deactivation-error' );

							const textNode = document.createTextNode( give_vars.please_fill_field );

							errorNode.appendChild( textNode );
							surveyForm[ 0 ].appendChild( errorNode );

							continueFlag = false;
						} else if ( 0 < userReasonField.length && userReasonField[ 0 ].value ) {
							if ( 0 !== deactivationError.length ) {
								deactivationError[ 0 ].parentNode.removeChild( deactivationError[ 0 ] );
								continueFlag = true;
							}
						}
					}

					/**
					 * If form is properly filled, then serialize form data and
					 * pass it to the AJAX callback for processing.
					 */
					if ( continueFlag ) {
						const formData = jQuery( '.deactivation-survey-form' ).serialize();

						jQuery.ajax( {
							url: ajaxurl,
							type: 'POST',
							data: {
								action: 'deactivation_form_submit',
								'form-data': formData,
								nonce: give_vars.nonce,
							},
							beforeSend: function() {
								const spinner = document.querySelectorAll( '.give-modal__controls .spinner' );
								spinner[ 0 ].style.display = 'block';
							},
						} ).done( function( responseFromSubmit ) {
							if ( responseFromSubmit.success ) {
								if ( responseFromSubmit.data.delete_data ) {
									GiveDeactivationSurvey.deleteAllData( 1, formData );
								} else {
									jQuery.magnificPopup.close();
									window.location.replace( window.deactivationLink );
								}
							}
						} );
					}
				},
			} ).render();
		} );
	}

	/**
	 * Deletes all the data generated by Give plugin.
	 *
	 * @param {number} step The current iteration of the batch process.
	 * @param {string} formData The Form Data.
	 */
	static deleteAllData( step, formData, file ) {
		jQuery.ajax( {
			url: ajaxurl,
			type: 'POST',
			data: {
				form: formData,
				action: 'give_do_ajax_export',
				step: step,
				file_name: file,
			},
			dataType: 'json',
		} ).done( function( response ) {
			if ( true !== response.success && ! response.error ) {
				GiveDeactivationSurvey.deleteAllData( parseInt( response.step ), formData, response.file_name );
			} else if ( true === response.success ) {
				jQuery.magnificPopup.close();
				window.location.replace( window.deactivationLink );
			}
		} );
	}

	/**
	 * Show/Hides extra input fields corresponding to the radio buttons
	 *
	 * @param {object} e Event object.
	 */
	static toggleAdditionalFields( e ) {
		const deactivationError = document.querySelectorAll( '.deactivation-error' );
		const extraField = document.querySelectorAll( '.give-survey-extra-field' );
		let ef = '';

		if ( deactivationError.length > 0 ) {
			deactivationError[ 0 ].parentNode.removeChild( deactivationError[ 0 ] );
		}

		extraField.forEach( function( element ) {
			element.style.display = 'none';
			ef = element.querySelectorAll( 'input, textarea' );
			ef[ 0 ].setAttribute( 'disabled', 'disabled' );
		} );

		if ( null !== e.target.parentNode.nextElementSibling ) {
			e.target.parentNode.nextElementSibling.style.display = 'block';
			const ip = e.target.parentNode.nextElementSibling.querySelectorAll( 'input, textarea' );
			ip[ 0 ].removeAttribute( 'disabled' );
		}
	}
}

new GiveDeactivationSurvey();
