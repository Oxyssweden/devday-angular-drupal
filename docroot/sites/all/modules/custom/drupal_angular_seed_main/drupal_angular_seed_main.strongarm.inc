<?php
/**
 * @file
 * drupal_angular_seed_main.strongarm.inc
 */

/**
 * Implements hook_strongarm().
 */
function drupal_angular_seed_main_strongarm() {
  $export = array();

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'cors_domains';
  $strongarm->value = array(
    'api/*' => '*',
  );
  $export['cors_domains'] = $strongarm;

  return $export;
}
