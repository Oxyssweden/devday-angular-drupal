<?php
/**
 * @file
 * drupal_angular_seed_main.features.inc
 */

/**
 * Implements hook_ctools_plugin_api().
 */
function drupal_angular_seed_main_ctools_plugin_api($module = NULL, $api = NULL) {
  if ($module == "strongarm" && $api == "strongarm") {
    return array("version" => "1");
  }
}
