<?php

/**
 * Form builder; The general site information form.
 *
 * @ingroup forms
 */
function drupal_angular_seed_tout_settings_form($form, &$form_state) {

  $form['touts'] = array(
    '#type' => 'fieldset',
    '#title' => t('Touts'),
  );

  $touts = variable_get('drupal_angular_seed_touts', array());
  $tout_descriptions = _drupal_angular_seed_tout_touts();
  foreach ($tout_descriptions as $key => $value) {
    $form['touts']['touts__' . $key] = array(
      '#type' => 'textfield',
      '#title' => t($value['title']),
      '#description' => t($value['description']),
      '#default_value' => !empty($touts[$key]) ? $touts[$key] : '',
      '#size' => 40,
      '#field_prefix' => url(NULL, array('absolute' => TRUE)) . (variable_get('clean_url', 0) ? '' : '?q=') . 'node/',
    );
  }

  $form['submit'] = array(
    '#type' => 'submit',
    '#value' => t('Save configuration'),
  );

  return $form;
}

function drupal_angular_seed_tout_settings_form_submit($form, &$form_state) {
  $items = array(
    'touts',
  );

  foreach ($items as $item) {
    $items[$item] = array();
    foreach ($form_state['values'] as $key => $value) {
      if (substr($key, 0, strlen($item) + 2) == $item . '__') {
        $item_key = substr($key, strlen($item) + 2);
        if ($item_key) {
          $items[$item][$item_key] = $value;
        }
      }
    }
    variable_set('drupal_angular_seed_' . $item, $items[$item]);
  }

}

function _drupal_angular_seed_tout_touts() {
  return array(
    'news_jumbotron' => array(
      'title' => 'News Jumbotron',
      'description' => 'appears on the news listing',
    ),
  );
}
