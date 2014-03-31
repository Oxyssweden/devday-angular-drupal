<?php

/**
 * Form builder; The general site information form.
 *
 * @ingroup forms
 */
function drupal_angular_seed_main_information_settings_form($form, &$form_state) {
  $form['site_information'] = array(
    '#type' => 'fieldset',
    '#title' => t('Site details'),
  );
  $form['site_information']['site_name'] = array(
    '#type' => 'textfield',
    '#title' => t('Site name'),
    '#default_value' => variable_get('drupal_angular_seed_site_name', 'drupal-angular-seed'),
    '#required' => TRUE
  );

  $form['site_information']['site_frontpage'] = array(
    '#type' => 'textfield',
    '#title' => t('Default front page'),
    '#default_value' => drupal_get_path_alias(variable_get('drupal_angular_seed_site_frontpage', '404')),
    '#size' => 40,
    '#description' => t('Optionally, specify a relative URL to display as the front page.  Leave blank to display the default content feed.'),
    '#field_prefix' => url(NULL, array('absolute' => TRUE)) . (variable_get('clean_url', 0) ? '' : '?q='),
  );

  $form['other'] = array(
    '#type' => 'fieldset',
    '#title' => t('Other Settings'),
  );

  $allowed_content_types = variable_get('drupal_angular_seed_allowed_content_types', array());
  $available_content_types = node_type_get_types();
  $formatted_available_content_types = array();
  foreach ($available_content_types as $content_type) {
    $formatted_available_content_types[$content_type->type] = $content_type->name;
  }
  $form['other']['allowed_content_types'] = array(
    '#type' => 'select',
    '#multiple' => TRUE,
    '#title' => t('Allowed Content Types'),
    '#description' => t('Content types which are allowed to appear on the front end.'),
    '#options' => $formatted_available_content_types,
    '#default_value' => $allowed_content_types,
  );

  $form['submit'] = array(
    '#type' => 'submit',
    '#value' => t('Save configuration'),
  );

  return $form;
}

function drupal_angular_seed_main_information_settings_form_submit($form, &$form_state) {
  variable_set('drupal_angular_seed_site_name', $form_state['values']['site_name']);
  variable_set('drupal_angular_seed_site_frontpage', $form_state['values']['site_frontpage']);
  variable_set('drupal_angular_seed_allowed_content_types', $form_state['values']['allowed_content_types']);
}
